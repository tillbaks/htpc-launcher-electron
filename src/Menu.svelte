<script>
  import { launchables } from "./store";
  import { runCommand } from "./ElectronInterface";
  import Icon from "./Icon.svelte";
  import { getKeyboardFocusableElements } from "./Utils";

  let buttons;
  $: focusable = buttons && getKeyboardFocusableElements(buttons);
  let currentFocus;

  function onKeyDown(event) {
    currentFocus = focusable.includes(document.activeElement)
      ? document.activeElement
      : focusable[0];

    const currentIndex = focusable.indexOf(currentFocus);

    switch (event.key) {
      case "ArrowUp": {
        break;
      }
      case "ArrowDown": {
        break;
      }
      case "ArrowLeft": {
        const prevIndex =
          (((currentIndex - 1) % focusable.length) + focusable.length) %
          focusable.length;
        currentFocus = focusable[prevIndex];
        currentFocus.focus();
        break;
      }
      case "ArrowRight": {
        const nextIndex =
          (((currentIndex + 1) % focusable.length) + focusable.length) %
          focusable.length;
        currentFocus = focusable[nextIndex];
        currentFocus.focus();
        break;
      }
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="buttons" bind:this={buttons}>
  {#each $launchables.filter((l) => l.show) as l}
    <button on:click={() => runCommand(l)}>
      <Icon icon={l.icon} />
      <span>{l.name}</span>
    </button>
  {/each}
</div>

<style>
  .buttons {
    margin-bottom: 10vh;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 1rem;
  }
  .buttons > button {
    display: grid;
    place-items: center;
    margin: 0;
    padding: 3vh;
    outline: none;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: hsl(0, 0%, 95%);
    border: 1px solid rgba(255, 255, 255, 0);
    background-color: transparent;
    transition: transform 250ms ease-out, opacity 250ms;
    opacity: 0.7;
  }
  .buttons > button:focus {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transform: scale(1.2);
    opacity: 1;
  }
  .buttons > button > span {
    margin-top: 1rem;
  }
</style>
