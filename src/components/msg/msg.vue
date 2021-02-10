<!--
 * @Author: 黄灿民
 * @Date: 2021-02-10 16:39:28
 * @LastEditTime: 2021-02-10 17:03:52
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\msg\msg.vue
-->
<template>
  <div class="msg-list">
    <!-- <div class="msg-loading" v-show="loading"></div> -->
    <div class="no-msg" v-show="message.length === 0">暂无消息</div>
    <ul>
      <li v-for="item in message" :key="item.id">
        <div v-if="item.type === 'reply'">
          <router-link :to="`/user/${item.author.loginname}`">{{
            item.author.loginname
          }}</router-link>
          <span> 回复了你的话题 </span>
          <router-link :to="`/topic/${item.topic.id}`">{{
            item.topic.title
          }}</router-link>
        </div>
        <div v-else-if="item.type == 'at'">
          <router-link :to="`/user/${item.author.loginname}`">{{
            item.author.loginname
          }}</router-link>
          <span> 在话题 </span>
          <router-link :to="`/topic/${item.topic.id}`">{{
            item.topic.title
          }}</router-link>
          <span> 中@了你</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent ,PropType} from "vue";

export default defineComponent({
  props: {
    readMessages: {
      type: Array as PropType<object[]>,
      default: () => [],
    },
  },
  setup(props) {
    return { message: props.readMessages };
  },
});
</script>

<style lang="scss" scoped>
.msg-list {
  position: relative;
  background: #fff;
  padding: 10px;

  .msg-loading {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 20px;
    background: #f7f7f7;
  }

  li {
    padding: 10px 0;

    &:not(:nth-last-child(1)) {
      border-bottom: 1px solid #f6f6f6;
    }

    > div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    a {
      color: #08c;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>