<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let theme: IGlobalOptions["theme"];
  $: _theme = resolveTheme(theme);

  export let primary: boolean = false;
  export let link: boolean = false;
  export let info: boolean = false;
  export let success: boolean = false;
  export let warning: boolean = false;
  export let danger: boolean = false;
  export let light: boolean = false;
  export let deletable: boolean = false;

  let _class: string = "";
  $: {
    if (primary) _class += "is-primary ";
    if (link) _class += "is-link ";
    if (info) _class += "is-link ";
    if (success) _class += "is-success ";
    if (warning) _class += "is-warning ";
    if (danger) _class += "is-danger ";
    if (light) _class += "is-light ";
  }

  let deleted = false;
</script>

{#if !deleted}
  {#if _theme === "bulma"}
    <div class={`notification ${_class}`}>
      {#if deletable}
        <button class="delete" on:click={() => (deleted = true)} />
      {/if}
      <slot />
    </div>
  {/if}
{/if}

<style lang="scss" scoped>
  @import url("/assets/bulma.min.css");
</style>
