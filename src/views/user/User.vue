/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/camelcase */
<!--
 * @Author: 黄灿民
 * @Date: 2021-02-09 16:01:55
 * @LastEditTime: 2021-02-15 16:26:07
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\user\User.vue
-->
<template>
  <section class="index-section">
    <div class="topics-container user" v-if="user">
      <div class="box">
        <div class="box-title">
          <router-link to="/">主页</router-link>
          <em class="slashes"> / </em>
          <span>个人主页</span>
        </div>
        <div class="user-info">
          <div class="user">
            <img :src="user.avatar_url" alt="avatar"  />
            <span>{{ user.loginname }}</span>
          </div>
          <div>{{ user.score }} 积分</div>
          <div class="view-topics-collections">
            <router-link :to="`/user/${user.loginname}/collections`"
              >查看话题收藏</router-link
            >
          </div>
          <div class="create-at">注册时间 {{ timeFormat(user.create_at) }}</div>
        </div>
      </div>
      <div class="box">
        <div class="box-title">最近创建的话题</div>
        <user-topic-list :topics="user.recent_topics" />
      </div>
      <div class="box">
        <div class="box-title">最近参与的话题</div>
        <user-topic-list :topics="user.recent_replies" />
      </div>
    </div>
  </section>
  <side-bar />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { timeFormat } from "@/util/common";
import { useRoute } from "vue-router";
import { getUserInfoServe } from "@/server";
import SideBar from "@/components/siderbar/SideBar.vue";
import UserTopicList from "@/components/user-topic-list/UserTopicList.vue";

export default defineComponent({
  name:'User',
  components: { SideBar, UserTopicList },
  setup() {
    const route = useRoute();
    const user = ref();
    const loginname = route.params.loginname as string;
    getUserInfoServe(loginname).then((res) => {
      user.value = res.data;
    });
    return { timeFormat, user };
  },
});
</script>
<style lang="scss" scoped>
.user {
  .box {
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;

    .box-title {
      padding: 10px;
      background: #f6f6f6;

      a {
        color: #80bd01;

        &:hover {
          text-decoration: underline;
        }
      }

      .slashes {
        color: #ccc;
      }

      span {
        color: #999;
      }
    }

    .user-info {
      padding: 15px 10px;

      .user {
        margin-bottom: 10px;

        img {
          width: 50px;
          height: 50px;
          background: #f6f6f6;
          vertical-align: middle;
        }

        span {
          margin-left: 10px;
          vertical-align: middle;
        }
      }

      .view-topics-collections {
        margin-top: 5px;

        a {
          color: #333;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .create-at {
        margin-top: 10px;
        color: #666;
      }
    }
  }

  .unique-topics-list .title {
    width: calc(100% - 100px) !important;
  }
}
</style>