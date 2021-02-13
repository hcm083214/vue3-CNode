<!--
 * @Author: 黄灿民
 * @Date: 2021-02-10 16:02:29
 * @LastEditTime: 2021-02-10 19:53:32
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\message\Message.vue
-->
<template>
  <section class="index-section">
    <div class="topics-container messages">
      <div class="new-msg">
        <div class="top">
          <router-link to="/">主页</router-link>
          <em> / </em>
          <span>新消息</span>
        </div>
        <Msg :readMessages="message.hasnot_read_messages" v-if='message' />
      </div>
      <div class="past-times">
        <div class="top">已读消息</div>
        <Msg :readMessages="message.has_read_messages"  v-if='message'/>
      </div>
    </div>
    <!-- <Sidebar /> -->
  </section>
</template>

<script lang="ts">
import { getMessages } from "@/server";
import { defineComponent, ref } from "vue";
import Msg from "@/components/msg/msg.vue";
export default defineComponent({
  components: { Msg },
  setup() {
    const message = ref();
    getMessages().then((res) => (message.value = res));
    return { message };
  },
});
</script>

<style lang="scss" scoped>
.messages {
  .top {
    padding: 10px 10px;
    background: #f6f6f6;

    a {
      color: #80bd01;

      &:hover {
        text-decoration: underline;
      }
    }

    em {
      color: #ccc;
    }

    span {
      color: #999;
    }
  }

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

  .past-times {
    margin-top: 15px;
  }
}
</style>