<script>
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let { children, ...props } = $props();

	let loading = $state(false);

	async function onclick() {
		if (loading) return;
		loading = true;
		try {
			const stripe = await loadStripe(PUBLIC_STRIPE_KEY);

			const { data } = await axios.post('/api/checkout');
			const { sessionId } = data;

			const result = await stripe.redirectToCheckout({ sessionId });
			if (result?.error) {
				goto('/checkout/failure');
			}
		} catch (error) {
			goto('/checkout/failure');
		} finally {
			loading = false;
		}
	}
</script>

<button
	{...props}
	onclick={onclick}
	disabled={loading}
	aria-busy={loading}
	class="border-2 border-solid border-white bg-black px-6 py-5 text-xl font-normal text-white
    uppercase transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60"
>
	{#if loading}
		Processing…
	{:else}
		{@render children()}
	{/if}
</button>
