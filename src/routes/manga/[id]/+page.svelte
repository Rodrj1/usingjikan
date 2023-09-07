<script lang="ts">
	import type { Character, Manga } from '../../../types';
	import { page } from '$app/stores';
	import MangaDetailed from '../../../components/MangaDetailed.svelte';
	import Loading from '../../../components/Loading.svelte';

	const url = `https://api.jikan.moe/v4/manga/${$page.data.id}/full`;
	const urlCharacters = `https://api.jikan.moe/v4/manga/${$page.data.id}/characters`;

	type ResponseChar = {
		data: Character[];
	};
	type Response = {
		data: Manga;
	};

	let mangaPromise = getManga();

	async function getManga() {
		const request = await fetch(url);
		const reqCharacters = await fetch(urlCharacters);
		const res: Response = await request.json();
		const resCharacters: ResponseChar = await reqCharacters.json();

		return { manga: res.data, characters: resCharacters.data };
	}
</script>

<svelte:head>
	<title>USINGJIKAN</title>
	<meta
		name="description"
		content="This is an individual manga page playing with horizontal scroll."
	/>
</svelte:head>

{#await mangaPromise}
	<Loading />
{:then data}
	<MangaDetailed manga={data.manga} characters={data.characters} />
{:catch someError}
	System error: {someError.message}.
{/await}
