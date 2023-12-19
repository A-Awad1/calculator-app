<template>
  <section class="keypad">
    <div class="counting-numbers">
      <button
        v-for="numButton in 9"
        :key="numButton"
        v-text="10 - numButton"
        @click="updateInput"
      ></button>
    </div>
    <button v-text="'del'" class="second-button"></button>
    <button v-text="'+'" @click="updateOperator"></button>
    <button v-text="'-'" @click="updateOperator"></button>
    <button
      v-text="'.'"
      @click="
        updateInput($event);
        dot = false;
      "
      :disabled="!dot"
    ></button>
    <button v-text="'0'" @click="updateInput"></button>
    <button v-text="'/'" @click="updateOperator"></button>
    <button v-text="'x'" @click="updateOperator"></button>
    <button v-text="'reset'" class="second-button reset"></button>
    <button v-text="'='" class="equal" @click="equalProcess"></button>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      screenReader: 0,
      num1: 0,
      num2: "",
      operator: "",
      result: "",
      cashNum: "",
      cashOperator: "",
      dot: true,
    };
  },
  methods: {
    updateInput: function (event) {
      const inputNum = event.target.textContent;
      if (this.operator === "") {
        if (this.num1 === "" && inputNum === ".") {
          this.num1 = 0;
        }
        if (inputNum !== ".") {
          this.num1.toString() === "0" ? (this.num1 = "") : null;
        }
        this.num1 += inputNum.toString();
        this.screenReader = this.num1;
      } else {
        if (this.num2 === "" && inputNum === ".") {
          this.num2 = 0;
        }
        if (inputNum !== ".") {
          this.num2.toString() === "0" ? (this.num2 = "") : null;
        }
        this.num2 += inputNum.toString();
        this.screenReader = this.num2;
      }
    },
    updateOperator: function (event) {
      this.operatorProcess();
      const operator = event.target.textContent;
      this.operator = operator;
    },
    calculate: function (operator, secondNum) {
      switch (operator) {
        case "+":
          this.result = +this.num1 + +secondNum;
          break;
        case "-":
          this.result = +this.num1 - +secondNum;
          break;
        case "x":
          this.result = +this.num1 * +secondNum;
          break;
        case "/":
          this.result = +this.num1 / +secondNum;
          break;
      }
      this.screenReader = this.result;
      this.num1 = this.result;
      if (this.num2 !== "" && this.operator !== "") {
        this.cashNum = this.num2;
        this.cashOperator = this.operator;
        this.num2 = "";
        this.operator = "";
      }
    },
    equalProcess: function () {
      if (this.num2 !== "") {
        this.calculate(this.operator, this.num2);
      } else if (
        this.num2 === "" &&
        this.cashNum !== "" &&
        this.cashOperator !== ""
      ) {
        this.calculate(this.cashOperator, this.cashNum);
      }
    },
    operatorProcess: function () {
      if (this.num2 !== "") {
        this.calculate(this.operator, this.num2);
      }
    },
  },
  watch: {
    screenReader: function (v) {
      this.dot = !v.toString().includes(".");
      this.$emit("sendValue", v);
    },
  },
  emits: ["sendValue"],
};
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
