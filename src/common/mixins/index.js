/*vue 组件的mixin模块*/
// 定义一个混入对象
export const ratingsMixin = {
  data(){
    return{
      selectType: 2, //0 推荐 1 吐槽 2 all
      onlyContent: false // false true
    }
  },
  methods: {
    setSelectType(selectType){
      this.selectType = selectType
      // console.log(this.selectType)
      this.$nextTick(() => { // 加载后重新刷新界面
        this.scroll.refresh()
      })
    },
    toggleOnlyContent(){
      this.onlyContent = !this.onlyContent
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    }
  },
  computed:{
    filterRatings(){
      // 取出相关数据  必须是state中定义的数据
      const ratings = this.shopRatings || this.food.ratings
      //  如果还没有数据，直接返回空数组
      if(!ratings){
        return []
      }
      const selectType = this.selectType // 0 1 2
      const onlyContent = this.onlyContent // true false
      // 通过数组的filter进行过滤
      return ratings.filter(ratings => {
        var {rateType, text} = ratings
        //  0/1  有值/没有值
        // 条件1：选择的类型：所有2||当前0/1
        // 条件2：onlyContent为false时返回ture不用判断文本|| 文本长度>0
        //
        // return ture/false
        return(selectType === 2||selectType===rateType)&&(!onlyContent||text.length>0)
      })
    }
  }
}
