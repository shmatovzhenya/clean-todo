<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let checked = false;
</script>

<style>
  [type="checkbox"] {
    opacity: 0;
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;
  }
  .icon {
    position: absolute;
    z-index: -1;
    width: 32px;
    height: 32px;
  }
  svg {
    position: absolute;
    left: -12px;
    top: -12px;
    transform: scale(0.8);
  }
</style>

<div class="icon" aria-hidden="true">
  {#if checked}
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="-10 -18 100 135">
      <circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/>
      <path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="-10 -18 100 135">
      <circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/>
    </svg>
  {/if}
</div>
<input
  type="checkbox"
  bind:checked={checked}
  on:change={event => {
    dispatch('toggle');
  }}
>
