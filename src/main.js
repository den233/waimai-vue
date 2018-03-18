import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
//引入加载图片
import loading from './common/images/loading.gif'
import App from './App'
import router from './router'
import store from './store'

import './filters'

import './mock/mockServer' // 后面就可以访问内部定义好的接口
import Split from './components/Split/Split.vue'
import {Button} from 'mint-ui'
// 注册全局组件标签
Vue.component('Split',Split) // 全局可用  （标签名  组件）
Vue.component(Button.name, Button) //  标签名name值：mt-button

Vue.use(VueLazyload, {
  loading,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 配置路由，所有组件多了$route $router
  store  // 配置store, 所有组件多了$store
})
