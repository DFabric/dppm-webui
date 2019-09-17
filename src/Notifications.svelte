<script>
  import { notifications } from "./store/notifications.js";
  import { fade } from "svelte/transition";
  let notificationValues = [];
  $: notificationValues = notificationValues;

  const del = notification => {
    notifications.update(orig => {
      const idx = orig.indexOf(notification);
      console.debug("deleting notification at index " + idx);
      return orig.slice(0, idx).concat(orig.slice(idx + 1, orig.length));
    });
    setTimeout(() => {
      console.debug(notificationValues);
    }, 200);
  };

  notifications.subscribe(newNotifs => (notificationValues = newNotifs));
</script>

<div style={`position: absolute; right: 5em; top: 5em`}>
  {#each notificationValues as notification, index}
    <div
      class={`notification${notification.kind ? ' is-' + notification.kind : ''}`}
      in:fade={{ duration: 250 }}
      out:fade={{ duration: 250 }}>
      <button class="delete" on:click={() => del(notification)} />
      {notification.message || notification}
    </div>
  {/each}
</div>
