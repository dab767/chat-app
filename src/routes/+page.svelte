<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	import Chat from '$lib/components/Chat.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="home">
	<div class="container">
		<Sidebar displayName={data.displayName} photoURL={data.photoURL}></Sidebar>
		<Chat></Chat>
	</div>
</div>
