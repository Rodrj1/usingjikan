<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>
</div>
