<template>
  <main>
    <calc-header></calc-header>
    <calc-screen>{{ screenReading }}</calc-screen>
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
