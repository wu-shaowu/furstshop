const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:'http://localhost:3000'

  },
})
