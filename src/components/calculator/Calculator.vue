<template>
  <div class="calc">
    <!-- 显示区 -->
    <div class="calc-screen">{{value1}}</div>
    <div class="calc-screen input">{{value2}}</div>

    <!-- 按钮区 -->
    <div class="calc-btn">
      <CalcBtn v-for="item in list" :key="item.name" :btnInfo="item" :value1="value1" :value2="value2" :evalStr="evalStr" @updateVal1="updateVal1" @updateVal2="updateVal2" @updateEval="updateEval" />
    </div>
  </div>
</template>

<script setup lang="ts">

import CalcBtn from './CalcBtn.vue';
import { ref } from 'vue'
import {list} from '../../types/btnList'


const value1=ref(""); //第一行显示内容
const value2=ref(""); //第二行显示内容
const evalStr=ref(""); //要计算的表达式

const updateVal1=(val:string)=>{
  value1.value=val;
}
const updateVal2=(val:string)=>{
  value2.value=val;
}
const updateEval=(val:string)=>{
  evalStr.value=val;
}

defineExpose({
  updateVal1,
  updateVal2,
  updateEval
})
</script>

<style scoped>
  .calc{
    width: 510px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 4px;
    margin-top: 20px;
    padding-top: 20px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px 0px #c9c6c6;
    background: #f4f4f4;
  }
  .calc-screen{
    width: 100%;
    height: 50px;
    overflow-x: auto;
    font-size: 30px;
    color: #666;
    text-align: right;
  }
  .calc-screen::-webkit-scrollbar{
    width: 4px;
    height: 4px;
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
  }
  .calc-screen.input{
    font-size: 36px;
    height: 60px;
    color: #333;
  }
  .calc-btn{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
 
</style>