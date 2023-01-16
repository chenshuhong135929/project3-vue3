 <template>
  <div class="container">
    <el-row>
        <el-col :span="12">
        <el-input v-model="SearchVal" placeholder="Please input" class="input-with-select"
        @keyup.enter="enterSearch">
        <template #append>
          <el-button :icon="Search" @click="enterSearch"/>
        </template>
        </el-input>
      </el-col>
        <el-col :span="12">
         <el-button type="primary" @click="openAdd">add</el-button>
         <el-button type="danger"  @click="onDel">delete</el-button>
      </el-col>
    </el-row>
      
  <el-table :data="tableData" stripe style="width: 100%" ref="multipleTableRef">
    <el-table-column type="selection"  width="55" />
    <el-table-column prop="date" label="Date" width="240" />
    <el-table-column prop="name" label="Name" width="150" />
    <el-table-column prop="uorder" label="Order" width="150" />
    <el-table-column prop="address" label="Address"  width="150"  />
    <el-table-column label="Operations"  width="150">
      <template #default="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index,scope.row)"
        >
          Edit
        </el-button>
          <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index,scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="total"       @current-change="currentChange" />
 

 </div>
     <addVue :isShow="isShow" :info="info" @closeAdd="closeAdd"    @success="success"></addVue>
 </template>


<script lang="ts" setup > 
  
import {ref,Ref,onMounted} from 'vue'
import {Loading, Search} from '@element-plus/icons-vue'
import User from '../class/User'
import UserDto from '../class/UserDto'
import addVue from '../components/UserAdd.vue'

import {getList,del} from '../http'
  const multipleTableRef=ref()
  const tableData = ref<any[]>([])
  const userDto = ref<UserDto>(new UserDto)
  const total = ref(100)
  
  const load=async()=>{
   
    let data =(await getList(userDto.value)).data
      console.log('==============',data)
    if(data.code=='200'){
      tableData.value=data.data.data
      total.value=data.data.totalCount
    }
   
  }
  onMounted(async()=>{
    await load()
  })
  const isShow=ref(false)
  const info = ref<User>(new User())
  const SearchVal= ref("")
  
  const enterSearch=async()=>{
    userDto.value.keyWord=SearchVal.value
    await load()
  }
  const openAdd=()=>{
      isShow.value=true
  }
  const onDel=async()=>{
    let rows =multipleTableRef.value?.getSelectionRows() as Array<User>
    if(rows.length>0){
      console.log(rows.map(item=>{return `'${item.id}'`}).join(","))
      let res=(await del(rows.map(item=>{return `${item.id}`}).join(","))).data
   
      if(res.code='200'){
        ElMessage.success('删除成功')
         await load()
      }else{
        ElMessage.error('删除失败')
      }
    }
  }

  const handleEdit=(index:number,row:User)=>{
        console.log(index,row);
        info.value=row
        isShow.value=true

 }

  const handleDelete=async(index:number,row:any)=>{
      console.log(index,row);
      let res=(await del(row.id)).data
      if(res.code='200'){
        ElMessage.success('删除成功')
         await load()
      }else{
        ElMessage.error('删除失败')
      }
 }
  const currentChange=async(val:number)=>{
     userDto.value.pageIndex=val
   let data =(await getList(userDto.value)).data
      console.log('==============',data)
    if(data.code=='200'){
      tableData.value=data.data.data
    }
 } 
  
  const closeAdd=()=>{
      isShow.value=false
      info.value= new User()
  }

   const success=async(message:string)=>{
     isShow.value=false
     info.value= new User()
     ElMessage.success(message)
      let data =(await getList(userDto.value)).data
      console.log('==============',data)
    if(data.code=='200'){
      tableData.value=data.data.data
    }
  }

  
</script>

<style  lang="scss" scoped>
    .table{
      margin: 10px 0;
    }
    .input-with-select{
      width: 380px;
      margin-right: 20px;
    }
</style>