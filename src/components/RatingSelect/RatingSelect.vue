<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active:selectType===2}"
             @click="setSelectType(2, $event)">{{desc.all}}
         <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{active:selectType===0}"
            @click="setSelectType(0, $event)">{{desc.positive}}
        <span class="count">{{positiveLength}}</span>
      </span>
      <span class="block negative" :class="{active:selectType===1}"
            @click="setSelectType(1, $event)">{{desc.negative}}
        <span class="count">{{ratings.length-positiveLength}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click="toggleOnlyContent">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>
<script>
  export default{
    props:{
      desc: Object,
      onlyContent: Boolean,
      ratings:Array,
      selectType: Number
    },
    computed:{
      // 计算好评的个数
      positiveLength (){
        return this.ratings.reduce((preTotal, rating) =>{
          return preTotal + (rating.rateType===0 ? 1:0)
        },0)
      }

    },
    methods:{
      setSelectType(type, event){
        // 触发事件
        this.$emit('setSelectType', type)
      },
      toggleOnlyContent (event){
        if(!event._constructed){
          return
        }
        // 触发事件
        this.$emit('toggleOnlyContent')
      },
    }
  }
</script>
<!--<script>
  export default {
    props: {
      desc: Object,
      onlyContent: Boolean,
      ratings: Array,
      selectType: Number
    },

    computed: {
      positiveLength () {
        return this.ratings.reduce((preTotal, rating) => {
          return preTotal + (rating.rateType===0 ? 1 : 0)
        }, 0)
      }
    },

    methods: {
      setSelectType (type, event) {
        // 触发事件
        this.$emit('setSelectType', type)
      },

      toggleOnlyContent (event) {
        if(!event._constructed) {
          return
        }
        // 触发事件
        this.$emit('toggleOnlyContent')
      }
    }
  }
</script>-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    background #fff
    .rating-type
      padding: 18px 0
      margin: 0 18px
      bottom-border-1px(rgba(7,17,27,0.1))
      font-size: 0
      >span
        &:nth-child(1)
          background rgb(0,160,220)
      span:nth-child(2)
        background rgba(0,160,220,0.2)
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)

        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      bottom-border-1px(rgba(7,17,27,0.1))
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>

