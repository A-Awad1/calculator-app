<template>
  <section class="screen"><slot></slot></section>
</template>

<script>
export default {};
</script>

<style lang="scss">
section.screen {
  background-color: colors.$screen-background;
  width: 100%;
  border-radius: $second-border-radius;
  margin: 20px 0 10px;
  padding: 28px 25px;
  text-align: end;
  font-size: 42px;
}
</style>
