<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:08:23
 * @LastEditTime: 2021-02-15 15:20:01
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\App.vue
-->
<template>

    <c-node-header />
    <div class="h">
      <router-view></router-view>
    </div>
    <c-node-footer />

</template>


<script lang="ts">
import { defineComponent } from "vue";
import CNodeHeader from "@/components/header/CNodeHeader.vue";
import CNodeFooter from "./components/footer/CNodeFooter.vue";

export default defineComponent({
  components: {
    CNodeHeader,
    CNodeFooter,
  },
  setup() {
    return {};
  },
});
</script>



<style lang="scss">
@import '@/assets/mixin.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.h{
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  @include flex();
  justify-content: center;
  align-items: flex-start;
}
</style>
