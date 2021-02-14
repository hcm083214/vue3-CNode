/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:08:23
 * @LastEditTime: 2021-02-14 11:13:22
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import Home from "@/views/home/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('@/views/login/Login.vue')
  },
  {
    path:'/messages',
    name:'Message',
    component:()=>import('@/views/message/Message.vue')
  },
  {
    path:'/user/:loginname',
    name:'User',
    component:()=>import('@/views/user/User.vue')
  },
  {
    path:'/topic/:id',
    name:'Topic',
    component:()=>import('@/views/topic/Topic.vue')
  },
  {
    path:'/create',
    name:"Create",
    component:()=>import('@/views/create/Create.vue')
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
