<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 22:19:26
 * @LastEditTime: 2021-02-09 19:02:57
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\home\HomeMain.vue
-->
<template>
  <section class="index-section">
    <div class="topics-container index-container">
      <!-- 导航 -->
      <nav class="nav">
        <router-link
          :to="{ name: 'Home' }"
          :class="{ active: $route.query.tab == 'all' || !$route.query.tab }"
          >全部</router-link
        >
        <router-link
          :to="{ name: 'Home', query: { tab: 'good' } }"
          :class="{ active: $route.query.tab == 'good' }"
          >精华</router-link
        >
        <router-link
          :to="{ name: 'Home', query: { tab: 'share' } }"
          :class="{ active: $route.query.tab == 'share' }"
          >分享</router-link
        >
        <router-link
          :to="{ name: 'Home', query: { tab: 'ask' } }"
          :class="{ active: $route.query.tab == 'ask' }"
          >问答</router-link
        >
        <router-link
          :to="{ name: 'Home', query: { tab: 'job' } }"
          :class="{ active: $route.query.tab == 'job' }"
          >招聘</router-link
        >
        <router-link
          :to="{ name: 'Home', query: { tab: 'dev' } }"
          :class="{ active: $route.query.tab == 'dev' }"
          >客户端测试</router-link
        >
      </nav>
      <div class="topics-list">
        <!-- 骨架图 -->
        <div class="mark-box" v-show="isShowMark">
          <div class="mark-line"></div>
          <div class="mark-line"></div>
          <div class="mark-line"></div>
        </div>
        <topics-list :topics="topicsData" />
      </div>
      <div class="pagination-box">
        <!-- <Page 
          :total="total" 
          :page-size="40" 
          @on-change="currentChange"
        >
        </Page> -->
      </div>
    </div>
    <!-- <Sidebar /> -->
  </section>
</template>

<script lang="ts">
import TopicsList from "@/components/topics-list/TopicsList.vue";
import { getTopicsData } from "@/server";
import { defineComponent, onMounted, reactive, ref, watchEffect } from "vue";
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
export default defineComponent({
  components: { TopicsList },
  setup() {
    const route = useRoute();
    const isShowMark = ref(false);

    const topicsData = reactive<TopicsData>({
      ask:[],
      share:[],
      job:[],
      good:[],
      dev:[],
      all:[],
    });
    watchEffect(async () => {
      const tab = (route.query.tab as TabList) || "all";
      isShowMark.value = true;
      topicsData[tab] = await getTopicsData({
        limit: 40,
        mdrender: false,
        tab: (route.query.tab as TabList) || "all",
        page: 1,
      });
      console.log("🚀 ~ file: HomeMain.vue ~ line 99 ~ watchEffect ~ topicsData[tab]", topicsData[tab])
      isShowMark.value = false;
    });
    onMounted(async () => {
      const tab = (route.query.tab as TabList) || "all";
      isShowMark.value = true;
      topicsData[tab] = await getTopicsData({
        limit: 40,
        mdrender: false,
        tab: (route.query.tab as TabList) || "all",
        page: 1,
      });

      isShowMark.value = false;
    });
    return { isShowMark, topicsData };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.index-section {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  .index-container {
    background: #fff;
    box-shadow: 0 0 8px #ccc;
  }

  .topics-container {
    .nav {
      width: 100%;
      padding: 10px 0;
      background: #f6f6f6;
      border-radius: 5px 5px 0 0;

      a {
        padding: 2px 5px;
        margin-left: 15px;
        color: #80bd01;

        &:hover {
          color: #333;
        }

        &.active {
          background: #80bd01;
          color: #fff;
          border-radius: 3px;
        }
      }
    }

    .topics-list {
      position: relative;
      border-radius: 0 0 5px 5px;
      overflow: hidden;
      min-height: 1000px;

      .mark-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;

        .mark-line {
          margin: 15px 0 0 15px;
          background: #f7f7f7;
          height: 35px;
          width: 40%;

          &:nth-child(2),
          &:nth-child(3) {
            width: 30%;
          }
        }
      }
    }
  }
  .pagination-box {
    margin: 15px 0 20px 10px;
  }
}
</style>