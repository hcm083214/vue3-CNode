<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 11:31:55
 * @LastEditTime: 2021-02-08 11:39:10
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\components\search-box\SearchBox.vue
-->
<template>
    <div class="search-input" :style="{width:`${width}px`}">

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        width:{
            type:Number,
            default:230
        }
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>