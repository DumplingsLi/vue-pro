
var Mock = require('mockjs')

const data = Mock.mock('/order', {
  'data': [
    {
      'logo-pic': '../assets/logo/1.jpg',
      'name': '皇家鸡排（和平里店）',
      'buy-count': 5
    }, {
      'logo-pic': '../assets/logo/2.jpg',
      'name': '嘉和一品粥（交道口店）',
      'buy-count': 4
    }, {
      'logo-pic': '../assets/logo/1.jpg',
      'name': '猫眼（南锣鼓巷店）',
      'buy-count': 2
    }
  ],

  'code': 1
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
