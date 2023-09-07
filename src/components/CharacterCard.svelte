<script lang="ts">
	import type { Character } from '../types';

	export let character: Character['character'];
</script>

<article>
	<img
		class="min-w-[145px] min-h-[220px] object-cover grayscale-[0.75] hover:grayscale-0 transition-all"
		src={character.images.webp.image_url}
		alt={`${character.name} portrait`}
	/>

	<a href={character.url} target="_blank">
		<h3 class="text-zinc-100 border-b border-transparent hover:border-b hover:border-white transition-all">{character.name}</h3>
	</a>
</article>
