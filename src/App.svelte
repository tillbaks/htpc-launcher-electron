<script>
  import { onMount } from "svelte";
  import Config from "./Config.svelte";
  import Menu from "./Menu.svelte";
  import { launchables } from "./store";
  import { setListener } from "./ElectronInterface";

  let config = $launchables.length === 0;

  let currentTime;
  {
    function updateTime() {
      const d = new Date();
      currentTime =
        (d.getHours() < 10 ? "0" : "") +
        d.getHours() +
        ":" +
        (d.getMinutes() < 10 ? "0" : "") +
        d.getMinutes();
    }
    updateTime();
    setInterval(updateTime, 15000);
  }

  onMount(() => {
    setListener(onEvent);
  });

  let focus = true;
  function onEvent(event, ...args) {
    switch (event) {
      case "focus":
        focus = true;
        break;
      case "blur":
        focus = false;
        break;
    }
  }
</script>

<main class:focus>
  <div class="top-bar">
    <div class="clock" on:click={() => (config = !config)}>
      {currentTime}
    </div>
  </div>
  {#if !config}
    <Menu />
  {:else}
    <Config />
  {/if}
</main>

<style>
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    place-items: end center;
    padding: 5rem;
    color: hsl(0, 0%, 95%);

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
  }

  main.focus {
    /** causes cpu/gpu usage so only do it when actually focused **/
    animation: gradient 30s linear infinite alternate;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .top-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    place-items: end;
    width: 100%;
  }

  .clock {
    font-weight: 100;
    font-size: 4rem;
    opacity: 0.3;
    line-height: 1;
  }
</style>
