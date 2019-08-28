<script>
  import MainView from "./MainView.svelte";
  import LoginForm from "./LoginForm.svelte";
  import { login, keepToken, SessionToken } from "./login";
  $: loggedIn = false;
  const loginSubmissionHandler = event => {
    console.debug(event);
    login(null, event.detail)
      .then(t => {
        keepToken(t);
        loggedIn = true;
      })
      .catch(console.error);
  };
  // Auto-login for testing
  login(
    null,
    "axnsO+BeaFTn0vpVpBJOUrotugTjjf1X2xs+/cvukz7jro+Uwy3BqgEPao0JhHvw2JVQdlp9f10APNzai1VN"
  )
    .then(t => {
      keepToken(t);
      loggedIn = true;
    })
    .catch(console.error);
</script>

{#if loggedIn}
  <MainView />
{:else}
  <LoginForm on:submitted={loginSubmissionHandler} ButtonLabel="Log In..." />
{/if}
