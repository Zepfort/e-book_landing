import Stripe from 'stripe';
import axios from 'axios';
import { promises as fs } from 'fs';
import { json, error } from '@sveltejs/kit';
import { STRIPE_API_KEY } from '$env/static/private';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2025-07-30' });

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
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn('⚠️ Invalid signature:', err.message);
    throw error(400, 'Invalid webhook signature');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const base64 = await getBase64Book();

    const payload = {
      from: { email: process.env.SENDER_EMAIL, name: "Toko E‑Book" },
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
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
  }

  return json({ received: true });
}
