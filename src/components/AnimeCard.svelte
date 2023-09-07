<script lang="ts">
	import type { Anime } from '../types';
	import { previewImage } from '../store';

	export let anime: Anime = {} as Anime;

	$: type = anime.type == 'Manga' ? 'manga' : 'anime';

	const onHover = () => {
		$previewImage = anime.images.webp.large_image_url;
	};
</script>

<a
	class="group"
	href={`${type}/${anime.mal_id}`}
	data-sveltekit-preload-data="hover"
	on:mouseenter={onHover}
>
	<article
		class="relative flex flex-col md:flex-row justify-between items-start h-full w-full gap-5"
	>
		<div class="flex flex-col gap-1 font-playfair">
			<h1
				class="text-white group-hover:text-gray-600 group-hover:opacity-50 p-1 text-lg md:text-3xl font-bold transition-all duration-700 tracking-widest"
			>
				{anime.title_japanese.toUpperCase()}
			</h1>

			<h2
				class="text-zinc-300 group-hover:text-gray-600 group-hover:opacity-50 p-1 text-sm md:text-base transition-all duration-700"
			>
				{anime.title}
			</h2>

			<h2
				class="text-zinc-300 group-hover:text-gray-600 group-hover:opacity-50 p-1 text-sm md:text-base transition-all duration-700" 
			>
				{anime.title_english}
			</h2>
		</div>
	</article>
</a>
