<template>
  <div class="container">
    <main>
      <header>
        <h1>calc</h1>
        <div class="themes-control">
          <span>theme</span>
          <div class="themes-buttons">
            <button
              v-for="(themeButton, index) in 3"
              :key="index"
              @click="theme = index + 1"
              :class="{ selected: theme === index + 1 }"
            ></button>
          </div>
        </div>
      </header>
      <section class="keypad"></section>
      <section class="buttons"></section>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data: function () {
    return {
      theme: 1,
    };
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
    margin: auto;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 50px;
      > {
        h1 {
          font-size: 25px;
        }
        .themes-control {
          @extend %center-flex;
          gap: 20px;
          span {
            font-size: 10px;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }
          .themes-buttons {
            display: flex;
            gap: 4px;
            padding: 4px;
            border-radius: 10px;
            background-color: colors.$screen-background;
            button {
              width: 14px;
              aspect-ratio: 1/1;
              border-radius: 50%;
              border: none;
              background-color: colors.$key-third-background;
              position: relative;
              counter-increment: button-num;
              cursor: pointer;
              &:not(.selected) {
                visibility: hidden;
              }
              &::before {
                content: counter(button-num);
                visibility: visible;
                position: absolute;
                top: -19px;
                left: 50%;
                transform: translateX(-50%);
                font: {
                  size: 12px;
                  weight: 700;
                }
              }
            }
          }
        }
      }
    }
    section.keypad {
    }
    section.buttons {
    }
  }
}
</style>
