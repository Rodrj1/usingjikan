<script lang="ts">
	import type { Anime } from '../types';
	import AnimeCard from './AnimeCard.svelte';

	export let list: Anime[];
</script>

<ul class="grid grid-cols-1 flex-[1.4] gap-10 p-10 mb-20 md:mb-0">
	{#each list as anime}
		<li>
			<AnimeCard {anime}/>
		</li>
	{/each}
</ul>
