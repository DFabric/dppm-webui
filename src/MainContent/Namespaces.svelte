<script>
  import { namespaceStore } from "../store/namespaces";

  let namespaces = ["default-namespace"];
  $: namespaces = namespaces;
  namespaceStore.subscribe(list => (namespaces = list));
  let namespaceToAdd = "";
  const addNamespace = () =>
    namespaceStore.update(current => current + [namespaceToAdd]);
</script>

<div class="section">
  <table class="table">
    {#each namespaces as namespace}
      <tr>
        <td>namespace</td>
      </tr>
    {/each}
    <tr>
      <td>
        <input
          type="text"
          class="input"
          placeholder="Add a namespace"
          bind:value={namespaceToAdd} />
      </td>
      <td>
        <button class="button" on:click={addNamespace}>Add</button>
      </td>
    </tr>
  </table>
</div>
