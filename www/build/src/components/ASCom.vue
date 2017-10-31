<template>
<div class="ASCom">
  <router-link tag="a" :to="{name:'Main'}" class="close">
    <i class="iconfont">&#xe6e9;</i>
  </router-link>
  <div class="aboutLeft">
    <slot></slot>
  </div>
  <div class="aboutRight">
    <h3>QQ</h3>
    <span>641994434</span>
    <h3>Email</h3>
    <span>450816278@qq.com</span>
    <h3>Phone</h3>
    <span>13764228598</span>
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
  width: 860px;
  padding: 20px;
  background: #fff;
  display: flex;
  position: absolute;
  left: 50%;
  margin-left: -430px;
  z-index: 1000;
  top: 200px;
  color: #656975;
  .aboutLeft{
    width: 610px;
    border-right: 1px solid #D6D6D6;
    padding-right: 20px;
  }
  .aboutRight{
    padding-left: 20px;
    h3{
      font-size: 14px;
      color:#D2D2D2;
      margin: 20px 0 0 0;
    }
    span{
      display: block;
      font-size: 20px;
      margin-top:2px;
    }
    .wangwang{
      background: #4A90E2;
      color:#fff;
      font-size: 12px;
      display: inline-block;
      padding: 6px 14px;
      border-radius: 4px;
      margin:40px auto 0 auto;
    }
    .qrcode{
      width: 162px;
      display: block;
      margin: 20px auto;
    }
  }
}
</style>
