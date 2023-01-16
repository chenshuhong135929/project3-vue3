<template>
 <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">折叠</el-radio-button>
  </el-radio-group> -->
  <el-menu
    default-active="/home"
    class="el-menu-vertical-demo"
    :collapse="props.isClose"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#ffd04b"
    background-color="#112f50"
    text-color="#fff" router >
  
    <el-menu-item > <template #title><span>首页生鲜采购系统</span></template> </el-menu-item>
    <el-menu-item index="/home" >  
     <el-icon><House /></el-icon>
      <span>系统首页</span></el-menu-item>
    <el-sub-menu index="/goods">
      <template #title>
       <el-icon><Grid /></el-icon>
        <span>产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/goods/list" >产品列表</el-menu-item>
        <el-menu-item index="/goods/category"  >产品分类</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
     
  </el-menu>
</template>

<script lang="ts" setup>
import { ref ,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const props = defineProps(['isClose'])
const router =  useRouter()
 
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

  onMounted(() => {
      router.push('home')
  })

 
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
 
</style>
