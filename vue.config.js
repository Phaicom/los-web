module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/_include-media.scss";
          `,
        implementation: require("dart-sass"),
      },
    },
  },
};
