<script>
	import Chat from '$lib/components/Chat.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	
  /** @type {import('./$types').PageProps} */
	let { data } = $props();
  
</script>

<div class="home">
	<div class="container">
		<Sidebar></Sidebar>
		<Chat></Chat>
	</div>
</div>
