<template>
  <router-view />
  <br />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap");
html,
body,
#app {
  height: 100%;
  width: 100%;
}
html {
  min-width: fit-content;
}
body {
  font: {
    family: "League Spartan", sans-serif;
    size: 32px;
    weight: 700;
  }
  @include underLargeMobile {
    font-size: 25px;
  }
  color: colors.$main-text;
  background-color: colors.$page-background;
}
#app {
  @extend %center-flex;
}
</style>
