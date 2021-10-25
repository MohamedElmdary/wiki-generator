<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let theme: IGlobalOptions["theme"];
  export let classes: string;
  export let type: "text" | "password" | "email" = "text";
  export let placeholder: string;

  let _theme: IGlobalOptions["theme"];
  let _class: string;
  $: {
    _theme = resolveTheme(theme);
    _class = classes ?? "";
  }
</script>

{#if _theme === "bulma"}
  <input class={`input ${_class}`} {type} {placeholder} on:input />
{/if}

<style lang="scss" scoped>
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/form/_all.sass";
  @import "bulma/sass/form/input-textarea.sass";
</style>
