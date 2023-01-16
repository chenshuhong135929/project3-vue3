<template>

   <router-view></router-view>
</template>


<script lang="ts" setup>
import {onMounted,} from 'vue'
import {useRouter} from 'vue-router'
 const router =  useRouter()
  onMounted(() => {
      router.push('Index')
  })
 
</script>
<style> 
 
</style>
