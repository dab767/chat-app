<script>
	import Chats from "$lib/components/Chats.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Search from "$lib/components/Search.svelte";

  let { displayName, photoURL} = $props();
</script>

<div class="sidebar">
  <Navbar displayName={displayName} photoURL={photoURL}></Navbar>
  <Search></Search>
  <Chats></Chats>
</div>