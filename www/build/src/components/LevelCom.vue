<template>
<ul class="levelBox">
  <li :style="{opacity:.25}" v-if="levelNum>=0">
    <span>流通级</span>
  </li>
  <li :style="{opacity:.5}" v-if="levelNum>=1">
    <span>玩家级</span>
  </li>
  <li :style="{opacity:.75}" v-if="levelNum>=2">
    <span>专业级</span>
  </li>
  <li :style="{opacity:1}" v-if="levelNum>=3">
    <span>梦幻级</span>
  </li>
</ul>
</template>
<script>
export default {
  name: 'LevelCom',
  props: {
    levelNum: {
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.levelBox{
  width: 100%;
  display: flex;
  align-items: flex-end;
  li{
    width: 60px;
    height: 20px;
    margin-right: 1px;
    background: #735DEE;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    span{
      font-size:10px;
      color: #fff;
    }
    &:first-child{
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    &:last-child{
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
}
</style>
