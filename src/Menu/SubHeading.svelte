<script>
  import { activeMenuItem } from "../store/menu";
  export let action,
    text,
    depth = 0;
  let active = { item: "Applications", depth: 0 };
  $: active = active;
  activeMenuItem.subscribe(item => (active = item));
  $: split = active.item ? active.item.split("::") : [];
</script>

<li>
  <a
    class:is-active={split[Number(depth)] == text && active.depth == depth}
    on:click={action}>
    {text}
  </a>
  <slot />
</li>
