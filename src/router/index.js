import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Msite from '../pages/msite/Msite.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Profile from '../pages/profile/Profile.vue'*/
const Msite = () =>import('../pages/msite/Msite.vue')
const Search = () => import('../pages/search/Search.vue')
const Order = () => import('../pages/order/Order.vue')
const Profile = () => import('../pages/profile/Profile.vue')

import Login from '../pages/login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import UserInfo from '../pages/userInfo/UserInfo.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component: Msite,
      meta:{
        FooterShow:true
      }
    },
    {
      path:'/search',
      component: Search,
      meta:{
        FooterShow:true
      }
    },
    {
      path:'/order',
      component: Order,
      meta:{
        FooterShow:true
      }
    },
    {
      path:'/profile',
      component: Profile,
      meta:{
        FooterShow:true
      }
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path: '/userinfo',
      component: UserInfo
    },
    {
      path:'/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',  // 根路由是/shop
          redirect: '/shop/goods'
        },
      ]
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
