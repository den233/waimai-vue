<template>
  <div>
    <div class="goods">
      <!--菜单-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in shopGoods" :key="index"
              :class="{current:index===currentIndex}" @click="selectCurrent(index)">
            <span class="text bottom-border-1px">
              <span class="icon" v-if="good.type>=0" :class="supportClasses[good.type]"></span>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--食物列表-->
      <div class="foods-wrapper">
        <ul ref="foodsWarpperUl">
          <li class="food-list food-list-hook"
              v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月销{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!--购物车-->
                  <div class="cartcontrol-wrapper">
                    <!--添加food组件-->
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--底部购物车-->
      <ShopCart/>
    </div>
    <Food :food="selectedFood" ref="food"></Food>
    <Food :food="selectedFood" ref="food"></Food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'

  export default{
    data() {
      return{
        supportClasses: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        scrollY: 0, //右侧y轴滑动坐标
        tops: [], // 包含右侧所有分类小列表的top值\
        selectedFood: {} //选择要显示的food
      }
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(() => {
         // 初始滚动
          this._initScroll()
          // 初始化tops
          this._initTops()
        })
      })
    },
    computed: {
      ...mapState(['shopGoods']),
      // 当前分类的下标
      currentIndex(){
        const {scrollY, tops} = this
        // 将scrollY 与tops比较 大于当前的top 小于下一个
        // findIndex（） 返回true所对应的top的下标
        return tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
      }
    },
    methods:{
      _initScroll(){
        // 左侧列表滚动
        new BScroll('.menu-wrapper',{
          click: true
        })
        // 右侧列表滚动  将foodsScroll存到this中
        this.foodsScroll = new BScroll('.foods-wrapper',{
          click: true,
          probeType: 2, // 手指滑动（惯性滑动和编码滑动不监视）
        })
        // 监视滑动
        this.foodsScroll.on('scroll',(pos) => {
          console.log(pos.y)
          // 保存y
          this.scrollY = Math.abs(pos.y)
        })
        // 监视滑动结束
        this.foodsScroll.on('scrollEnd',(pos) => {
          console.log('滑动结束',pos.y)
        })
      },
      _initTops(){
        const tops = []
        let top = 0
        //计算各个top并保存到top是中
        tops.push(top)
        // 得到ul下所有的子li  返回伪数组
        const lis = this.$refs.foodsWarpperUl.getElementsByClassName('food-list-hook')
//        console.log(lis)
        // 转为真数组
        Array.prototype.slice.call(lis).forEach((li, index) => {
          top += li.clientHeight  // clientHeight 是当前li的高度
          tops.push(top)
        })
        // 保存tops
        this.tops = tops
        console.log(this.tops)
      },
      // 选择当前分类
      selectCurrent(index){
        // 得到滚动的目标坐标
        const top = this.tops[index]
        // 更新目标的scrollY
        this.scrollY = top
        // 平滑滚动到指定位置 (x,y,时间)
        this.foodsScroll.scrollTo(0,-top, 300)
      },
      // 点击显示食物详情
      showFood(food){
        // 保存food
        this.selectedFood = food
        //显示food
        this.$refs.food.showOrHide(true) // 父组件调用子组件的方法
      }
    },
    components: {
      CartControl,
      ShopCart,
      Food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 66px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        margin-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin-left: 18px
        padding 18px 18px 18px 0
        background-color #fff
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
            right: 18px
            bottom: 12px
</style>

