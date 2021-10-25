<script lang="ts">
  import type { ISidenavRoute } from "./types";

  const routes: ISidenavRoute[] = [
    {
      label: "General",
      children: [
        { label: "dashboard", to: "/dashboard0", path: "/pages/dashboard" },
        { label: "dashboard 2", to: "/dashboard1", path: "/pages/dashboard" },
      ],
    },
    {
      label: "General",
      children: [
        { label: "dashboard", to: "/dashboard2", path: "/pages/dashboard" },
        { label: "dashboard 2", to: "/dashboard3", path: "/pages/dashboard" },
      ],
    },
    {
      label: "General",
      children: [
        { label: "dashboard", to: "/dashboard4", path: "/pages/dashboard" },
        { label: "dashboard 2", to: "/dashboard5", path: "/pages/dashboard" },
      ],
    },
  ];
</script>

<svelte:head>
  <script src="./build/elements/sidenav.wc.js"></script>
</svelte:head>

<tf-sidenav routes={JSON.stringify(routes)} />
