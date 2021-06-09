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

  let isPressed = false;
  function buttonClicked(e, l) {
    if (isPressed) return;
    isPressed = true;
    e.target.classList.add("pressed");

    runCommand(l);

    setTimeout(() => {
      e.target.classList.remove("pressed");
    }, 200);
    setTimeout(() => {
      isPressed = false;
    }, 5000);
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="buttons" bind:this={buttons}>
  {#each $launchables.filter((l) => l.show) as l}
    <button on:click={(e) => buttonClicked(e, l)}>
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
    --icon-size: 3rem;
  }
  .buttons > button {
    display: grid;
    place-items: center;
    margin: 0;
    padding: 1rem;
    outline: none;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1.3rem;
    font-weight: 100;
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
  .buttons > button:global(.pressed:focus) {
    transform: scale(0.8);
    opacity: 0.5;
  }
  .buttons > button > span {
    margin-top: 1rem;
  }
</style>
