<script>
  export let crossed = false;
</script>
<p class:crossed>
  <slot>
    Some Label
  </slot>
</p>
<style>
  p {
    word-break: break-all;
    line-height: 29px;
    font-size: 24px;
    color: #4d4d4d;
    transition: color .4s;
  }
  p.crossed {
    text-decoration-line: line-through;
    color: #d9d9d9;
  }
</style>
