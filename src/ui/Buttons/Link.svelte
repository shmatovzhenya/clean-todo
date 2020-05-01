<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>
<button on:click={() => dispatch('click')}>
  <slot>Clear completed</slot>
</button>
<style>
  button {
    outline: 0;
    border: 0;
    line-height: 20px;
    font-size: 14px;
    background: 0;
    color: #777;
  }
  button:hover {
    text-decoration: underline;
  }
</style>
