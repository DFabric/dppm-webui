<script>
  import { activeMenuItem, DEFAULT_ACTIVE_MENU_STATE } from "./store/menu";
  import Packages from "./MainContent/Packages.svelte";

  let active = DEFAULT_ACTIVE_MENU_STATE;
  $: active = active;
  activeMenuItem.subscribe(item => (active = item));
  let components = {
    ["Packages" + 0]: Packages
  };
</script>

<svelte:component this={components[active.item + active.depth]} />
