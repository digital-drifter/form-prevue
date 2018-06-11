module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/*': './src/*',
        vue$: 'vue/dist/vue.runtime.esm'
      }
    }
  }
}
