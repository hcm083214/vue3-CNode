<!--
 * @Author: 黄灿民
 * @Date: 2021-02-09 15:47:02
 * @LastEditTime: 2021-02-09 21:46:28
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\topics-list\TopicsList.vue
-->
<template>
  <ul class="unique-topics-list">
    <li v-for="item in topics[tab]" :key="item.id">
      <div class="avatar">
        <router-link
          :to="{ name: 'User', params: { loginname: item.author.loginname } }"
        >
          <div class="img">
            <img
              :src="item.author.avatar_url"
              alt="头像"
              :title="item.author.loginname"
            />
          </div>
        </router-link>
      </div>
      <div class="reply-view" v-if="item.reply_count !== undefined">
        {{ item.reply_count }}/{{ item.visit_count }}
      </div>
      <span class="tag" :class="tag(item).className" v-if="item.tab">{{
        tag(item).text
      }}</span>
      <router-link
        class="title"
        :to="{ name: 'Topic', params: { id: item.id } }"
        >{{ item.title }}</router-link
      >
      <div class="last-reply-time">
        <time>{{ timeFormat(item.last_reply_at) }}</time>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
type TabList = "ask" | "share" | "job" | "good" | "dev" | "all";
interface TopicsData {
  ask: Array<object>;
  share: Array<object>;
  job: Array<object>;
  good: Array<object>;
  dev: Array<object>;
  all: Array<object>;
}
interface Topic {
  top: boolean;
  good: boolean;
  tab: string;
}
export default defineComponent({
  props: {
    topics: {
      type: Object as PropType<TopicsData>,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();
    const tab = ref("");
    watchEffect(() => {
      tab.value = (route.query.tab as TabList) || "all";
    });
    const tag = (topic: Topic) => {
      if (topic.top) {
        return {
          text: "置顶",
          className: "top",
        };
      }
      if (topic.good) {
        return {
          text: "精华",
          className: "good",
        };
      }
      switch (topic.tab) {
        // 问答
        case "ask":
          return {
            text: "问答",
            className: topic.tab,
          };
        // 分享
        case "share":
          return {
            text: "分享",
            className: topic.tab,
          };
        // 招聘
        case "job":
          return {
            text: "招聘",
            className: topic.tab,
          };
        // 精华
        case "good":
          return {
            text: "精华",
            className: topic.tab,
          };
        // 测试
        case "dev":
          return {
            text: "测试",
            className: topic.tab,
          };
        default:
          return {
            text: "",
            className: "default",
          };
      }
    };

    const timeFormat = (time: Date) => {
      const now = new Date();
      const start = new Date(time);
      const diffTime = now.getTime() - start.getTime();
      const day = Math.floor(diffTime / (24 * 3600 * 1000));
      const hours = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000));
      const month = Math.floor(diffTime / (24 * 3600 * 1000) / 31);
      const year = Math.floor(diffTime / (24 * 3600 * 1000) / 31 / 12);
      const fromNow =
        day > 365
          ? `${year}年前`
          : day > 31
          ? `${month}月前`
          : day > 1
          ? `${day}天前`
          : `${hours}小时前`;
      return fromNow;
    };
    return {
      topices: props.topics,
      tab,
      tag,
      timeFormat,
    };
  },
});
</script>

<style lang="scss" scoped>
.unique-topics-list {
  li {
    overflow: hidden;
    padding: 10px;

    &:not(:nth-last-child(1)) {
      border-bottom: 1px solid #f6f6f6;
    }

    &:hover {
      background: #eee;
    }
  }

  .avatar {
    float: left;
    .img {
      width: 35px;
      overflow: hidden;
      img {
        width: 100%;
        height: 35px;
        object-fit: cover;
        border-radius: 2px;
      }
    }
  }

  .reply-view {
    float: left;
    width: 70px;
    text-align: center;
    font-size: 12px;
    margin: 9px 0 0 20px;
  }

  .tag {
    float: left;
    margin-top: 7px;
    font-size: 12px;
    color: #999;
    background: #e5e5e5;
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: 500;

    &.good,
    &.top {
      background: #80bd01;
      color: #fff;
    }
  }

  .title {
    display: inline-block;
    width: calc(100% - 230px);
    margin: 6px 0 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
      color: #333;
    }
  }

  .last-reply-time {
    float: right;
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>