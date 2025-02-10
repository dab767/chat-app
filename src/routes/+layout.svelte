<script>
  import '../app.css';

  import { onMount } from "svelte";
  import { session } from "$lib/session";
  import { goto } from "$app/navigation";

  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  let { data, children } = $props();
  let loading = $state(true);
  let loggedIn = $state(false);

  session.subscribe((cur) => {
      loading = cur?.loading;
      loggedIn = cur?.loggedIn;
  });

  onMount(async () => {
      const user = await data.getAuthUser();
      const loggedIn = !!user && user?.emailVerified;

      session.update((cur) => {
          loading = false;

          return {
              ...cur,
              user,
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

{@render children()}
