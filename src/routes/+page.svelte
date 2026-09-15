<script>
    import  HeroSection  from "$components/HeroSection.svelte";
	import ChapterPreview from "$components/ChapterPreview.svelte";
	import AuthorSection from "$components/AuthorSection.svelte";
	import FaqSection from "$components/FaqSection.svelte";
</script>

<svelte:head>
	<title>Move to Spain — The Complete Relocation E-book | $10</title>
	<meta name="description" content="Comprehensive guide to relocating to Spain. Learn about visas, housing, jobs, culture, and finances. Written by a 7-year expat." />
	<meta property="og:title" content="Move to Spain — Complete Relocation E-book" />
	<meta property="og:description" content="The only guide you need for moving to Spain. Visas, housing, jobs, culture & finances covered." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/src/assets/book_cover.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Move to Spain — Complete Relocation E-book" />
	<meta name="twitter:description" content="The only guide you need for moving to Spain." />
	<meta name="twitter:image" content="/src/assets/book_cover.png" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Book",
			"name": "Move to Spain — The Complete Relocation Guide",
			"description": "Comprehensive guide to relocating to Spain covering visas, housing, jobs, culture, and finances.",
			"author": {
				"@type": "Person",
				"name": "Niklas Fischer"
			},
			"offers": {
				"@type": "Offer",
				"price": "10",
				"priceCurrency": "USD"
			},
			"bookFormat": "EBook",
			"inLanguage": "en"
		}
	</script>
</svelte:head>

<HeroSection />
<ChapterPreview />
<AuthorSection/>
<FaqSection/>