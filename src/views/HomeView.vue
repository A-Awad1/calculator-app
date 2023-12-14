<template>
  <div class="container">
    <main>
      <calc-header></calc-header>
      <calc-screen>399,981</calc-screen>
      <section class="keypad"></section>
    </main>
  </div>
</template>

<script>
import CalcHeader from "@/components/CalcHeader.vue";
import CalcScreen from "@/components/CalcScreen.vue";
export default {
  name: "HomeView",
  components: {
    CalcHeader,
    CalcScreen,
  },
};
</script>

<style lang="scss">
.container {
  border: 1px solid red;
  min-height: 100vh;
  position: relative;
  main {
    border: 1px solid blue;
    padding: $main-padding;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    top: 20%; // temp.
    width: fit-content;

    section.keypad {
      background-color: colors.$keypad-background;
    }
  }
}
</style>
