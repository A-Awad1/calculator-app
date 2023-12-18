<template>
  <header>
    <h1>calc</h1>
    <div class="themes-control">
      <span>theme</span>
      <div class="themes-buttons">
        <button
          v-for="themeButton in 3"
          :key="themeButton"
          @click="theme = +themeButton"
          :class="{ selected: theme === +themeButton }"
        ></button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "CalcHeader",
  data: function () {
    return {
      theme: +localStorage.theme || 1,
    };
  },
  watch: {
    theme: {
      handler: function (v) {
        document.documentElement.setAttribute("theme", v);
        localStorage.theme = v;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
header {
  * {
    user-select: none;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  > {
    h1 {
      font-size: 25px;
      @include underLargeMobile {
        font-size: 22px;
      }
    }
    .themes-control {
      @extend %center-flex;
      gap: 20px;
      span {
        letter-spacing: 0.8px;
        text-transform: uppercase;
        font-size: 10px;
        @include underLargeMobile {
          font-size: 9px;
        }
      }
      .themes-buttons {
        display: flex;
        gap: 4px;
        padding: 4px;
        border-radius: 10px;
        background-color: var(--keypad-background-color);
        button {
          width: 14px;
          aspect-ratio: 1/1;
          border-radius: 50%;
          background-color: var(--key-third-background-color);
          position: relative;
          counter-increment: button-num;
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
            @include underLargeMobile {
              font-size: 11px;
              top: -18px;
            }
          }
          &:active {
            filter: contrast(1.25) brightness(1.7);
          }
        }
      }
    }
  }
}
</style>
