<template>
<div class="select">
  <div class="select-top">
    <a-dropdown class='select-dropdown'>
      <div class="ant-dropdown-link">
        字体
        <DownOutlined />
      </div>
      <template #overlay>
        <a-menu class="select-menu" @click="onClick">
          <a-sub-menu key="name" title="字体名称">
            <a-menu-item key="name1">默认</a-menu-item>
            <a-menu-item key="name2">黑体</a-menu-item>
            <a-menu-item key="name3">宋体</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="style" title="文本风格">
            <a-menu-item key="style1">默认</a-menu-item>
            <a-menu-item key="style2">粗体</a-menu-item>
            <a-menu-item key="style3">斜体</a-menu-item>
            <a-menu-item key="style4">下划线</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>
    <div class="select-color">
      颜色：<input type="color" name="color" v-model='color'>
    </div>
  </div>
  <div class="select-text" :class="[name,style]" :style='{color}'>
    明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis nesciunt quas dignissimos dolorum placeat aspernatur debitis eum voluptas, ea, voluptatum repellat ipsa architecto, facere assumenda minus doloremque! Aspernatur, architecto magnam.
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
interface MenuInfo {
  key: string;
  keyPath: ['name'|'style',string];
  item: any;
  domEvent: MouseEvent;
}
export default defineComponent({
  components: {
    DownOutlined,
  },
  setup(){
    const className=reactive({
      name:'',
      style:''
    })
    const color=ref('#000');
    const onClick = ({ key,keyPath }: MenuInfo) => {
      className[keyPath[0]]=key;
    };
    return {
      ...toRefs(className),
      color,
      onClick
    }
  }
});
</script>



<style scoped>
  .select{
    width: 520px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: left;
  }
  .select-top{
    display: flex;
    align-items: center;
  }
  .select-dropdown,.select-menu{
    width: 100px;
  }
  .select-text{
    margin-top: 20px;
    font-family: auto;
  }
  .select-text.name2{
    font-family: '黑体';
  }
  .select-text.name3{
    font-family: '宋体';
  }
  .select-text.style2{
    font-weight: bold;
  }
  .select-text.style3{
    font-style: italic;
  }
  .select-text.style4{
    text-decoration: underline;
  }
</style>