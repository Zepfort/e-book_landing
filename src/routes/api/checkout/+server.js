import { json } from "@sveltejs/kit";
import Stripe from "stripe";
import { PRICE_ID, STRIPE_API_KEY } from "$env/static/private";
import { PUBLIC_FRONTEND_URL } from "$env/static/public"
 
const stripe = new Stripe(STRIPE_API_KEY)

export async function POST(){
    try {
        const baseUrl = PUBLIC_FRONTEND_URL.replace(/\/+$/, '');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/checkout/success`,
            cancel_url: `${baseUrl}/checkout/failure`
        });    
        return json({ sessionId: session.id})
    } catch (err) {
        console.error('[checkout] Failed to create session:', err.message);
        return json({ error: 'Failed to create checkout session' }, { status: 500})
    }
}