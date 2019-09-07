<script>
  import { writable } from "svelte/store";
  import Navbar from "./Navbar.svelte";
  import Menu from "./Menu.svelte";
  import { authFetch } from "./store/loginState";
  import { validatePath } from "./validation";
  import { pathActions, path as pathStore, pathNames } from "./store/path";
  let me;
  const resetDisplay = pathNames.update(current => [current[0]]);
  pathActions.update(current => ({
    ...current,
    DPPM: resetDisplay
  }));
  authFetch("/user/me")
    .then(response => {
      if (!response.ok) {
        alert(`request for /user/me got code ${response.statusText}`);
        throw response.json();
      }
      return response.json();
    })
    .then(({ data }) => (me = data.currentUser))
    .catch(error =>
      error.errors && Array.isArray(error.errors)
        ? error.errors.forEach(console.error)
        : null
    );
</script>

<Navbar user={me} {pathStore} />
<div class="section">
  <div class="columns">
    <div class="column is-2">
      <Menu />
    </div>
    <div class="column">
      <h1 class="title">Main Content...</h1>
    </div>
  </div>
</div>
