<script>
	import bookCover from "$assets/book_cover.png"
	import phoneCover from "$assets/phone_cover.png"
	import Button  from "$components/Button.svelte"

	let { children } = $props();
</script>

<section class="flex h-[100vh] w-full overflow-y-hidden">
	<!-- LEFT SIDE -->
	<div
		class="w-1/2 bg-linear-135 flex flex-col items-center from-purple-300 via-blue-100 to-purple-300 relative"
	>
		<h1 class="pt-12 text-center text-8xl font-extrabold text-purple-600 leading-tight">
            MOVE TO <br />
            SPAIN
        </h1>
		<h4 class="text-center text-lg font-semibold italic text-purple-950">
			There's no need to make the same mistake i made
		</h4>
		<div class="mt-96 flex items-end ">
			<img src={phoneCover} alt="" class="absolute w-[30%] bottom-[10%] right-[55%] transform translate-y-[25%]" />
			<img src={bookCover} alt="" class="absolute w-[65%] bottom-[25%] right-[4%] transform translate-y-[50%]" />
		</div>
	</div>

	<!-- RIGHT SIDE -->
	 {#if children}
	 {@render children()}
	 {:else}
	<div class="w-1/2 flex flex-col items-center bg-black px-4 text-white">
		<h1 class="mb-4 pt-12 text-center text-8xl font-extrabold leading-tight  ">
			THIS BOOK WILL <br />
			SAVE YOU MONEY <br />
			TIME & NERVES
		</h1>
		<p class="mb-16 flex text-center text-lg leading-relaxed px-[100px]">
			I moved to New York seven years ago. The process was painful and difficult. I learned most
			things the hard way: finding a job, getting a visa, calculating my cost of living, choosing an
			apartment. That's why I wrote this e-book, to tell you how I did it. No bullshit, no stress.
		</p>
		<Button >Purchase E-book for $10</Button>
	</div>
	{/if}
</section>
