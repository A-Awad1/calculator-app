<template>
  <section class="keypad">
    <div class="counting-numbers">
      <button
        v-for="numButton in 9"
        :key="numButton"
        v-text="10 - numButton"
      ></button>
    </div>
    <button class="second-button">del</button>
    <button>+</button>
    <button>-</button>
    <button>.</button>
    <button>0</button>
    <button>/</button>
    <button>x</button>
    <button class="second-button reset">reset</button>
    <button class="equal">=</button>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
section.keypad {
  background-color: colors.$keypad-background;
  padding: $main-padding;
  border-radius: $second-border-radius;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 20px;
  @include underLargeMobile {
    gap: 0.5em;
  }
  .counting-numbers {
    grid-area: 1/1/4/4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    direction: rtl;
    gap: 20px;
    @include underLargeMobile {
      gap: 0.5em;
    }
  }
  button {
    &:not(.equal, .reset) {
      aspect-ratio: 1.6 / 1;
      height: 45px;
      @include underTablet {
        aspect-ratio: 1/1;
        height: 60px;
      }
      @include underLargeMobile {
        height: auto;
        min-height: 40px;
      }
    }
    padding-top: 8px;
    font-weight: 700;
    border-radius: $main-border-radius;
    color: colors.$second-text;
    background-color: colors.$key-main-background;
    user-select: none;
    z-index: 1;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: inherit;
      z-index: -1;
      box-shadow: 0 3px 0 0 colors.$key-main-shadow;
    }
    &:active {
      filter: contrast(1.25) brightness(1.7);
      &::after {
        filter: brightness(0.8);
      }
    }
    &.reset,
    &.equal {
      grid-column: span 2;
    }
    &.second-button {
      color: colors.$main-text;
      background-color: colors.$key-second-background;
      text-transform: uppercase;
      font-size: 20px;
      padding-top: 4px;
      &::after {
        box-shadow: 0 3px 0 0 colors.$key-second-shadow;
      }
    }
    &.equal {
      color: colors.$main-text;
      background-color: colors.$key-third-background;
      font-size: 24px;
      padding-top: 4px;
      &::after {
        box-shadow: 0 3px 0 0 colors.$key-third-shadow;
      }
    }
  }
}
</style>
