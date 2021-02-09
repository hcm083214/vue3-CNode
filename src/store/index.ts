/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 11:25:51
 * @LastEditTime: 2021-02-08 20:23:34
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\store\index.ts
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{},
  },
  mutations: {
    saveUserInfo(state,userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
