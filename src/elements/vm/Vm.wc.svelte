<svelte:options tag={null} />

<script lang="ts">
  import VM, { Disk, Env, Mount } from "../../types/vm";
  import type { IFormField } from "../../types";

  const data = new VM();

  const tabs = [
    { label: "Base", icon: "far fa-paper-plane" },
    { label: "Mounts", icon: "fas fa-database" },
    { label: "Envs", icon: "fas fa-code-branch" },
    { label: "Disks", icon: "far fa-save" },
    { label: "Configs", icon: "fas fa-cogs" },
  ];
  let active: number = 3;
  let loading = false;

  // prettier-ignore
  const baseFields: IFormField[] = [
    { label: "Name", symbol: 'name', placeholder: 'Your VM name.'},
    { label: "FList", symbol: 'flist', placeholder: 'Your flist.'},
    { label: "CPU", symbol: 'cpu', placeholder: 'Your Cpu size.', type: 'number'},
    { label: "Memory", symbol: 'memory', placeholder: 'Your Memory size.', type: 'number'},
    { label: "Entry Point", symbol: 'entrypoint', placeholder: 'Your Entrypoint.'},
  ];

  // prettier-ignore
  const networkFields: IFormField[] = [
    { label: "Network Name", symbol: "name", placeholder: "Your Network Name." },
    { label: "Network IP Range", symbol: "ipRange", placeholder: "Your Network IP Range." },
  ];

  // prettier-ignore
  const mountFields: IFormField[] = [
    { label: 'Disk Name', symbol: 'disk_name', placeholder: "Your Disk Name."},
    { label: 'Mount Point', symbol: 'mount_point', placeholder: "Your Mount Point."},
  ];

  // prettier-ignore
  const envFields: IFormField[] = [
    { label: 'Key', symbol: 'key', placeholder: "Your Env Key."},
    { label: 'Value', symbol: 'value', placeholder: "Your Env Value."},
  ];

  // prettier-ignore
  const diskFields: IFormField[] = [
    { label: "Name", symbol: "name", placeholder: "Your Disk Name." },
    { label: "Size", symbol: "size", placeholder: "Your Disk Size.", type: "number" },
    { label: "Description", symbol: "description", placeholder: "Your Disk Description." },
  ];

  // prettier-ignore
  const configFields: IFormField[] = [
    { label: "Twin ID", symbol: "twinId", placeholder: "Your Twin ID.", type: "number" },
    { label: "Proxy URL", symbol: "proxyURL", placeholder: "Your Proxy URL." },
    { label: "URL", symbol: "url", placeholder: "Your substrate URL." },
    { label: "Mnemonics", symbol: "mnemonics", placeholder: "Your Mnemonics." },
  ];
</script>

<form on:submit|preventDefault={() => console.log("test")} class="box">
  <h4 class="is-size-4">Deploy a Virtual Machine</h4>

  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      {#each tabs as tab, index (tab.label)}
        <li class={active === index ? "is-active" : ""}>
          <a href="#!" on:click|preventDefault={() => (active = index)}>
            <span class="icon is-small">
              <i class={tab.icon} aria-hidden="true" />
            </span>
            <span>{tab.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  {#if active === 0}
    <!-- Show Base Info -->
    {#each baseFields as field (field.symbol)}
      <div class="field">
        <p class="label">{field.label}</p>
        <div class="control">
          {#if field.type === "number"}
            <input
              class="input"
              type="number"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          {:else}
            <input
              class="input"
              type="text"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          {/if}
        </div>
      </div>
    {/each}

    <!-- Network info -->
    {#each networkFields as field (field.symbol)}
      <div class="field">
        <p class="label">{field.label}</p>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder={field.placeholder}
            bind:value={data.network[field.symbol]}
          />
        </div>
      </div>
    {/each}
  {/if}

  {#if active === 1}
    <div class="actions" style="margin-bottom: 20px;">
      <button
        type="button"
        class="button is-primary is-light"
        on:click={() => (data.mounts = [...data.mounts, new Mount()])}
      >
        <span class="icon is-medium">
          <i class="far fa-plus-square" />
        </span>
        <span>ADD Mount</span>
      </button>
    </div>
    <div class="vm-container">
      {#each data.mounts as mount, index (mount.id)}
        <div class="box">
          <div class="vm-header">
            <p class="is-size-5 has-text-weight-bold">{mount.disk_name}</p>
            <button
              type="button"
              class="button is-danger is-outlined"
              on:click={() =>
                (data.mounts = data.mounts.filter((_, i) => index !== i))}
            >
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
            </button>
          </div>
          {#each mountFields as field (field.symbol)}
            <div class="field">
              <p class="label">{field.label}</p>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder={field.placeholder}
                  bind:value={mount[field.symbol]}
                />
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  {#if active === 2}
    <div class="actions" style="margin-bottom: 20px;">
      <button
        type="button"
        class="button is-primary is-light"
        on:click={() => (data.envs = [...data.envs, new Env()])}
      >
        <span class="icon is-medium">
          <i class="far fa-plus-square" />
        </span>
        <span>ADD Env</span>
      </button>
    </div>
    <div class="vm-container">
      {#each data.envs as env, index (env.id)}
        <div class="box">
          <div class="vm-header">
            <p class="is-size-5 has-text-weight-bold">{env.key}</p>
            <button
              type="button"
              class="button is-danger is-outlined"
              on:click={() =>
                (data.envs = data.envs.filter((_, i) => index !== i))}
            >
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
            </button>
          </div>
          {#each envFields as field (field.symbol)}
            <div class="field">
              <p class="label">{field.label}</p>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder={field.placeholder}
                  bind:value={env[field.symbol]}
                />
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  {#if active === 3}
    <div class="actions" style="margin-bottom: 20px;">
      <button
        type="button"
        class="button is-primary is-light"
        on:click={() => (data.disks = [...data.disks, new Disk()])}
      >
        <span class="icon is-medium">
          <i class="far fa-plus-square" />
        </span>
        <span>ADD Disk</span>
      </button>
    </div>
    <div class="vm-container">
      {#each data.disks as disk, index (disk.id)}
        <div class="box">
          <div class="vm-header">
            <p class="is-size-5 has-text-weight-bold">{disk.name}</p>
            <button
              type="button"
              class="button is-danger is-outlined"
              on:click={() =>
                (data.disks = data.disks.filter((_, i) => index !== i))}
            >
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
            </button>
          </div>
          {#each diskFields as field (field.symbol)}
            <div class="field">
              <p class="label">{field.label}</p>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder={field.placeholder}
                  bind:value={disk[field.symbol]}
                />
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  {#if active === 4}
    {#each configFields as field (field.symbol)}
      <div class="field">
        <p class="label">{field.label}</p>
        <div class="control">
          {#if field.type === "number"}
            <input
              class="input"
              type="number"
              placeholder={field.placeholder}
              bind:value={data.configs[field.symbol]}
            />
          {:else}
            <input
              class="input"
              type="text"
              placeholder={field.placeholder}
              bind:value={data.configs[field.symbol]}
            />
          {/if}
        </div>
      </div>
    {/each}
  {/if}

  <div class="actions">
    <button
      class={"button is-primary " + (loading ? "is-loading" : "")}
      type="submit"
      disabled={loading}
    >
      Deploy
    </button>
  </div>
</form>

<style lang="scss" scoped>
  @import url("/assets/bulma.min.css");

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .vm-container {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 70vh;
    will-change: transform;
    padding-bottom: 5rem;
    margin-bottom: 20px;
  }

  .vm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
