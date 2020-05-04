<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let value = '';
  export let theme = 'none';
</script>
<input
  bind:value={value}
  class:none={theme === 'none'}
  class:editable={theme === 'editable'}
  on:input={event => {
    event.preventDefault();
    dispatch('input', event.target.value);
  }}
/>
<style>
  input {
    outline: 0;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin: 0;
    text-indent: 20px;
    font-size: 24px;
  }
  input.none {
    border: 0;
    text-indent: 0;
  }
  input.editable {
    border: 1px solid #999;
  }
  input.editable:focus {
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  }
</style>
