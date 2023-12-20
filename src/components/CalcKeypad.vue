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
    <button
      v-text="'del'"
      class="second-button"
      @click="del"
      :disabled="!delEnabled"
    ></button>
    <button
      v-text="'+'"
      @click="updateOperator"
      :disabled="!operatorsEnabled"
      class="operator"
    ></button>
    <button
      v-text="'-'"
      @click="updateOperator"
      :disabled="!operatorsEnabled"
      class="operator"
    ></button>
    <button
      v-text="'.'"
      @click="
        updateInput($event);
        dotEnabled = false;
      "
      :disabled="!dotEnabled"
    ></button>
    <button v-text="'0'" @click="updateInput"></button>
    <button
      v-text="'/'"
      @click="updateOperator"
      :disabled="!operatorsEnabled"
      class="operator"
    ></button>
    <button
      v-text="'x'"
      @click="updateOperator"
      :disabled="!operatorsEnabled"
      class="operator"
    ></button>
    <button
      v-text="'reset'"
      class="second-button reset"
      @click="reset"
    ></button>
    <button v-text="'='" class="equal" @click="equalProcess"></button>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      screenReading: 0,
      num1: 0,
      num2: "",
      operator: "",
      result: "",
      cashNum: "",
      cashOperator: "",
      dotEnabled: true,
      delEnabled: false,
      operatorsEnabled: true,
    };
  },
  methods: {
    updateInput: function (event) {
      const inputNum = event.target.textContent;
      if (this.operator === "") {
        if (!this.delEnabled) {
          this.num1 = 0;
        }
        if (this.num1 === "" && inputNum === ".") {
          this.num1 = 0;
        }
        if (inputNum !== ".") {
          this.num1.toString() === "0" ? (this.num1 = "") : null;
        }
        this.num1 += inputNum.toString();
        this.screenReading = this.num1;
      } else {
        if (this.num2 === "" && inputNum === ".") {
          this.num2 = 0;
        }
        if (inputNum !== ".") {
          this.num2.toString() === "0" ? (this.num2 = "") : null;
        }
        this.num2 += inputNum.toString();
        this.screenReading = this.num2;
      }
      this.delEnabled = true;
      this.operatorsEnabled = true;
    },
    updateOperator: function (event) {
      this.operatorProcess();
      const operator = event.target.textContent;
      this.operator = operator;
      this.delEnabled = false;
      this.dotEnabled = true;
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
          if (+secondNum === 0) {
            this.result = "Error";
            this.operatorsEnabled = false;
          } else {
            this.result = +this.num1 / +secondNum;
          }
          break;
      }
      this.screenReading = this.result;
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
      this.delEnabled = false;
      this.dotEnabled = true;
    },
    operatorProcess: function () {
      if (this.num2 !== "") {
        this.calculate(this.operator, this.num2);
      }
    },
    del: function () {
      if (this.screenReading === this.num1 && this.operator === "") {
        this.num1 = this.num1.toString().slice(0, -1);
        this.num1.toString() === "" ? (this.num1 = 0) : null;
        this.screenReading = this.num1;
      } else if (this.screenReading === this.num2) {
        this.num2 = this.num2.toString().slice(0, -1);
        this.num2.toString() === "" ? (this.num2 = 0) : null;
        this.screenReading = this.num2;
      }
    },
    reset: function () {
      this.screenReading = 0;
      this.num1 = 0;
      this.num2 = "";
      this.operator = "";
      this.result = "";
      this.cashNum = "";
      this.cashOperator = "";
      this.delEnabled = false;
      this.operatorsEnabled = true;
    },
  },
  watch: {
    screenReading: function (v) {
      if (this.delEnabled) {
        this.dotEnabled = !v.toString().includes(".");
      }
      this.$emit("sendValue", v);
    },
  },
  emits: ["sendValue"],
  mounted: function () {
    let allButtons = document.querySelectorAll(`.keypad button`);
    document.addEventListener("keydown", (event) => {
      allButtons.forEach((e) => {
        switch (event.key) {
          case e.textContent:
            e.click();
            break;
          case "Backspace":
            e.textContent === "del" ? e.click() : null;
            break;
          case "Escape":
            e.textContent === "reset" ? e.click() : null;
            break;
          case "Enter":
            e.textContent === "=" ? e.click() : null;
            break;
          case "*":
          case "X":
            e.textContent === "x" ? e.click() : null;
            break;
        }
      });
    });
  },
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
    &:disabled {
      cursor: no-drop;
      &:active {
        filter: brightness(1);
        &::after {
          filter: brightness(1);
        }
      }
      &.operator {
        opacity: 0.7;
      }
    }
  }
}
</style>
