/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 11:25:51
 * @LastEditTime: 2021-02-21 09:49:35
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\store\index.ts
 */
// import { login as loginServe } from '@/server'
// import { useRouter } from 'vue-router'
import { login as loginServe} from '@/server';
import { useRouter } from 'vue-router';
import { createStore } from 'vuex'
interface LoginParams {
  isRequireLogin: boolean;
}
export default createStore({
  state: {
    userInfo: {},
    accessToken: '',
    isLogin: false,
  },
  mutations: {
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    saveAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    }
  },
  actions: {
    login({ commit, state }, options: LoginParams) {
      // const router = useRouter(); 
      state.accessToken = localStorage.getItem('accessToken') as string;
      if (state.accessToken) {
        loginServe(state.accessToken).then(res => {
          commit('saveUserInfo', res.data);
        })
      } else {
        // options.isRequireLogin ?
        //   router.push({
        //     name: "Login"
        //   }) : ''
      }
    }
  },
  modules: {
  }
})
