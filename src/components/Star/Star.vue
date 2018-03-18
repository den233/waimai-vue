<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(sc,index) in starClass" :class="sc" :key="index">
    </span>
  </div>
</template>
<script>
  const STAR_ON = 'on'
  const STAR_HALF = 'half'
  const STAR_OFF = 'off'

  export default{
    props:{
      score: Number, // 评分
      size: Number  // 尺寸
    },

    computed:{
      starClass(){
        // 定义一个空数组存放on half off
        var scs = []
        const {score} = this
        // 评分的整数部分为on
        const scoreIntager = Math.floor(score)
        for(let i = 0; i < scoreIntager; i++){
          scs.push(STAR_ON)
        }
        // 小数部份大于5的取half
        if(score*10%10 >= 5){
          scs.push(STAR_HALF)
        }
        //不足5个的添加off
        if(scs.length < 5){
          scs.push(STAR_OFF)
        }
        return scs
      }
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star //2x图 3x图
    /*float left*/
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
