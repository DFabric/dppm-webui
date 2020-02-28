<script>
  import Router from 'svelte-spa-router';
  import MainView from "./MainView.svelte";
  import Notifications from "./Notifications.svelte";
  import LoginForm from "./LoginForm.svelte";
  /* import { login } from "./store/loginState"; */
  /* import loginState from "./store/loginState"; */
  /* let loggedIn = false; */
  /* loginState.subscribe(token => (loggedIn = token)); */
  import { Session } from 'svelte-session-manager';
  const session = new Session(localStorage);
  const routes = {
    '/': MainView,
    '/login': LoginForm
  }
</script>

<Notifications />
<Router {routes} />
{#if session.isValid }
  <MainView />
{:else}
  <LoginForm ButtonLabel="Log In..." />
{/if}
