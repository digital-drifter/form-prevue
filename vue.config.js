module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/*': './src/*',
        vue$: 'vue/dist/vue.common'
      }
    }
  }
}
