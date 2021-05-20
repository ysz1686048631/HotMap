import Vue from 'vue'
import App from './App.vue'
import temps from '@/components/temps'
Vue.use(temps);
Vue.config.productionTip = false
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
new Vue({
  render: h => h(App),
}).$mount('#app')
