<template>
  <div class="navbar">
    <div class="nav-left">
      <!-- <div class="logo"></div> -->
      <router-link tag="div"
                  :to="{name:'Main'}"
                  class="logo">
      </router-link>
      <ul class='lan'>
        <li :class="$i18n.locale === 'cn' ? 'active':''" @click="changeLanguage('cn')">CN</li>
        <li :class="$i18n.locale === 'en' ? 'active':''" @click="changeLanguage('en')">EN</li>
      </ul>
    </div>
    <ul class="nav-right">
      <li style="font-size:24px;"
          @mouseenter="toggleCode=true"
          @mouseleave="toggleCode=false">
        <a href="#">
          <i class="iconfont">&#xe608;</i>
        </a>
        <div class="navBarCode" v-show="toggleCode">
          <img :src="$conf.qnUrl+'qrcodeTop.png'" alt="">
          微信扫描关注</br>TARANTULRS SOUL
        </div>
      </li>
      <router-link tag="li"
                  :to="{name:'Main'}"
                  active-class="a"
                  :class="$route.name === 'Main'?'active':''">
        <a href="#">{{ $t("navbar.HOME") }}</a>
      </router-link>
      <router-link tag="li" :to="{name:'Video',params:{vid:'t0150btuqbk',title:'TARANTULRS SOUL'}}">
        <a href="#">{{ $t("navbar.VIDEO") }}</a>
      </router-link>
      <router-link tag="li" :to="{name:'About'}">
        <a href="#">{{ $t("navbar.ABOUT") }}</a>
      </router-link>
      <router-link tag="li" :to="{name:'Store'}">
        <a href="#">{{ $t("navbar.STORE") }}</a>
      </router-link>
      <li></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'navbar',
    data () {
      return {
        toggleCode: false
      }
    },
    created () {

    },
    methods: {
      changeLanguage (lang) {
        this.$i18n.locale = lang
        localStorage.locale = lang
      }
    }
  }
</script>
<style lang='scss'>
.navbar{
  width: 100%;
  height: 50px;
  background: #262A33;
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 1000;
  .nav-left{
    display: flex;
    align-items: center;
    .logo{
      width: 200px;
      height: 50px;
      background: url(../assets/logo.png) no-repeat 28px center;
      background-size: 84%;
      cursor: pointer;
    }
    .lan{
      display: flex;
      background: #363D4C;
      font-size: 12px;
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
      li{
        padding: 0 10px;
      }
      .active{
        background: #735DEE;
      }
    }
  }
  .nav-right{
    display: flex;
    font-size: 12px;
    .active{
      background: #735DEE;
    }
    li {
      position: relative;
      .navBarCode{
        width: 128px;
        height: 168px;
        background: #735DEE;
        position: absolute;
        left: 1px;
        padding: 2px;
        font-size: 12px;
        text-align: center;
        color:#3f3190;
        img{
          width: 100%;
        }
      }
      a{
      display: inline-flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 20px;
      border-left: 1px solid #1B1D21;
      transition: background .3s;
      &:hover{
        background: #735DEE;
      }
      &:active{
        background: darken(#735DEE, 10%);
      }
    }
    }
  }
}

</style>


