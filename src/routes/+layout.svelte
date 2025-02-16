<script>
  import '../app.css';

  import { onMount } from "svelte";
  import { session } from "$lib/session";
  import { goto } from "$app/navigation";
  import { sessionState } from "$lib/state/session.svelte"

  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  let { data, children } = $props();
  
  $inspect(sessionState);

  
  let loading = $state(true);
  let loggedIn = $state(false);

  session.subscribe((cur) => {
      loading = cur?.loading;
      loggedIn = cur?.loggedIn;
  });

  onMount(async () => {
      const currentUser = await data.getAuthUser();
      const loggedIn = currentUser;

      sessionState.loggedIn = loggedIn;
      sessionState.user = currentUser;

      loading = false;

      session.update((cur) => {
          loading = false;

          return {
              ...cur,
              currentUser,
              loggedIn,
              loading: false,
          };
      });

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
