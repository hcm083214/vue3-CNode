// import './plugins/axios'
/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:08:23
 * @LastEditTime: 2021-02-13 11:47:49
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element3/lib/theme-chalk/index.css'
import '@/assets/index.css'
// import '@/assets/icon/iconfont.js'

import { ElContainer, ElHeader,
    ElFooter,ElMain,ElPagination } from 'element3'

import store from './store'

createApp(App).use(store).use(router)
    .use(ElContainer)
    .use(ElHeader)
    .use(ElFooter)
    .use(ElMain)
    .use(ElPagination)
    .mount('#app')
