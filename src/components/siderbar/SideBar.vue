<!--
 * @Author: 黄灿民
 * @Date: 2021-02-13 13:29:49
 * @LastEditTime: 2021-02-14 10:35:49
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\siderbar\SideBar.vue
-->
<template>
  <aside class="sidebar">
    <div class="personal-information side-bar">
      <div v-if="propsFrom !== 'topic'">
        <div v-if="isLogin">
          <div class="top user-select-none">个人信息</div>
          <div class="info user-select-none">
            <router-link
              :to="{ name: 'User', params: { loginname: userInfo.loginname } }"
            >
              <img :src="userInfo.avatar_url" alt="头像" />
            </router-link>
            <router-link
              :to="{ name: 'User', params: { loginname: userInfo.loginname } }"
              class="nickname"
              >{{ userInfo.loginname }}</router-link
            >
          </div>
          <div class="publish-topic">
            <router-link to="/release/create">发布话题</router-link>
          </div>
        </div>
        <div class="tourist-box" v-else>
          <div class="cnode">CNode：Node.js专业中文社区</div>
          <div class="tourist">
            <span>当前是游客状态，您可以 </span>
            <router-link to="/login">登录</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="top user-select-none">作者</div>
        <div class="info user-select-none">
          <router-link
            :to="{ name: 'User', params: { loginname: propsAuthor.loginname } }"
          >
            <img :src="propsAuthor.avatar_url" alt="头像" />
          </router-link>
          <router-link
            :to="{ name: 'User', params: { loginname: propsAuthor.loginname } }"
          >
            <em class="nickname">{{ propsAuthor.loginname }}</em>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { isLoginFn } from "@/util/common";
import { defineComponent, ref } from "vue";
export const defaultAvatar =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==";

export default defineComponent({
  props: {
    from: {
      type: String,
      default: "",
    },
    author: {
      type: Object,
      default: () => ({
        // eslint-disable-next-line @typescript-eslint/camelcase
        avatar_url: defaultAvatar, // 头像
        id: "", // 用户 id
        loginname: "", // 用户名
      }),
    },
  },
  setup(props) {
    const path = location.pathname;
    console.log("🚀 ~ file: SideBar.vue ~ line 63 ~ setup ~ path",props.author);
    const isLogin = isLoginFn();
    const userInfo = ref();
    userInfo.value = JSON.parse(localStorage.getItem("userInfo") as string);
    console.log(
      "🚀 ~ file: SideBar.vue ~ line 65 ~ setup ~ userInfo.value",
      userInfo.value
    );
    return {
      isLogin,
      userInfo,
      propsFrom: props.from,
      propsAuthor: props.author,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 290px;
  float: right;

  .personal-information {
    background: #fff;
    border-radius: 5px;

    .top {
      padding: 10px;
      background: #f6f6f6;
    }

    .info {
      padding: 10px;

      img {
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #f7f7f7;
        object-fit: cover;
      }

      .nickname {
        margin-left: 15px;
        color: #333;
        cursor: pointer;
      }

      a {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .publish-topic {
      padding: 0 0 10px 10px;

      a {
        display: inline-block;
        position: relative;
        margin: 5px 0 0 0;
        padding: 5px 10px;
        background: #80bd01;
        color: #fff;
        border-radius: 5px;
        font-weight: 500;
        border: 1px solid #80bd01;

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          border-radius: 5px;
          opacity: 0;
          transition: opacity 0.1s linear;
        }

        &:hover:after {
          opacity: 0.05;
        }
      }
    }

    .tourist-box {
      padding: 10px;
    }

    .cnode {
      color: #000;
    }

    .tourist {
      margin-top: 15px;

      a {
        color: #2d8cf0;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // 收款
  .pay {
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
    background: #fff;

    img {
      width: 250px;
      height: 250px;
      object-fit: cover;
    }
  }

  .scann-qrcode {
    margin-top: 15px;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    text-align: center;

    .scann-qrcode-title {
      padding: 10px;
      margin-bottom: 10px;
      background: #f6f6f6;
    }

    img {
      width: 250px;
      height: 250px;
      pointer-events: none;
    }
  }
}
</style>