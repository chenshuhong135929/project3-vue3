<template>
    <div>
        <el-form :rules="rules" :model="loginForm" class="loginRoot">
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"/>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登陆</el-button>
        </el-form>
    </div>
</template>
 
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
 
import {userLogin} from '../http/m2mhttp'
import { FormRules} from 'element-plus'
import {useRouter} from 'vue-router'
import{useStore} from 'vuex'
 

const router =  useRouter()
const store =useStore()
let loginForm=reactive({
        username: '',
        password: '',
       
})
const rules = reactive<FormRules>( {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password:
                        [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
)
 const  login= ()=> {
       localStorage.setItem('username',loginForm.username)
       localStorage.setItem('password',loginForm.password)
       let userToken 
      if (loginForm.username === '' || loginForm.password === '') {
        alert('账号或密码不能为空');
      } else {
       userLogin(loginForm.username ,loginForm.password).then(res => {
          console.log(res.data);
           userToken = 'Bearer ' + res.data.data.tokenId;
           console.log('登陆成功');
           store.commit('CHANGELOGIN',userToken)
           router.push('Index')
        }).catch(error => {
            //@ts-ignore
             ElMessage.error(
              '账号或密码错误'
            )
          
          console.log(error);
        });
      }
    }

     onMounted(async()=>{
      loginForm.username= localStorage.getItem('username') || ''
      loginForm.password = localStorage.getItem('password') || ''
     }) 
</script>

<style>
    .loginRoot {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 15% auto;
        width: 350px;
        padding: 15px 35px;
        background: aliceblue;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #c6c6c6;
       
    }
    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505050;
    }
</style>