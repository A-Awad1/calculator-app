<template>
  <main>
    <calc-header></calc-header>
    <calc-screen>399,981</calc-screen>
    <!-- <calc-screen>11111111111111119999999999999999111</calc-screen> -->
    <calc-keypad></calc-keypad>
  </main>
</template>

<script>
import CalcHeader from "@/components/CalcHeader.vue";
import CalcScreen from "@/components/CalcScreen.vue";
import CalcKeypad from "@/components/CalcKeypad.vue";
export default {
  name: "HomeView",
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
