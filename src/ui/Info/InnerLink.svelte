<script>
  import { createEventDispatcher } from 'svelte';

  let dispatch = createEventDispatcher();
  export let isCurrentPageUrl;
  export let link;
</script>
<style>
  a, p {
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 3px 7px;
    text-decoration: none;
    color: rgb(119, 119, 119);
  }
  a:hover,
  a:active {
    border-color: rgba(175, 47, 47, 0.1);
  }
  p {
    display: inline;
    border-color: rgba(175, 47, 47, 0.2);
    cursor: default;
  }
</style>
{#if !isCurrentPageUrl}
  <a
    href={link}
    on:click|preventDefault={event => {
      dispatch('navigate', link);
    }}
  >
    <slot>Some link</slot>
  </a>
{:else}
  <p>
    <slot>Visited link</slot>
  </p>
{/if}
