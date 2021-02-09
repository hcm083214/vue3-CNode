# cnode

## 登录逻辑

1. 向服务器发起登录请求，得到结果后将token保存在localstorage中
2. 每次进入路由前router.beforeEach，都要向后端发送token,验证合法不合法，并将返回的信息保存在store中
3. 判断是否需要登录
   1. 需要登录
      1. token不合法，清除localstorage信息并跳转到登录页
      2. token合法，是登录页跳转到首页
      3. token合法，不是登录页直接放行
   2. 不需要登录直接放行

## nav标签选中

利用router-link的query属性去判断，监听route的变化去调用数据

```html
        <router-link
          :to="{ name: 'Home', query: { tab: 'dev' } }"
          :class="{ active: $route.query.tab == 'dev' }"
          >客户端测试</router-link
        >
```

