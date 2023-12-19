<template>
  <section class="screen">
    <div>
      <p>
        <bdi>
          <slot></slot>
        </bdi>
      </p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
section.screen {
  margin: 25px 0 20px;
  padding: $main-padding;
  background-color: var(--screen-background-color);
  border-radius: $second-border-radius;
  user-select: none;
  direction: rtl;
  height: 98px;
  font-size: 42px;
  @include underLargeMobile {
    font-size: 30px;
    height: 85px;
  }
  div {
    overflow-x: auto;
    // Hide scrollbar
    // - Chrome, Safari and Opera
    &::-webkit-scrollbar {
      display: none;
    }
    // - IE and Edge
    -ms-overflow-style: none;
    // - Firefox
    scrollbar-width: none;
    p {
      width: 0;
    }
  }
}
</style>
