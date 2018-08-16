import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  // 从state派生的状态，可通过getters访问
  getters: {
    doubleCount: state => {
      return state.count * 2
    }
  },
  // 更改state的唯一方法是提交mutation
  mutations: {
    // payload为载荷,常为对象
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  // 异步的提交mutation，可包含任意异步操作
  actions: {
    increment (context) {
      context.commit({
        type: 'increment',
        amount: 10
      })
    }
  }
})
