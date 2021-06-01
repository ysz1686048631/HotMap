/*
 * @Author: your name
 * @Date: 2021-04-15 14:33:47
 * @LastEditTime: 2021-05-21 10:37:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import temps from '@/components/temps';
// import './components/temps/components/iconsvg/index';
import './assets/icons'
Vue.use(temps);
Vue.config.productionTip = false
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
new Vue({
  render: h => h(App),
}).$mount('#app')
