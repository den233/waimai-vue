/*
发送ajax请求
 */
import {reqAddress,
        reqFoodtypes,
        reqShops,
        reqShopInfo,
        reqShopGoods,
        reqShopRating,
        reqUser
} from '../api'
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
  //发送ajax请求异步获取地址
  async getAddress({commit, state}){
    const geohash = state.latitude+ ','+state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS,{address: result.data})
  },
  async getFoodTypes({commit}, callback){
    const result = await reqFoodtypes()
    commit(RECEIVE_FOODS,{foodTypes: result.data})
    callback && callback()
  },
  async getShops({commit, state}){
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS,{shops: result.data})
  },

  // 获取shopinfo、getShopGoods  getShopRatings
  async getShopInfo({commit,state}){
    const result = await reqShopInfo()
    commit(RECEIVE_INFO,{shopInfo: result.data})
  },
  async getShopGoods({commit,state},callback){
    const result = await reqShopGoods()
    commit(RECEIVE_GOODS,{shopGoods: result.data})
    callback && callback()
  },
  async getShopRatings({commit,state},callback){
    const result = await reqShopRating()
    commit(RECEIVE_RATINGS,{shopRatings: result.data})
    callback && callback()
  },

  // 保存 userInfo
  async recordUserInfo({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  // 异步获取用户信息  开始就执行
  async getUserInfo({commit},callback){
    const result = await reqUser()
    if(result.code === 0){
      commit(RECEIVE_USER_INFO,{userInfo: result.data})
      callback && callback()
    }
  },

  //  更新food的count
   updateFoodCount({commit},{food, isAdd}){
    if(isAdd){ // 增加
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{  // 减少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
   },
  //清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },


}
