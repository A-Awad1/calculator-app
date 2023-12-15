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
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-radius: $main-border-radius;
    color: colors.$second-text;
    background-color: colors.$key-main-background;
    box-shadow: 0 3px 0 0 colors.$key-main-shadow;
    padding: 7px 20px 1px;
    min-width: 56px;
    @include underLargeMobile {
      padding: 15px 12px 7px;
    }
    &.reset,
    &.equal {
      grid-column: span 2;
    }
    &.second-button {
      color: colors.$main-text;
      background-color: colors.$key-second-background;
      box-shadow: 0 3px 0 0 colors.$key-second-shadow;
      text-transform: uppercase;
      font-size: 20px;
      padding-bottom: 3px;
      @include underLargeMobile {
        padding-bottom: 9px;
      }
    }
    &.equal {
      color: colors.$main-text;
      background-color: colors.$key-third-background;
      box-shadow: 0 3px 0 0 colors.$key-third-shadow;
      font-size: 24px;
    }
  }
  .counting-numbers {
    grid-area: 1/1/4/4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    direction: rtl;
  }
}
</style>
