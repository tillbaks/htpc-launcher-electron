<script>
  import Icon from "./Icon.svelte";
  import { launchables } from "./store";

  const addLaunchable = () => {
    $launchables.push({ args: [] });
    launchables.set($launchables);
    window.scrollTo(0, document.body.scrollHeight);
  };
  const removeLaunchable = (index) => {
    $launchables.splice(index, 1);
    launchables.set($launchables);
  };
  const addArgument = (launchable) => {
    launchable.args.push("");
    launchables.set($launchables);
  };
  const removeArgument = (launchable, index) => {
    launchable.args.splice(index, 1);
    launchables.set($launchables);
  };
</script>

<div class="launchables">
  <button on:click={addLaunchable}><Icon icon="mdiPlusCircleOutline" /></button>
  {#each $launchables as l, index}
    <div class="launchable">
      <div>Enabled</div>
      <input type="checkbox" bind:checked={l.show} />
      <div>Remove</div>
      <button on:click={() => removeLaunchable(index)}
        ><Icon icon="mdiDeleteForever" /></button
      >
      <div>Name</div>
      <input type="text" bind:value={l.name} />
      <div>Icon</div>
      <input type="text" bind:value={l.icon} />
      <div>Command</div>
      <input type="text" bind:value={l.cmd} />
      <div>Directory</div>
      <input type="text" bind:value={l.cwd} />
      <div>Arguments</div>
      <div class="arguments">
        {#if l.args}
          {#each l.args as arg, index}
            <input type="text" bind:value={arg} />
            <button on:click={() => removeArgument(l, index)}
              ><Icon icon="mdiDeleteForever" /></button
            >
          {/each}
          <div />
          <button on:click={() => addArgument(l)}
            ><Icon icon="mdiPlusCircleOutline" /></button
          >
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .launchables {
    display: grid;
    gap: 1rem;
    color: white;
    text-shadow: 0 0 0.2em rgb(0 0 0 / 25%);
    padding: 1rem;
  }
  .launchable {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.3rem 1rem;
    place-items: center end;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.03);
  }
  input[type="text"] {
    min-width: 50vw;
    width: 100%;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.4);
    outline: none;
    transition: background-color 250ms, border 250ms;
    color: white;
    text-shadow: 0 0 0.2em rgb(0 0 0 / 25%);
  }
  input[type="text"]:focus {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  .arguments {
    grid-area: span 2;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.3rem;
  }
  button {
    background-color: #f4f4f4;
    outline: none;
    color: white;
    --icon-size: 2rem;
    padding: 0;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: background-color 250ms, border 250ms;
  }
  button:hover,
  button:focus {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
</style>
