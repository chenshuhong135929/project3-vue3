<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="300">
         <Menu :isClose="isClose"></Menu>
      </el-aside>
      <el-container>
        <el-header >
          <HomePage :isClose="isClose" @change="change"></HomePage>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
 import {onMounted, ref} from 'vue'
 let isClose = ref(false);
 const props = defineProps(['isClose'])

  const change =()=>{
    isClose.value=!isClose.value
  }
 
  
</script>
<style> 
 .el-header{
       --el-header-padding: 0 0;
 }

.el-aside {
   height: 100%;
}

.el-main {
    --el-main-padding: 0;

}
</style>
