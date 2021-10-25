<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let theme: IGlobalOptions["theme"];
  export let classes: string;

  let _class: string;
  let _theme: IGlobalOptions["theme"];
  $: {
    _class = classes ?? "";
    _theme = resolveTheme(theme);
  }
</script>

{#if _theme === "bulma"}
  <button class={"button " + _class}>
    <slot />
  </button>
{/if}

<style scoped lang="scss">
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/button.sass";
</style>
