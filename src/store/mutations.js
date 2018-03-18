/*
直接跟新state的数据
*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_FOODS](state, {foodTypes}){
    state.foodTypes = foodTypes
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RECEIVE_INFO](state,{shopInfo}){
    state.shopInfo = shopInfo
  },
  [RECEIVE_GOODS](state,{shopGoods}){
    state.shopGoods = shopGoods
  },
  [RECEIVE_RATINGS](state,{shopRatings}){
    state.shopRatings = shopRatings
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){ // 第一次添加时没有count
      // food.count = 1 // 添加count属性, 并指定为1
      // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      // 给有数据绑定的对象添加指定属性名和值的属性(有绑定)
      Vue.set(food, 'count', 1)
      state.shopCart.push(food) // 添加到购物车
    }else{ // 有count
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){ // count有值才能减少
      food.count--
      if(food.count===0){ //如果数量减为0, 从购物车中移除
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    // 清空数量totalCount
    state.shopCart.forEach(food => food.count = 0)
    // 将foods置为空数组
    state.shopCart = []
  }
}
