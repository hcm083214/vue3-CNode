<!--
 * @Author: 黄灿民
 * @Date: 2021-02-09 15:47:02
 * @LastEditTime: 2021-02-09 16:06:10
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\topics-list\TopicsList.vue
-->
<template>
  <ul class="unique-topics-list">
    <li v-for="item in topics" :key="item.id">
      <div class="avatar">
        <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
          <img :src="item.author.avatar_url" alt="头像" :title="item.author.loginname" />
        </router-link>
      </div>
      <div class="reply-view" v-if="item.reply_count !== undefined">{{ item.reply_count }}/{{ item.visit_count }}</div>
        <!-- <span class="tag" :class="tag(item).className" v-if="item.tab">{{ tag(item).text }}</span> -->
      <router-link class="title" :to="{name: 'Topic', params: {id: item.id}}">{{ item.title }}</router-link>
      <div class="last-reply-time">
        <!-- <time>{{ item.last_reply_at | fromNow }}</time> -->
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        topics:{
            type:Array,
            default:()=>([])
        }
    },
    setup (props) {
        

        return {
            topices:props.topics
        }
    }
})
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

    img {
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 2px;
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