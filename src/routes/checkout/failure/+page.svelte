<script>
	import HeroSection from '$components/HeroSection.svelte';
</script>

<HeroSection>
	<div class="flex w-1/2 flex-col items-center justify-center bg-black px-4 text-white">
		<h1 class="mb-4 pt-12 text-center text-6xl leading-tight font-extrabold">
			ERROR WHILE <br />
			PURCHASING
		</h1>
		<p class="mb-8 flex px-[100px] text-center text-lg leading-relaxed">
			We’re sorry, but it looks like there was an issue with your purchase. Don’t
			worry—these things happen, and we're here to help. Please double-check your
			payment details and try again.
		</p>
		<p class="mb-8 flex px-[100px] text-center text-lg leading-relaxed">
			We apologize for any inconvenience this may have caused and appreciate your patience.
			We’re committed to ensuring that you get the guide you need to make your move to
			Spain as smooth as possible.
		</p>
		<p class="mb-8 flex px-[100px] text-center text-lg leading-relaxed">
			If you’d like to try again, please click the button below to return to the checkout
			page.
		</p>
		<a
			href="/"
			class="border-2 border-solid border-white bg-black px-6 py-5 text-xl font-normal text-white
			uppercase transition-all duration-300 hover:bg-white hover:text-black"
		>
			Try Again
		</a>
	</div>
</HeroSection>
