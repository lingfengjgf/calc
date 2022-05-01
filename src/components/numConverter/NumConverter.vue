<template>
  <div class="num">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :labelCol='{span: 6}'
        class="num-form"
      >
        <a-form-item ref="tenNum" label="10进制数" name="tenNum">
          <a-input v-model:value="formState.tenNum" />
        </a-form-item>
        <a-form-item class="num-item" label="2进制数">
          {{formState.towNum}}
        </a-form-item>
        <a-form-item  label="8进制数">
          {{formState.eightNum}}
        </a-form-item>
        <a-form-item  label="16进制数">
          {{formState.sixteenNum}}
        </a-form-item>
      </a-form>
      <div class="num-title">2~36任意进制 :</div>
      <a-form
        layout="inline"
        ref="formSca"
        :model="formScaState"
        :rules="scaRules"
        class="num-form"
      >
        <a-form-item class="num-any" ref="scale" name="scale">
          <a-input v-model:value="formScaState.scale" />
        </a-form-item>
        <a-form-item>
          {{formScaState.anyNum}}
        </a-form-item>
      </a-form>
      <a-button @click="onSubmit" class="num-btn" type='primary' shape="round">转换</a-button>
  </div>
</template>
<script lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';
import { defineComponent, reactive, ref, toRaw, watch } from 'vue';

export default defineComponent({
  setup() {
    const formRef = ref();
    const formSca = ref();
    const formState = reactive({
      tenNum: '',
      towNum: '',
      eightNum: '',
      sixteenNum: '',
    });
    const formScaState = reactive({
      scale: '',
      anyNum: '',
    });
    const testNum=(value:string)=>/^[\d]+$/.test(value)
    let validateNum = async (_rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('请输入要转换的十进制整数');
      } else if(!testNum(value)){
        return Promise.reject('请输入正确的十进制整数');
      } else {
        return Promise.resolve();
      }
    };
    let validateScale = async (_rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.resolve();
      } else if(!testNum(value)||Number(value)>36||Number(value)<2){
        return Promise.reject('请输入2~36之间的整数');
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      tenNum: [
        { required: false, validator: validateNum, trigger: 'blur' },
      ],
    };
    const scaRules = {
      scale: [
        { required: false, validator: validateScale, trigger: 'blur' },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          return formSca.value.validate()
        })
        .then(() => {
          formState.towNum=converter(formState.tenNum,10,2);
          formState.eightNum=converter(formState.tenNum,10,8);
          formState.sixteenNum=converter(formState.tenNum,10,16);
          formScaState.anyNum=formScaState.scale?converter(formState.tenNum,10,Number(formScaState.scale)):'';
        })
        .catch(error => {
          console.log('error', error);
        });
    };
    
    watch(
      () => formState.tenNum,
      (value) => {
        formState.tenNum=testNum(value)?String(Number(formState.tenNum)):formState.tenNum;
      }
    );
    const converter=(num:string,m:number,n:number)=>{
        return  parseInt(num,m).toString(n);
    }
    return {
      formRef,
      formState,
      rules,
      formSca,
      formScaState,
      scaRules,
      onSubmit,
    };
  },
});
</script>

<style scoped>
  .num{
    width: 520px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .num-form{
    text-align: left;
  }
  .num-item{
    margin-top: 40px;
  }
  .num-title{
    text-align: left;
    margin-left: 28px;
  }
  .num-any{
    width: 56px;
    margin-left: 60px;
  }
  .num-btn{
    width: 160px;
    margin-top: 40px;
  }
</style>
