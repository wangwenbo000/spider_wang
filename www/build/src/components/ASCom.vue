<template>
<div class="ASCom">
  <!-- <router-link tag="a" :to="{name:'Main'}" class="close">
    <i class="iconfont">&#xe6e9;</i>
  </router-link> -->
  <div class="aboutLeft">
    <slot></slot>
  </div>
  <div class="aboutRight">
    <h3>QQ</h3>
    <span>641994434</span>
    <h3>Phone</h3>
    <span>13764228598</span>
    <a class="wangwang" href="mailto:450816278@qq.com">EMAIL</a>
    <a class="wangwang" href="https://amos.alicdn.com/getcid.aw?spm=a1z10.1-c.0.0.45ee61bb7SxlEu&v=3&groupid=0&s=1&charset=utf-8&uid=%E8%B5%B5%E8%89%B3%E5%A9%B7yy&site=cntaobao&groupid=0&s=1" target="_blank">
      <i class="iconfont">&#xe602;</i>
      Master Wang
    </a>
    <img :src="$conf.qnUrl+'QRCode.jpg'" class="qrcode">
  </div>
</div>
</template>
<script>
export default {
  name: 'ASCom'

}
</script>
<style lang='scss' scoped>
.close{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 22px;
}
.ASCom{
  width: 890px;
  padding: 20px 10px 20px 20px;
  background: #fff;
  display: flex;
  z-index: 1000;
  margin: 40px auto;
  position: relative;
  border-radius: 4px;
  color: #656975;
  .aboutLeft{
    width: 720px;
    border-right: 1px solid #D6D6D6;
    padding-right: 20px;
  }
  .aboutRight{
    padding-left: 10px;
    h3{
      font-size: 12px;
      color:#D2D2D2;
      margin: 10px 0 6px 10px;
    }
    span{
      // display: block;
      font-size: 14px;
      margin-top:2px;
      margin-left: 10px;
      border:1px solid #D6D6D6;
      padding: 2px 10px;
      border-radius: 4px;
      width: 94px;
      background: linear-gradient(#e5e5e5 30%, #D6D6D6 90%);
    }
    .wangwang{
      background: #4A90E2;
      color:#fff;
      font-size: 12px;
      display: block;
      width: 94px;
      padding: 6px 14px;
      border-radius: 4px;
      margin:10px auto 0 auto;
    }
    .qrcode{
      width: 140px;
      display: block;
      margin: 10px auto;
    }
  }
}
</style>
