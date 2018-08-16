import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foodsList: [],
    userList: {},
    curUserName: ''
  },
  getters: {
    foodsListLength (state) {
      return state.foodsList.length
    },
    totalCount (state) {
      let count = 0
      state.foodsList.forEach((item) => {
        count += item.count
      })
      return count
    },
    totalPrice (state) {
      let price = 0
      state.foodsList.forEach((item) => {
        price += item.count * item.min_price
      })
      return price
    }
  },
  mutations: {
    pushItem (state, item) {
      state.foodsList.push(item)
    },
    deleteItem (state, item) {
      let index = state.foodsList.indexOf(item)
      state.foodsList.splice(index, 1)
    },
    clearAll (state) {
      state.foodsList.forEach((item) => {
        Vue.delete(item, 'count')
      })
      state.foodsList = []
    },
    getUserList (state, res) {
      state.userList = res.data
    },
    getCurUser (state) {
      state.curUserName = state.userList.name
    }
  },
  actions: {
    getGoods () {
      return fetch('/goods/:id')
        .then(res => {
          return res.json()
        })
    },
    getUser ({commit}) {
      fetch('/login')
        .then(res => {
          return res.json()
        })
        .then(res => {
          if (res.code === 1) {
            commit('getUserList', {data: res.data})
          }
        })
    }
  }
})
