<script>
  import '../app.css';
  import { sessionState } from '$lib/state/auth.svelte';
  import { setContext } from 'svelte';

  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  let { data, children } = $props();
  
  setContext('user', () => data.user );
  
  sessionState.loggedIn = data.loggedIn;
  sessionState.user = data.user;

  </script>

<svelte:head>
    <title>NetSys - Messenger</title>
</svelte:head>

<div>{@render children()}</div>
