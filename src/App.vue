<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import Tab from './components/Tab.vue'
import Calculator from './components/calculator/Calculator.vue'
import NumConverter from './components/numConverter/NumConverter.vue'
import Select from './components/select/Select.vue'


import { ref } from 'vue'
const tabChange=(index:number)=>{
  tabIndex.value=index;
}
const tabIndex=ref(0);

</script>

<template>
  <Tab @tabChange="tabChange"/>
  <Calculator v-if="tabIndex===0" />
  <NumConverter v-else-if="tabIndex===1" />
  <Select v-else />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
h1{
  margin-bottom: 50px;
}
</style>
