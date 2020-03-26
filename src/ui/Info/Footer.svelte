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
  <div class="left">
    <slot name="left">0 items left</slot>
  </div>
  <div class="center">
    <slot name="center">Center</slot>
  </div>
  <div class="right">
    <slot name="right"></slot>
  </div>
</footer>
