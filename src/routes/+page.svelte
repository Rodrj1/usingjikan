<script lang="ts">
	import { onMount } from 'svelte';
	import type { Anime } from '../types';
	import { previewImage } from '../store';
	import AnimeList from '../components/AnimeList.svelte';
	import Loading from '../components/Loading.svelte';

	let loadingData = true;

	let previousPreviewImage = $previewImage;

	const baseURL = 'https://api.jikan.moe/v4';

	const animeURL = 'top/anime?filter=bypopularity';

	const mangaURL = 'top/manga?filter=bypopularity';

	let list: Anime[] = [];

	type Response = {
		data: Anime[];
		pagination: {
			current_page: number;
			has_next_page: boolean;
			last_visible_page: number;
		};
	};

	onMount(async () => {
		const request = await fetch(`${baseURL}/${animeURL}`);

		const res: Response = await request.json();

		list = res.data;

		loadingData = false;
	});

	const handleUpdateList = async (url: string) => {
		let request;
		let res: Response;

		loadingData = true;

		request = await fetch(`${baseURL}/${url}`);

		res = await request.json();

		list = res.data;

		loadingData = false;

		$previewImage = '';
	};

	const updateList = async (type: 'ANIME' | 'MANGA') => {
		switch (type) {
			case 'ANIME':
				handleUpdateList(animeURL);
				break;

			case 'MANGA':
				handleUpdateList(mangaURL);
				break;
		}
	};

	$: {
		if (previousPreviewImage != $previewImage) {
			if (window.innerWidth >= 1280) {
				const getPreviewImage = document.getElementById('previewImage');

				if (getPreviewImage) {
					getPreviewImage.classList.remove('uncoverImage');
					setTimeout(() => {
						getPreviewImage.classList.add('uncoverImage');
					}, 100);

					previousPreviewImage = $previewImage;
				}
			} else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
				const getPreviewImage = document.getElementById('previewImageLowerRes');

				if (getPreviewImage) {
					getPreviewImage.classList.remove('uncoverImage');
					setTimeout(() => {
						getPreviewImage.classList.add('uncoverImage');
					}, 100);

					previousPreviewImage = $previewImage;
				}
			}
		}
	}
</script>

<svelte:head>
	<title>USINGJIKAN</title>
	<meta name="description" content="This is a demo app using Jikan Api to test some layouts." />
</svelte:head>

{#if loadingData}
	<Loading />
{:else}
	<section class="bg-zinc-950 min-h-screen text-[#f4f4f4] flex relative flex-col md:flex-row">
		{#if list.length > 0}
			<section class="flex-1 flex flex-col gap-10 border-r border-zinc-200 md:p-10">
				<div class="fixed w-full md:w-auto bg-black md:bg-none z-10 bottom-0 md:sticky md:top-8">
					<h2
						class="text-3xl md:text-6xl font-bold border-zinc-200 font-playfair pl-4 text-center md:text-left"
					>
						JIKANAPI<br class="hidden md:block" />V4
					</h2>

					<ul
						class="my-4 md:mt-4 pl-4 text-sm tracking-widest flex flex-row gap-3 md:gap-0 md:flex-col justify-evenly font-playfair"
					>
						<li>
							<button
								on:click={() => updateList('ANIME')}
								class="border-b border-transparent w-max cursor-pointer hover:border-zinc-200"
							>
								ANIME
							</button>
						</li>

						<li>
							<button
								on:click={() => updateList('MANGA')}
								class="border-b border-transparent w-max cursor-pointer hover:border-zinc-200"
								>MANGA
							</button>
						</li>
					</ul>
				</div>

				<section class="hidden flex-1 md:flex xl:hidden justify-center items-start p-10">
					<picture
						class={`sticky top-[30%] w-[80%] overflow-y-hidden ${$previewImage == '' && '!hidden'}`}
					>
						<img
							id="previewImageLowerRes"
							class="w-full"
							src={$previewImage}
							alt="Display for currently hovered article"
						/>
					</picture>
				</section>
			</section>

			<AnimeList {list} />

			<section class="hidden flex-1 xl:flex justify-center items-start p-10">
				<picture
					class={`sticky top-[23%] w-[65%] overflow-y-hidden border-b border-t py-6 border-zinc-200 ${$previewImage == '' && '!hidden'}`}
				>
					<img
						id="previewImage"
						class="w-full"
						src={$previewImage}
						alt="Display for currently hovered article"
					/>
				</picture>
			</section>
		{/if}
	</section>
{/if}
