<script>
  import '../app.css';

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { sessionState } from "$lib/state/auth.svelte"
  import { chatState } from '$lib/state/chat.svelte';

  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  let { data, children } = $props();
      
  let loading = $state(true);
  let loggedIn = $state(false);
  
  onMount(async () => {
      const currentUser = await data.getAuthUser();
      const loggedIn = currentUser;

      sessionState.loggedIn = loggedIn;
      sessionState.user = currentUser;

      loading = false;
  
      if (loggedIn) {
          await goto("/");
      } else {
          await goto("/login");
      }
  });
</script>

<svelte:head>
    <title>NetSys - Messenger</title>
</svelte:head>

{#if loading}
    <div>Loading...</div>
{:else}
    <div>{@render children()}</div>
{/if}
