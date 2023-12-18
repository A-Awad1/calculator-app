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
  background-color: var(--keypad-background-color);
  padding: $main-padding;
  border-radius: $second-border-radius;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 20px;
  @include underLargeMobile {
    gap: 0.5em;
  }
  div.counting-numbers {
    grid-area: 1/1/4/4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    direction: rtl;
    justify-items: end;
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
        max-height: 60px;
        min-height: 40px;
      }
    }
    padding-top: 8px;
    font-weight: inherit;
    border-radius: $main-border-radius;
    color: var(--key-main-text-color);
    background-color: var(--key-main-background-color);
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
      box-shadow: 0 3px 0 0 var(--key-main-shadow-color);
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
      color: var(--key-second-text-color);
      background-color: var(--key-second-background-color);
      text-transform: uppercase;
      padding-top: 4px;
      font-size: 20px;
      @include underLargeMobile {
        font-size: 16px;
      }
      &::after {
        box-shadow: 0 3px 0 0 var(--key-second-shadow-color);
      }
    }
    &.equal {
      color: var(--key-third-text-color);
      background-color: var(--key-third-background-color);
      padding-top: 4px;
      font-size: 24px;
      @include underLargeMobile {
        font-size: 16px;
      }
      &::after {
        box-shadow: 0 3px 0 0 var(--key-third-shadow-color);
      }
    }
  }
}
</style>
