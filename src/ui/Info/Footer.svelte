<script>
</script>
<style>
  footer {
    display: grid;
    grid-template-areas: "left right";
  }
  .left {
    grid-area: left;
  }
  .center {
    grid-column: 1 / -1;
    grid-row: 1;
    justify-self: center;
  }
  .right {
    grid-area: right;
    justify-self: right;
  }
</style>
<footer>
  <aside class="left">
    <slot name="left">0 items left</slot>
  </aside>
  <aside class="center">
    <slot name="center">Center</slot>
  </aside>
  <aside class="right">
    <slot name="right"></slot>
  </aside>
</footer>
