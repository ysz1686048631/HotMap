/*
 * @Author: your name
 * @Date: 2021-05-21 11:30:04
 * @LastEditTime: 2021-05-21 13:53:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \silders\vue.config.js
 */

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  
    // alias 配置
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
            //添加ts 
            config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
