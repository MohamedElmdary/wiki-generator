<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";
  import Kubernetes, { Worker } from "../../types/kubernetes";
  import deployKubernetes from "../../utils/deployKubernetes";
  import { events } from "grid3_client_ts";

  export let theme: IGlobalOptions["theme"];
  $: _theme = resolveTheme(theme);

  const data = new Kubernetes();

  interface IFormField {
    label: string;
    placeholder?: string;
    symbol: string;
    textarea?: boolean;
    type?: "text" | "number" | "checkbox";
  }

  // prettier-ignore
  const kubernetesFields: IFormField[] = [
    { label: "Name", symbol: "name", placeholder: "Your K8S Name." },
    { label: "Secret", symbol: "secret", placeholder: "Your Secret." },
    { label: "SSH Key", symbol: "sshKey", placeholder: "Your SSH Key." },
    { label: "Metadata", symbol: "metadata", placeholder: "Your Metadata." },
    { label: "Description", symbol: "description", placeholder: "Your Description.", textarea: true },
  ];

  // prettier-ignore
  const networkFields: IFormField[] = [
    { label: "Network Name", symbol: "name", placeholder: "Your Network Name." },
    { label: "Network IP Range", symbol: "ipRange", placeholder: "Your Network IP Range." },
  ];

  // prettier-ignore
  const baseFields: IFormField[] = [
    { label: "Name", symbol: "name", placeholder: "Enter name." },
    { label: "Node", symbol: "node", placeholder: "Node ID.", type: 'number' },
    { label: "CPU", symbol: "cpu", placeholder: "CPU Size.", type: 'number' },
    { label: "Disk Size", symbol: "diskSize", placeholder: "Disk Size.", type: 'number' },
    { label: "Public IP", symbol: "publicIp", placeholder: "", type: 'checkbox' },
    { label: "Memory", symbol: "memory", placeholder: "Memory Size.", type: 'number' },
    { label: "Root FS Size", symbol: "rootFsSize", placeholder: "Root File System Size.", type: 'number' },
    { label: "Plantery", symbol: "plantery", placeholder: "", type: 'checkbox' },
  ];

  // prettier-ignore
  const configFields: IFormField[] = [
    { label: "Twin ID", symbol: "twinId", placeholder: "Your Twin ID.", type: "number" },
    { label: "Proxy URL", symbol: "proxyURL", placeholder: "Your Proxy URL." },
    { label: "URL", symbol: "url", placeholder: "Your substrate URL." },
    { label: "Mnemonics", symbol: "mnemonics", placeholder: "Your Mnemonics." },
  ];

  const tabs = [
    { label: "Base", icon: "far fa-paper-plane" },
    { label: "Master", icon: "fas fa-shield-alt" },
    { label: "Workers", icon: "fas fa-sitemap" },
    { label: "Configs", icon: "fas fa-cogs" },
  ];
  let active: number = 0;
  let loading = false;

  function onDeployKubernetes() {
    loading = true;

    function onLogInfo(...args) {
      console.log(args);
    }

    events.addListener("logs", onLogInfo);

    deployKubernetes(data)
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        loading = false;
        events.removeListener("logs", onLogInfo);
      });
  }
</script>

{#if _theme === "bulma"}
  <form on:submit|preventDefault={onDeployKubernetes} class="box">
    <h4 class="is-size-4">Deploy a Kubernetes</h4>

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
      {#each kubernetesFields as field (field.symbol)}
        <div class="field">
          <p class="label">{field.label}</p>
          <div class="control">
            {#if field.textarea}
              <textarea
                class="textarea"
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
      <!-- Show Master Info -->
      {#each baseFields as field (field.symbol)}
        <div class="field">
          <p class="label">{field.label}</p>
          <div class="control">
            {#if field.type === "number"}
              <input
                class="input"
                type="number"
                placeholder={field.placeholder}
                bind:value={data.master[field.symbol]}
              />
            {/if}

            {#if field.type === "checkbox"}
              <label class="checkbox">
                <input
                  type="checkbox"
                  value={data.master[field.symbol]}
                  on:change={() =>
                    (data.master[field.symbol] = !data.master[field.symbol])}
                />
                {field.label}
              </label>
            {/if}

            {#if !field.type}
              <input
                class="input"
                type="text"
                placeholder={field.placeholder}
                bind:value={data.master[field.symbol]}
              />
            {/if}
          </div>
        </div>
      {/each}
    {/if}

    {#if active === 2}
      <!-- Show Workers Info -->
      <div class="actions" style="margin-bottom: 20px;">
        <button
          type="button"
          class="button is-primary is-light"
          on:click={() => (data.workers = [...data.workers, new Worker()])}
        >
          <span class="icon is-medium">
            <i class="far fa-plus-square" />
          </span>
          <span>ADD Worker</span>
        </button>
      </div>
      <div class="worker-container">
        {#each data.workers as worker, index (worker.id)}
          <div class="box">
            <div class="worker-header">
              <p class="is-size-5 has-text-weight-bold">{worker.name}</p>
              <button
                type="button"
                class="button is-danger is-outlined"
                on:click={() =>
                  (data.workers = data.workers.filter((_, i) => index !== i))}
              >
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="fas fa-times" />
                </span>
              </button>
            </div>
            {#each baseFields as field (field.symbol)}
              <div class="field">
                <p class="label">{field.label}</p>
                <div class="control">
                  {#if field.type === "number"}
                    <input
                      class="input"
                      type="number"
                      placeholder={field.placeholder}
                      bind:value={worker[field.symbol]}
                    />
                  {/if}

                  {#if field.type === "checkbox"}
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        value={worker[field.symbol]}
                        on:change={() =>
                          (worker[field.symbol] = !worker[field.symbol])}
                      />
                      {field.label}
                    </label>
                  {/if}

                  {#if !field.type}
                    <input
                      class="input"
                      type="text"
                      placeholder={field.placeholder}
                      bind:value={worker[field.symbol]}
                    />
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}

    {#if active === 3}
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
        disabled={loading || !data.valid}
      >
        Deploy
      </button>
    </div>
  </form>
{/if}

<style lang="scss" scoped>
  @import url("/assets/bulma.min.css");
  // @import "bulma/bulma.sass";

  .worker-container {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 70vh;
    will-change: transform;
    padding-bottom: 5rem;
    margin-bottom: 20px;
  }

  .actions,
  .worker-header {
    display: flex;
    justify-content: flex-end;
  }

  .worker-header {
    justify-content: space-between;
  }
</style>
