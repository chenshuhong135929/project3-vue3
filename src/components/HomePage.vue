<template>
  <div class="header">
    <div class="icon">
        <el-icon v-if="isClose" @click="change"><Expand /></el-icon>
        <el-icon v-else @click="change"><Fold /></el-icon>
   </div>
   <div class="right">
      <div class="time">{{time}}</div>
      <div class="line">|</div>
      <div class="loginout" @click="out"><el-icon><SwitchButton /></el-icon></div>
   </div>
   
  </div>
 
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>主页1</el-breadcrumb-item>
    <el-breadcrumb-item>主页2</el-breadcrumb-item>
    <el-breadcrumb-item>主页3</el-breadcrumb-item>
  </el-breadcrumb>
</template>






<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { log } from 'console'
import { emit } from 'process'
import{onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
import dayjs from 'dayjs'
const router =  useRouter()
  const time = ref('')
  const props = defineProps(['isClose'])
  const emits =defineEmits(['change'])
  const change =()=>{
    emits('change')
  }

  const out =(()=>{
     router.push('/Login')
  })
 
  onMounted(() => {
     time.value =dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  })
</script>

<style>
    .header{
      height: 50px;
      line-height: 50px;
      background: #1e78bf;
      color: #fff;
      display: flex;
    }
    .icon{
      font-size:  24px;
      flex: 1;
    }
    .right{
      padding-right: 20px;
      display: flex;
    
    }

   .time{
        font-size: 12px;
     }
   .loginout{
     margin-top: 2px;
   }
    .line{
      padding-left: 10px;
      padding-right: 10px;
    }
</style>