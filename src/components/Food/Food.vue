<template>
  <transition name="move">
    <div class="food" v-show="isShow" ref="food">
      <div class="food-content">
        <div class="image-header">
          <!--<img :src="food.image">-->
          <!--懒加载-->
          <img v-lazy="food.image">
          <div class="back" @click="showOrHide(false)">
            <i class="iconfont icon-arrow_left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月销{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <!--<div class="buy" v-if="!food.count" @click="addToCart">
            加入购物车
          </div>-->
        </div>
        <Split></Split>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect :desc="{all: '全部',positive:'推荐',negative:'吐槽'}"
                         :onlyContent="onlyContent"
                         :ratings="food.ratings"
                         :selectType="selectType"
                         @toggleOnlyContent="toggleOnlyContent"
                         @setSelectType="setSelectType"
                         v-if="food.ratings"></RatingSelect>
          <div class="rating-wrapper">
            <ul>
              <li class="rating-item border-1px" v-for="rating in filterRatings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
              <span class="iconfont"
                    :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}">
              </span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length===0">
              暂无评论
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll'
  import CartControl from '../CartControl/CartControl.vue'
  import RatingSelect from '../RatingSelect/RatingSelect.vue'
  import {ratingsMixin} from '../../common/mixins'

  export default{
    mixins: [ratingsMixin], // 配置混合

    props: {
      food: Object
    },
    data(){
      return{
        isShow: false
      }
    },
    methods: {
      showOrHide(isShow){ // 显示隐藏当前的food
        this.isShow = isShow
        if(this.isShow){ // 只有隐藏时才需要做
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.food,{
                click: true
              })
            }else{ // 重新刷新页面
              this.scroll.refresh()
            }
          })
        }
      },

      addToCart(){
        this.$store.dispatch('updataFoodCount',{food:this.food,isADD:true})
      }
    },

    components: {
      CartControl,
      RatingSelect
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff

    &.move-enter-active, &.move-leave-active
      transition: all .2s linear
    &.move-enter, &.move-leave-active
      opacity 0
      transform: translate3d(100%, 0, 0)

    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_left
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: green
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>

