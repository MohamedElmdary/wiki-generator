<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let theme: IGlobalOptions["theme"];
  export let classes: string;
  export let placeholder: string;

  let _theme: IGlobalOptions["theme"];
  let _class: string;
  $: {
    _theme = resolveTheme(theme);
    _class = classes ?? "";
  }
</script>

{#if _theme === "bulma"}
  <textarea class={`textarea ${_class}`} {placeholder} />
{/if}

<style lang="scss" scoped>
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/form/_all.sass";
  @import "bulma/sass/form/input-textarea.sass";
</style>
