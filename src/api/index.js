// 前后台交互模块
import ajax from './ajax'

// 根据经纬度获取地址信息
export const reqAddress = geohash => ajax('/api/position/'+ geohash)

// 获取msite页面食品分类列表
export const reqFoodtypes = () => ajax('/api/index_category')

// 获取msite商铺列表（根据经纬度）
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

// 获取图片验证码
export const reqCaptchas = () => ajax('/api/captcha')

// 账号密码登录
export const pwdLogin = ({name, pwd, captcha}) => ajax('/api/login_pwd',{
  name,
  pwd,
  captcha
}, 'POST')

// 获取短信验证码
export const sendCode = phone => ajax('/api/sendcode', {phone})

// 手机号验证码登录
export const phoneLogin = ({phone, code}) => ajax('/api/login_sms',{phone, code},'POST')

// 获取用户信息（根据会话）
export const reqUser = () => ajax('/api/userinfo')

// 获取shop的goods info ratings
export const reqShopInfo = () => ajax('/info')
export const reqShopGoods = () => ajax('/goods')
export const reqShopRating = () => ajax('/ratings')


