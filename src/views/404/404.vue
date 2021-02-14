<!--
 * @Author: 黄灿民
 * @Date: 2021-02-14 13:34:03
 * @LastEditTime: 2021-02-14 13:57:55
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\404\404.vue
-->
<template>
  <section class="not-match user-select-none">
    <div>
      <img
        src="@/assets/not-match.gif"
        alt="未匹配"
        class="pointer-events-none"
      />
      <div class="page-text">卧槽！页面不见了！</div>
      <div class="go">
        <router-link to="/">首页</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotMatch",
};
</script>

<style lang="scss">
@import "@/assets/mixin.scss";
.not-match {
  padding-top: 30px;
  text-align: center;
  @include flex();
  .page-text {
    padding: 10px 0;
    border: 1px solid #ddd;
    background: #f5f5f5;
  }

  .go {
    margin-top: 15px;

    span {
      cursor: pointer;
    }
  }
}
</style>