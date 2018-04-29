<template>
<span class="levelBox-wrapper">
  <ul class="levelBox">
    <li v-if="levelNum>=0" v-for="l in levelData" :key="l">
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
  height: 30px;
  background: #dfdfdf;
  border:1px solid #735DEE;
  .levelBar{
    position: absolute;
    width: 20%;
    height: 30px;
    background: linear-gradient(#735DEE 30%, rgb(81, 65, 173) 90%);
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, .1) inset;
  border-radius: 20px;
  li{
    width: 100%;
    height: 30px;
    margin-right: 1px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:last-child{
      border:none;
    }
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
