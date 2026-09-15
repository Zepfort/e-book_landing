import Stripe from 'stripe';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'node:path';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'; 

const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: '2025-07-30'
});

// Lacak ID peristiwa yang telah diproses untuk mencegah pengiriman email ganda saat webhook dicoba ulang
const processedEvents = new Set();

// Cache Base64 PDF di memori
let cachedBase64 = null;

// Fungsi untuk membaca e-book dan mengubah ke Base64
async function getBase64Book() {
	if (cachedBase64) return cachedBase64;
	const pdfPath = path.resolve('static/Testing_ebook.pdf');
	const buffer = await fs.readFile(pdfPath);
	cachedBase64 = buffer.toString('base64');
	return cachedBase64;
}

export async function POST({ request }) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET); 
  } catch (err) {
    console.warn('⚠️ Invalid signature:', err.message);
    throw error(400, 'Invalid webhook signature');
  }

  if (event.type === 'checkout.session.completed') {
    if (processedEvents.has(event.id)) {
      console.log(`[webhook] Duplicate event ignored: ${event.id}`);
      return json({ received: true, duplicate: true });
    }

    const session = event.data.object;
    const email = session.customer_email || session.customer_details?.email;

    if (!email) {
      console.error(`[webhook] No customer email in event ${event.id}`);
      return json({ received: true, skipped: 'no-email' });
    }

    try {
      const base64 = await getBase64Book();

      const payload = {
        from: { email: env.SENDER_EMAIL, name: "Testing E-book" },
        to: [{ email }],
        subject: "E‑Book Anda Sudah Tersedia 🎉",
        text: "Terima kasih sudah membeli! Silakan unduh e‑book di lampiran.",
        html: `<p>Hai!</p><p>Terima kasih sudah membeli. Silakan download e‑book melalui lampiran.</p>`,
        attachments: [
          {
            filename: "Testing_ebook.pdf",
            content: base64,
            disposition: "attachment"
          }
        ]
      };

      const { data } = await axios.post('https://api.mailersend.com/v1/email', payload, {
        headers: {
          Authorization: `Bearer ${env.MAILERSEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Only mark as processed after the email is actually sent
      processedEvents.add(event.id);
      console.log(`[webhook] Email sent to ${email} (event ${event.id}, message ${data?.message_id})`);
    } catch (err) {
      console.error(`[webhook] Failed to send email to ${email} (event ${event.id}):`, err.response?.data || err.message);
      return json({ error: 'Failed to send email' }, { status: 500 });
    }
  }

  return json({ received: true });
}
