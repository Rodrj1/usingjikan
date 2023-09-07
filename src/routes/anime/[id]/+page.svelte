<script lang="ts">
	import type { Anime, Character } from '../../../types';
	import { page } from '$app/stores';
	import AnimeDetailed from '../../../components/AnimeDetailed.svelte';
	import Loading from '../../../components/Loading.svelte';

	const url = `https://api.jikan.moe/v4/anime/${$page.data.id}/full`;
	const urlCharacters = `https://api.jikan.moe/v4/anime/${$page.data.id}/characters`;

	type Response = {
		data: Anime;
	};

	type ResponseChar = {
		data: Character[];
	};

	let animePromise = getAnime();

	async function getAnime() {
		const request = await fetch(url);
		const reqCharacters = await fetch(urlCharacters);

		const res: Response = await request.json();
		const resCharacters: ResponseChar = await reqCharacters.json();

		return { anime: res.data, characters: resCharacters.data };
	}
</script>

<svelte:head>
	<title>USINGJIKAN</title>
	<meta
		name="description"
		content="This is an individual anime page playing with horizontal scroll."
	/>
</svelte:head>

{#await animePromise}
	<Loading />
{:then data}
	<AnimeDetailed anime={data.anime} characters={data.characters} />
{:catch someError}
	System error: {someError.message}.
{/await}
