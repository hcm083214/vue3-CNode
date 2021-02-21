# vue3-CNode

- 基于[vue-cnode](https://github.com/xjh22222228/vue-cnode)进行改造
- 使用vue3 composition API代替options API
- 利用typescript进行类型申明

## 开发技术

```js
  "dependencies": {
    "element3": "0.0.39",
    "vue": "^3.0.0",
    "vue-router": "^4.0.0-0",
    "vuex": "^4.0.0-0",
    "axios": "^0.18.0",
  },
  "devDependencies": {
    "sass": "^1.26.5",
    "typescript": "~3.9.3",
  }
```

## 目录结构

```js
|-- vue3-CNode 
    |-- vue.config.js  # 代理设置
    |-- src
        |-- App.vue
        |-- main.ts
        |-- shims-vue.d.ts
        |-- assets
        |   |-- github.svg
        |   |-- index.css # css样式初始化
        |   |-- logo.png
        |   |-- mixin.scss # 公共样式
        |   |-- not-match.gif
        |   |-- icon
        |       |-- iconfont.js # svg图标，因ts关系未启用
        |-- components
        |   |-- footer
        |   |   |-- CNodeFooter.vue # 页脚
        |   |-- header
        |   |   |-- CNodeHeader.vue # 头部
        |   |-- msg
        |   |   |-- msg.vue # 消息列表
        |   |-- siderbar
        |   |   |-- SideBar.vue # 侧边栏
        |   |-- topics-list
        |   |   |-- TopicsList.vue # 话题列表
        |   |-- user-topic-list
        |       |-- UserTopicList.vue # 用户相关话题列表
        |-- router
        |   |-- index.ts # 路由配置
        |-- server
        |   |-- api.ts # 后端接口
        |   |-- index.ts # 后端请求
        |-- store
        |   |-- index.ts # store配置
        |-- util
        |   |-- common.ts # 公共函数
        |-- views
            |-- 404
            |   |-- 404.vue # 404页面
            |-- create
            |   |-- Create.vue # 新建话题页面
            |-- home
            |   |-- Home.vue # 首页
            |-- login
            |   |-- Login.vue # 登录页
            |-- message
            |   |-- Message.vue # 未读消息页面
            |-- topic
            |   |-- collect.ts
            |   |-- like.ts
            |   |-- Topic.vue # 话题详情页
            |-- user
                |-- User.vue # 用户详情页
```

## 套路总结

### 登录状态持久化

套路一：

适用场景：页面需要登录才能访问

1. 登录页面，向服务器发起登录请求，得到结果后将token保存在localstorage中
2. 每次进入路由前router.beforeEach，都要向后端发送token,验证合法不合法，并将返回的信息保存在store中
3. 判断是否需要登录
   1. 需要登录
      1. token不合法，清除localstorage信息并跳转到登录页
      2. token合法，是登录页跳转到首页
      3. token合法，不是登录页直接放行
   2. 不需要登录直接放行

套路二：

适用场景：某些功能需要登录才能访问

1. 登录页面，token保存在localstorage中，向服务器发起登录请求，将得到的信息放在保存在vuex中
2. 是否需要登录，需要登录判断登录状态，先从localstorage取出token，向服务器发起登录请求验证token，正确则为登录，错误则未登录

### nav标签

利用router-link的query属性去判断，通过watchEffect监听route tab的变化去调用数据

```html
<router-link
  :to="{ name: 'Home', query: { tab: 'dev' } }"
  :class="{ active: $route.query.tab == 'dev' }"
>客户端测试
</router-link>
```

