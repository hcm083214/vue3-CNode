<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:32:38
 * @LastEditTime: 2021-02-10 10:54:09
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\header\CNodeHeader.vue
-->
<template>
  <header class="header">
    <div class="header-box">
      <div class="left">
        <router-link to="/" class="logo">
          <img
            src="https://static2.cnodejs.org/public/images/cnodejs_light.svg"
            alt="logo"
          />
        </router-link>
        <search-box />
      </div>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link
          to="/messages"
          v-if="isLogin"
          :class="{ 'unread-msg': messageCount > 0 }"
          >未读消息</router-link
        >
        <a
          href="https://github.com/hcm083214"
          ref="noopenr noreferer"
          target="_blank"
          >关于作者
        </a>
        <span href="javascript:;" v-if="isLogin" @click="handleLogout"
          >退出</span
        >
        <router-link to="/login" v-else>登录</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { isLoginFn } from "@/util/common";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import SearchBox from "../search-box/SearchBox.vue";

export default defineComponent({
  components: { SearchBox },
  setup() {
    const store = useStore();
    const isLogin = isLoginFn();
    const handleLogout = () => store.commit("saveUserInfo", {});

    return {
      handleLogout,
      isLogin,
    };
  },
});
</script>

<style lang='scss' scoped>
@import "@/assets/mixin.scss";
.header {
  z-index: 6;
  position: relative;
  padding: 10px 10px 15px 0;
  background: #444;

  .header-box {
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    @include flex();
  }

  .logo {
    float: left;
    img {
      width: 120px;
      height: auto;
      pointer-events: none;
    }
  }

  .nav {
    margin-top: 8px;
    float: right;

    a,
    span {
      position: relative;
      color: #ccc;
      margin-left: 20px;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    .unread-msg {
      &:after {
        content: "";
        position: absolute;
        top: -3px;
        right: -9px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f50;
      }
    }
  }
}
</style>