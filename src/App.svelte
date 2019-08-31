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
    "4FB6QST5JBf4tuvENcGe+75rqK65E5E/57BgggyALkJqvc0nKWwFndUCKS/IRehPXdoXz8XzLFzbUXQdfOxQ"
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
