<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 22:19:26
 * @LastEditTime: 2021-02-21 09:24:10
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\home\Home.vue
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
        <topics-list :topics="topicsData" :loading="isShowMark" />
      </div>
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage"
        >
        </el-pagination>
        <!-- <Page 
          :total="total" 
          :page-size="40" 
          @on-change="currentChange"
        >
        </Page> -->
      </div>
    </div>
  </section>
  <side-bar />
</template>

<script lang="ts">
import SideBar from "@/components/siderbar/SideBar.vue";
import TopicsList from "@/components/topics-list/TopicsList.vue";
import { getTopicsData } from "@/server";
import { defineComponent, reactive, ref, watchEffect } from "vue";
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
  name: "Home",
  components: { TopicsList, SideBar },
  setup() {
    const route = useRoute();
    const isShowMark = ref(false);
    const currentPage = ref(1);
    const topicsData = reactive<TopicsData>({
      ask: [],
      share: [],
      job: [],
      good: [],
      dev: [],
      all: [],
    });

    watchEffect(() => {
      const tab = (route.query.tab as TabList) || "all";
      isShowMark.value = true;
      getTopicsData({
        limit: 40,
        mdrender: false,
        tab,
        page: 1,
      }).then((res) => {
        isShowMark.value = false;
        topicsData[tab] = res.data;
      });
    });

    const handleCurrentChange = (page: number) => {
      console.log(`当前页: ${page}`);
      currentPage.value = page;
    };
    return { isShowMark, topicsData, handleCurrentChange, currentPage };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.index-section {
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