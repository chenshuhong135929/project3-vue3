<template>
  <el-dialog v-model="dinlogVisible"  :title="info?.name ? '修改'  :  '新增'" width="30%" @close="$emit('closeAdd')" draggable>
        <el-form  :model="form" label-width="60px" ref="ruleformRef" :rules="rules">
            <el-form-item label="时间" prop="date">
                <el-date-picker v-model="form.date" type="date" placeholder="请选择一个时间" :disabled-date="disablesDate"/>
            </el-form-item>
           
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" />
            </el-form-item>
             <el-form-item label="排序" prop="uorder">
                <el-input v-model.number="form.uorder" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeAdd(ruleformRef)">Cancel</el-button>
                <el-button type="primary" @click="save(ruleformRef)">Confirm</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script  lang="ts" setup>
import{ref,reactive, computed,Ref,watch} from 'vue'
import User from '../class/User'
import { FormInstance,FormRules} from 'element-plus'
import {edit,add} from '../http'
const ruleformRef = ref<FormInstance>()

const props = defineProps({
    isShow:Boolean,
    info:User
})
 const form:Ref<User>=ref<User>({
    id:"",
    date:"",
    name:"",
    address:"",
    uorder:0
 })

 watch(()=>props.info,(newInfo,oldInfo)=>{
     if(newInfo){
         form.value={
             id:newInfo.id,
             date:newInfo.date,
             name:newInfo.name,
             address:newInfo.address,
             uorder:newInfo.uorder
         }
     }
 })
const dinlogVisible =computed(()=> props.isShow)

const disablesDate =(time:any)=>{
    const _maxTime=Date.now() -24*60*60*1000*1
    return time.getTime()<=_maxTime
}
 
const emits =defineEmits(["closeAdd","success"])
const closeAdd=(formEl:FormInstance | undefined)=>{
    if(!formEl) return
     emits("closeAdd")
}

const save=async(formEl:FormInstance | undefined)=>{
      if(!formEl) return
        await  formEl.validate((valid,fields)=>{
            if(valid){
                if(form.value.id){
                   edit(form.value).then(function(res){
                     if(res.data.code='200'){
                         emits("success","修改成功")
                     }else{
                             //@ts-ignore
                         ElMessage.error("操作失败")
                     }
                   }) 
                }else{
                   add(form.value).then(function(res){
                     if(res.data.code='200'){
                         emits("success","添加成功")
                     }else{
                             //@ts-ignore
                         ElMessage.error("操作失败")
                     }
                   })
                }
            }else{
                console.log('error submit!',fields)
            }
        })



   
}

//表单的校验
const rules = reactive<FormRules>({
    date:[
        {
            type:'date',
            required:true,
            message:'请选择一个时间',
            trigger:'change',
        }
    ],
    name:[
        {
            required:true,
            message:'请输入地址',
            trigger:'blur'
        }
    ],
    address:[
        {
            required:true,
            message:'请输入地址',
            trigger:'blur'
        }
    ],
    uorder:[
        {
            required:true,
            message:'请输入一个序号',
        },
        {
            type:'number',
            message:'改字段必须是数字'
        }
    ]
})
</script>

<style>

</style>