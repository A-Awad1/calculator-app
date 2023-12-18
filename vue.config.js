const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData: `@use "~@/scss/DividedFiles/helpers" as *;`,
      },
    },
  },
});
