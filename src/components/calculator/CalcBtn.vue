<template>
  <div @click="btnClick" class="btn-item" :class="{'light':btnInfo.light}">
    {{btnInfo.name}}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddBtn",
  props:{
    btnInfo:{
      type:Object,
      required:true
    },
    value1:String,
    value2:String,
    evalStr:String,
  },
  setup(props,{emit}) {

    const btnClick=()=>{

      if(props.value2==='格式错误！'){
        emit('updateVal1','');
        emit('updateVal2','');   
        emit('updateEval','');   
        return ;     
      }

      let {val1,val2,val3}=props.btnInfo.fn( props.evalStr, props.value1, props.value2, props.btnInfo.name );
      
      emit('updateVal1',val1);
      emit('updateVal2',val2);
      emit('updateEval',val3);
    } 

    return {
      btnClick
    }
  },
});
</script>
<style scoped>
 .btn-item{
    width: 100px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    border: 1px solid #f9f9f9;
    background: #ddd;
    color: #444;
    cursor: pointer;
  }
  .btn-item.light{
    color: #000;
    background: #eaeaea;
  }
  .btn-item:hover{
    background: #bbb;
  }
</style>