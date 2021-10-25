<script lang="ts">
  import type { ISidenavRoute, IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";

  export let routes: string;
  export let theme: IGlobalOptions["theme"];

  let _routes: ISidenavRoute[];
  let _theme: IGlobalOptions["theme"];
  $: {
    _routes = JSON.parse(routes);
    _theme = resolveTheme(theme);
  }

  let active: string = null;

  function onRoute(route: ISidenavRoute) {
    active = route.to;
    console.log({ route });
  }
</script>

{#if _theme === "bulma"}
  <!-- currently supporting only 2 levels -->
  <aside class="menu">
    {#each _routes as route}
      <p class="menu-label">{route.label}</p>
      {#if route.children?.length}
        <ul class="menu-list">
          {#each route.children as child}
            <li>
              <a
                class={active === child.to ? "is-active" : undefined}
                href={`/#${child.to}`}
                on:click={onRoute.bind(undefined, child)}
              >
                {child.label}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </aside>
{/if}

<style scoped lang="scss">
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/base/generic.sass";
  @import "bulma/sass/base/minireset.sass";
  @import "bulma/sass/components/menu.sass";
</style>
