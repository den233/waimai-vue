
import Mock from 'mockjs'
// 引入数据，实际中需要从后台获取
import data from './data.json'
// (请求地址   模板数据)
Mock.mock('/goods',{code:0, data: data.goods})
Mock.mock('/ratings',{code:0, data: data.ratings})
Mock.mock('/info',{code:0, data: data.info})

// 不需要暴露，只用像css一样引入即可使用
