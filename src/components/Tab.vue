<template>
  <div class="tab">
    <div
      @click="tabClick(i)"
      v-for="(item, i) in tabList"
      :key="item"
      class="tab-item"
      :class="{ show: tabIndex === i }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Tab",
  setup(props,{emit}) {
    const data = reactive({
      tabList: ["计算器", "数制转换", "下拉式菜单"],
      tabIndex: 0,
    });
    const tabClick = (index: number) => {
      data.tabIndex = index;
      emit('tabChange',index)
    };
    return {
      ...toRefs(data),
      tabClick,
    };
  },
});
</script>

<style scoped>
.tab {
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.tab-item {
  color: #333;
  font-size: 30px;
  padding-bottom: 20px;
  border-bottom: 4px solid transparent;
  cursor: pointer;
}
.tab-item.show {
  color: #4399eb;
  border-bottom-color: #4399eb;
}
</style>
