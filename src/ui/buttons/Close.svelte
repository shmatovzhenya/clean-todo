<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let visible = false;
</script>

<button class:visible={visible} on:click={() => dispatch('close')}></button>

<style>
  button {
    outline: 0;
    width: 40px;
    height: 40px;
    border: 0;
    padding: 0;
    font-size: 30px;
    background: 0;
    color: #cc9a9a;
    appearance: none;
    -webkit-font-smoothing: atialiased;
  }

  button:hover {
    color: #af5b5e;
  }

  button:not(.visible) {
    position: absolute !important;
    height: 1px; 
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  }

  button:after {
    content: '×';
  }
</style>
