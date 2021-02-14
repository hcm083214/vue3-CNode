<!--
 * @Author: 黄灿民
 * @Date: 2021-02-14 11:06:45
 * @LastEditTime: 2021-02-14 11:50:50
 * @LastEditors: 黄灿民
 * @Description: 新建话题
 * @FilePath: \cnode\src\views\create\Create.vue
-->
<template>
  <section class="release index-section">
    <div class="topics-container release-left">
      <div class="top">
        <router-link to="/">主页</router-link>
        <em> / </em>
        <span>{{ currentStatus=='create' ? "发布话题" : "编辑话题" }}</span>
      </div>
      <div class="select-tab">
        <span>选择版块：</span>
        <select v-model="tab" style="width: 200px">
          <option value="dev">客户端测试</option>
          <option value="share" disabled>分享</option>
          <option value="ask" disabled>问答</option>
          <option value="job" disabled>招聘</option>
        </select>
      </div>
      <div class="title">
        <input v-model="title" placeholder="标题字数 10字以上" />
      </div>
      <div class="editor">
        <textarea id="markdown-editor"></textarea>
        <div class="release-btn">
          <button @click="releaseTopics">
            {{ currentStatus=='create' ? "发布" : "更新" }}
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- 侧边栏 -->
  <div class="sidebar release-sidebar">
    <div class="block-box">
      <div class="title-top">Markdown 语法参考</div>
      <div class="inner">
        <p>### 单行的标题</p>
        <p>**粗体**</p>
        <p>`console.log('行内代码')`</p>
        <p>```js\n code \n``` 标记代码块</p>
        <p>[内容](链接)</p>
        <p>![文字说明](图片链接)</p>
        <p>
          <a href="https://segmentfault.com/markdown" target="_blank"
            >Markdown 文档</a
          >
        </p>
      </div>
    </div>
    <div class="block-box">
      <div class="title-top">话题发布指南</div>
      <div class="inner">
        <p>尽量把话题要点浓缩到标题里</p>
        <p>
          代码含义和报错可在
          <a href="https://segmentfault.com/t/node.js" target="_blank"
            >SegmentFault</a
          >
          提问
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
      const currentStatus = ref('create');
      const title = ref('')
      const releaseTopics = ()=>{
          1
      }
    return {currentStatus,title,releaseTopics};
  },
});
</script>
<style lang="scss" scoped>
.release {
  .release-left {
    background: #fff;
  }

  .top {
    padding: 10px;
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
  }

  .select-tab {
    padding: 10px;
  }

  .title {
    margin: 0 10px 10px 10px;
  }

  .release-btn {
    padding: 0 0 10px 10px;

    button {
      position: relative;
      color: #fff;
      background: #08c;
      border-radius: 3px;
      padding: 5px 10px;
      font-weight: 500;
      border: none;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 3px;
        background: #000;
        opacity: 0;
      }

      &:active:after {
        opacity: 0.1;
      }
    }
  }
}
// 侧边栏
.release-sidebar {
  margin-left: 15px;
  width: 290px;
  float: right;

  .block-box {
    background: #fff;
    margin-bottom: 15px;
    border-radius: 3px;
  }

  .title-top {
    padding: 10px;
    background: #f6f6f6;
  }

  .inner {
    padding: 15px 10px;

    p {
      line-height: 26px;
    }

    a {
      color: #778087;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>