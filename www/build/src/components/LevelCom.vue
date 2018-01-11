<template>
<span class="levelBox-wrapper">
  <ul class="levelBox">
    <li v-if="levelNum>=0" v-for="l in levelData">
      <span>{{l}}</span>
    </li>
  </ul>
  <div class="levelBar" :style="{width:100/levelData.length*(levelNum)+'%'}"></div>
</span>

</template>
<script>
export default {
  name: 'LevelCom',
  props: {
    levelNum: {
      default: 0
    },
    levelData: {
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
.levelBox-wrapper{
  position: relative;
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  height: 20px;
  background: #dfdfdf;
  .levelBar{
    position: absolute;
    width: 20%;
    height: 20px;
    background:#735DEE;
    border-radius: 20px;
    top: 0;
    z-index: 1;
    transition: width 2s;
  }
  .levelBox{
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  li{
    width: 100%;
    height: 20px;
    margin-right: 1px;
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
}

</style>
