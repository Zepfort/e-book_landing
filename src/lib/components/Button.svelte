<script>
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
    import axios from 'axios';
    import { goto } from "$app/navigation"

	let { children, ...props } = $props();

	async function onclick() {
        try {
            const stripe = await loadStripe(PUBLIC_STRIPE_KEY);
            
            const { data } = await axios.post('/api/checkout');
            const {sessionId} = data;

            await stripe.redirectToCheckout({sessionId})
        } catch (error) {
            goto("/checkout/failure")
        }
	}
</script>

<button
	{...props}
    onclick={onclick}
	class="border-2 border-solid border-white bg-black px-6 py-5 text-xl font-normal text-white
    uppercase transition-all duration-300 hover:bg-white hover:text-black"
	>{@render children()}</button
>
