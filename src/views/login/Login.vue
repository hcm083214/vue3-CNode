<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 15:30:51
 * @LastEditTime: 2021-02-08 21:38:27
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\login\Login.vue
-->
<template>
  <section class="login">
    <div class="box">
      <div class="input last">
        <input
          type="text"
          maxlength="50"
          v-model.trim="accessToken"
          placeholder="Access Token"
        />
      </div>
      <div class="get-access-token">
        <a href="https://cnodejs.org/setting" target="_blank"
          >如何获取Access Token？</a
        >
      </div>
      <div class="submit user-select-none" @click="handleLogin">Sign in</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { login } from "@/server/index.ts";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const saveUserInfo = (userInfo: object) =>
      store.commit("saveUserInfo", userInfo);
    const accessToken = ref("");
    const handleLogin = async () => {
      const userInfo = await login(accessToken.value);
      saveUserInfo(userInfo);
      localStorage.setItem('userInfo',JSON.stringify(userInfo))
        router.push({
            name:'Home'
        })
    };
    return { accessToken, handleLogin };
  },
});
</script>

<style lang="scss" scoped>
.login {
  .box {
    width: 300px;
    margin: 80px auto;
    padding: 70px 20px;
    background: #444;
    border-radius: 3px;
  }

  .get-access-token {
    margin-top: 10px;

    a {
      color: #fff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .input {
    height: 45px;

    input {
      width: 100%;
      height: 100%;
      padding: 0 0 0 8px;
      box-sizing: border-box;
      font-size: 16px;
    }
  }

  .last input {
    border-radius: 0 0 5px 5px;
  }

  .submit {
    position: relative;
    margin-top: 15px;
    padding: 10px 0;
    background: #f9671e;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

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
    }

    &:active:after {
      opacity: 0.2;
    }
  }
}
</style>