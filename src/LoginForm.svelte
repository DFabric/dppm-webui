<script type="application/javascript">
  import { createEventDispatcher } from "svelte";
  export let ButtonLabel = "Submit";
  export let PasswordLabel = false;
  export let SubmitAction = apiKeySubmitted;

  let apiKey = "";
  function apiKeySubmitted(event) {
    busy = true;
    dispatch("submitted", apiKey);
    console.log(`submitted api key of ${apiKey}`);
    setTimeout(() => (busy = false), 100);
  }
  function pwChanged(event) {
    if (event && event.target) {
      console.debug((apiKey = event.target.value));
    }
  }
  const dispatch = createEventDispatcher();
  let busy = false;
  $: buttonClassName = busy ? "form-group button is-busy" : "form-group button";
</script>

<div class="modal is-active">
  <div class="modal-background" />
  <div class="modal-content columns">
    {#if PasswordLabel}
      <div class="column is-2">
        <label for="login-form-pw-input" class="label">{PasswordLabel}</label>
      </div>
    {/if}
    <div class="column">
      <input
        class="input"
        bind:value={apiKey}
        id="login-form-pw-input"
        type="password" />
    </div>
    <div class="column is-2">
      <div class={buttonClassName} on:click={apiKeySubmitted}>
        {ButtonLabel}
      </div>
    </div>
  </div>
</div>
