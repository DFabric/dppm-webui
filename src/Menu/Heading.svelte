<script>
  import { activeMenuItem } from "../store/menu";
  export let text,
    action,
    depth = 0;
  let active = { item: "Applications", depth: 0 };
  $: active = active;
  activeMenuItem.subscribe(item => (active = item));
  $: split = active.item ? active.item.split("::") : [];
</script>

<li class="menu-label">
  <a
    on:click={action}
    class:is-active={split[depth] == text && active.depth == depth}>
    {text}
  </a>
  <slot />
</li>
