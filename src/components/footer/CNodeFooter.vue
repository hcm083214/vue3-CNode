<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:34:54
 * @LastEditTime: 2021-02-15 16:21:41
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\footer\CNodeFooter.vue
-->
<template>
  <footer class="footer" v-pre>
    <div class="footer-box">
      <div class="source-code-add">
        <a
          href="https://github.com/hcm083214/vue3-CNode"
          target="_blank"
          rel="noopener noreferrer"
        >
          源码地址
        </a>
      </div>
      <div class="vendor">
        <ul>
          <li class="cnode">
            <span>CNode社区提供API</span>
            <a
              href="https://cnodejs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cnodejs.org/public/images/cnodejs.svg"
                alt="cnode"
              />
            </a>
          </li>
          <li class="cnode">
            <span>github-pages提供网站托管</span>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="@/assets/github.svg" alt="github" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name:'Footer',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.footer {
  padding: 25px 0 35px 0;
  background: #fff;
  margin-top:10px;
  .footer-box {
    width: 90%;
    margin: 0 auto;
  }

  .source-code-add {
    a:hover {
      color: #333;
      text-decoration: underline;
    }
  }

  .vendor {
    ul {
      @include flex();
      justify-content: flex-start;
      li {
        margin: 15px 30px 0 0;
      }

      span {
        margin-right: 10px;
        color: #666;
      }

      .cnode {
        img {
          width: 100px;
        }
      }
    }
  }
}
</style>