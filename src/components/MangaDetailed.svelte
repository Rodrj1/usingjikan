<script lang="ts">
	import { onMount } from 'svelte';
	import type { Character, Manga } from '../types';
	import CharacterCard from './CharacterCard.svelte';

	export let manga: Manga = {} as Manga;

	export let characters: Character[];

	characters.sort((a, b) => b.favorites - a.favorites);

	let isDragging = false;

	onMount(() => {
		const charlist = document.getElementById('charlist');

		if (charlist) {
			const startDrag = () => {
				isDragging = true;

				document.addEventListener('mousemove', onDrag);

				document.addEventListener('mouseup', stopDrag);

				charlist.classList.add('dragging');

				const charcards = document.querySelectorAll('.charcard');

				charcards.forEach((card) => card.classList.add('removePointerEvents'));
			};

			const onDrag = (e: MouseEvent) => {
				if (!isDragging) return;
				charlist.scrollLeft -= e.movementX;
			};

			const stopDrag = () => {
				isDragging = false;
				charlist.classList.remove('dragging');

				const charcards = document.querySelectorAll('.charcard');

				charcards.forEach((card) => card.classList.remove('removePointerEvents'));

				document.removeEventListener('mousemove', onDrag);

				document.removeEventListener('mouseup', stopDrag);
			};

			charlist.addEventListener('mousedown', startDrag);
		}

		const mainWrapper = document.getElementById('mainWrapper');

		if (mainWrapper && window.innerWidth >= 768) {
			let scrollBy = 0;

			let max = mainWrapper.scrollWidth - mainWrapper.clientWidth;
			const scrollList = (e: any) => {
				if (mainWrapper.scrollLeft <= 0) {
					mainWrapper.scrollLeft = 1;
					scrollBy = 0;
					return;
				}

				if (mainWrapper.scrollLeft >= max) {
					mainWrapper.scrollLeft = max - 0.001;
					scrollBy = max;
					return;
				}

				scrollBy += e.deltaY * 0.7;

				mainWrapper.scrollTo({ left: scrollBy, behavior: 'smooth' });
			};

			mainWrapper.onwheel = scrollList;
		}
	});
</script>

<div
	id="mainWrapper"
	class="flex bg-zinc-950 text-zinc-200 w-auto  overflow-x-auto md:!overflow-x-hidden !overflow-y-hidden max-h-[100vh]"
>
	<section
		class="min-w-[100vw] base:min-w-[50vw] flex flex-col justify-center items-center px-[5%]"
	>
		<a href={manga.url} target="_blank">
			<h1
				class="text-5xl hidden md:block tracking-widest absolute top-[2%] left-[0%] text-white border-b border-transparent hover:border-b hover:border-white transition-all text-center z-10 font-playfair w-[50vw]"
			>
				{manga.title_japanese}
			</h1>
		</a>

		<h2 class="flex flex-col md:flex-row tracking-widest text-xs md:text-sm font-playfair justify-center gap-5 px-5 mt-5 md:mt-0 md:px-0 md:gap-2">
			{manga.title != manga.title_english ? manga.title + "-" : ""} {manga.title_english}
		</h2>

		<ul class="flex gap-2 tracking-widest text-sm font-playfair">
			{#each manga.title_synonyms as title, i (i)}
				{#if i < manga.title_synonyms.length - 1}
					<li>{title} -</li>
				{:else}
					<li>{title}</li>
				{/if}
			{/each}
		</ul>

		<div class="text-base absolute bottom-10 left-[5%] z-10 flex gap-1 justify-center items-center font-playfair">
			<span>Scroll</span>
			<svg
				class="animate-ping"
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 256 256"
				><path
					fill="currentColor"
					d="m218.83 130.83l-72 72a4 4 0 0 1-5.66-5.66L206.34 132H40a4 4 0 0 1 0-8h166.34l-65.17-65.17a4 4 0 0 1 5.66-5.66l72 72a4 4 0 0 1 0 5.66Z"
				/></svg
			>
		</div>
	</section>

	<section class="min-w-[100vw] base:min-w-[50vw] h-[100vh]">
		<picture class="w-full h-screen relative">
			<img
				class="object-contain w-full h-full absolute right-0"
				alt={`${manga.title} wallpaper`}
				src={manga.images.webp.large_image_url}
			/>
		</picture>
	</section>

	<section
		class="min-w-[200vw] base:min-w-[50vw] flex flex-col justify-center items-center px-[5%]"
	>
		<ul class="flex sm:gap-2 font-playfair tracking-widest text-xs sm:text-base">
			{#each manga.genres as genre, i (i)}
				{#if i < manga.genres.length - 1}
					<li>{genre.name}-</li>
				{:else}
					<li>{genre.name}</li>
				{/if}
			{/each}
		</ul>

		<ul class="flex sm:gap-2 font-playfair tracking-widest text-xs sm:text-base">
			{#each manga.themes as theme, i (i)}
				{#if i < manga.themes.length - 1}
					<li>{theme.name} -</li>
				{:else}
					<li>{theme.name}</li>
				{/if}
			{/each}
		</ul>

		<p
			class="w-[70vw] sm:w-[70vw] base:w-[65%] max-h-[80vh] font-mono text-xs sm:text-sm my-5 tracking-wide text-center"
		>
			{manga.synopsis}
		</p>
	</section>

	<section class="min-w-[100vw] base:min-w-[50vw] flex justify-center items-center">
		{#if characters.length > 0}
			<ul
				id="charlist"
				class="grid grid-rows-3 gap-2 font-playfair tracking-widest text-xs w-[80%] hover:cursor-grab h-[80%] grid-flow-col overflow-y-hidden overflow-x-auto md:overflow-x-hidden"
			>
				{#each characters as char}
					<li>
						<CharacterCard character={char['character']} />
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="min-w-[100vw] base:min-w-[50vw] flex justify-around items-center flex-col md:flex-row">
		<ul
			class="flex flex-col gap-5 sm:gap-2 font-sans tracking-widest text-xs w-full px-6 md:w-auto sm:px-0"
		>
			{#each manga.authors as producer}
				<li><a href={producer.url} target="_blank">{producer.name.toUpperCase()}</a></li>
			{/each}
		</ul>

		<div class="text-xs sm:text-base flex flex-col justify-center items-center text-left w-[100%] md:w-auto px-6 sm:px-0">
			<span class="font-mono font-bold w-full">Status: {manga.status}</span>

			<p class="font-mono font-bold w-full">Current rank: {manga.popularity}</p>

			<span class="font-sans text-xs font-bold w-full"
				>Rating: {manga.score} ✓ <br />Scores: {manga.scored_by} ✓<br />Favorited by {manga.favorites}
				✓</span
			>
		</div>
	</section>
</div>
