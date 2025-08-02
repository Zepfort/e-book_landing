import Stripe from 'stripe';
import axios from 'axios';
import { promises as fs } from 'fs';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'; 

const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: '2025-07-30'
});

// Fungsi untuk membaca e-book dan mengubah ke Base64
async function getBase64Book() {
  const buffer = await fs.readFile('static/Testing_ebook.pdf');
  return buffer.toString('base64');
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
    const session = event.data.object;
    const email = session.customer_email;
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

    await axios.post('https://api.mailersend.com/v1/email', payload, {
      headers: {
        Authorization: `Bearer ${env.MAILERSEND_API_KEY}`, 
        'Content-Type': 'application/json'
      }
    });
  }

  return json({ received: true });
}
