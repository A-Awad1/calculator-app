<template>
  <main>
    <calc-header></calc-header>
    <calc-screen>{{ finalReading }}</calc-screen>
    <calc-keypad @sendValue="updateValue"></calc-keypad>
  </main>
</template>

<script>
import CalcHeader from "@/components/CalcHeader.vue";
import CalcScreen from "@/components/CalcScreen.vue";
import CalcKeypad from "@/components/CalcKeypad.vue";
export default {
  name: "HomeView",
  data: function () {
    return {
      screenReading: 0,
    };
  },
  computed: {
    finalReading: function () {
      if (this.screenReading === "Cannot divide by zero") {
        return this.screenReading;
      } else {
        let format = (+this.screenReading).toLocaleString();
        if (this.screenReading.toString().slice(-1) === ".") {
          format += ".";
        }
        return format;
      }
    },
  },
  methods: {
    updateValue: function (v) {
      this.screenReading = v;
    },
  },
  components: {
    CalcHeader,
    CalcScreen,
    CalcKeypad,
  },
};
</script>

<style lang="scss">
main {
  padding: 10px;
  @include underLargeMobile {
    width: 100%;
  }
}
</style>
