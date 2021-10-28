<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let theme: IGlobalOptions["theme"] = "bulma";

  /* Themes */
  export let primary: boolean = false;
  export let link: boolean = false;
  export let info: boolean = false;
  export let success: boolean = false;
  export let warning: boolean = false;
  export let danger: boolean = false;
  export let light: boolean = false;
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let outlined: boolean = false;
  export let preicon: string = "";
  export let suficon: string = "";

  let _class: string = "";
  let _theme: IGlobalOptions["theme"];
  $: {
    _theme = resolveTheme(theme);
    if (primary) _class = "is-primary";
    else if (link) _class = "is-link";
    else if (info) _class = "is-info";
    else if (success) _class = "is-success";
    else if (warning) _class = "is-warning";
    else if (danger) _class = "is-danger";
    else if (light) _class = "is-light";

    if (light) _class += " is-light";
    if (loading) _class += " is-loading";
    if (outlined) _class += " is-outlined";
  }
</script>

{#if _theme === "bulma"}
  <button class={"button " + _class} {disabled}>
    {#if preicon}
      <span class="icon">
        <i class={preicon} />
      </span>
    {/if}
    <span>
      <slot />
    </span>
    {#if suficon}
      <span class="icon">
        <i class={suficon} />
      </span>
    {/if}
  </button>
{/if}

<style scoped lang="scss">
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/button.sass";
</style>
