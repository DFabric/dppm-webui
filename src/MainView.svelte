<script>
  import { writable } from "svelte/store";
  import Navbar from "./Navbar.svelte";
  import { authFetch } from "./login";
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
        : nil
    );
</script>

<Navbar user={me} {pathStore} />
