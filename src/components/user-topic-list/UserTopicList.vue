<!--
 * @Author: 黄灿民
 * @Date: 2021-02-15 14:22:40
 * @LastEditTime: 2021-02-15 16:22:52
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\user-topic-list\UserTopicList.vue
-->
<template>

  <section class="user-topic">
    <ul>
      <li v-for="item in topic" :key="item.id">
        <div class="left">
          <router-link
            :to="{ name: 'User', params: { loginname: item.author.loginname } }"
          >
            <div class="img">
              <img :src="item.author.avatar_url" alt="" />
            </div>
          </router-link>
          <router-link :to="{ name: 'Topic', params: { id: item.id } }">
            <span>{{ item.title }}</span>
          </router-link>
        </div>
        <div class="create-at">
          {{ timeFormat(item.last_reply_at) }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { timeFormat } from "@/util/common";
import { defineComponent } from "vue";

export default defineComponent({
  name:'UserTopicList',
  props: {
    topics: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return {
      topic: props.topics,
      timeFormat,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.user-topic {
    padding:5px 10px;
  ul > li {
    @include flex();
    .left {
      @include flex();
      .img {
        width: 30px;
        margin-right:15px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>