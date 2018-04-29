<template>
  <div class="navbar">
    <!-- 导航左 -->
    <div class="nav-left">
      <!-- logo -->
      <router-link tag="div"
                  :to="{name:'Main'}"
                  class="logo">
      </router-link>
      <!-- 语言切换 -->
      <ul class='lang'>
        <li :class="$i18n.locale === 'cn' ? 'active':''"
            @click="changeLanguage('cn')">CN</li>
        <li :class="$i18n.locale === 'en' ? 'active':''"
            @click="changeLanguage('en')">EN</li>
      </ul>
    </div>
    <!-- 导航右 -->
    <ul class="nav-right">
      <li style="font-size:24px;"
          @mouseenter="toggleCode=true"
          @mouseleave="toggleCode=false">
        <a href="#">
          <i class="iconfont">&#xe608;</i>
        </a>
        <div class="navBarCode" v-show="toggleCode">
          <img :src="$conf.qnUrl+'qrcodeTop.png'" alt="">
          微信扫描关注 <br>TARANTULRS SOUL
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
  width: 958px;
  height: 50px;
  border-radius: 6px;
  background: #262A33;
  display: flex;
  margin: 20px auto;
  justify-content: space-between;
  z-index: 1000;
  background: linear-gradient(#313950 30%, #272a33 90%);
  border: 1px solid #131a2e;
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
    .lang{
      display: flex;
      background: linear-gradient(#272a33 30%, #313950 90%);
      box-shadow: 0 0 6px rgba(0, 0, 0, .4) inset;
      font-size: 12px;
      color: #525658;
      margin-left: 20px;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid #343c51;
      cursor: pointer;
      li{
        padding: 2px 10px;
        text-indent: 10px;
        background-repeat: no-repeat;
          background-position: 6px center;
          background-size: 10px;
        &:first-child{
          background-image: url('../assets/country/60.png') ;

        }
        &:last-child{
          background-image: url('../assets/country/60-1.png') ;

        }
      }
      .active{
        background-color: #735DEE;
        color: #fff;
      }
    }
  }
  .nav-right{
    display: flex;
    font-size: 12px;
    .active{
      background: linear-gradient(#735DEE 30%, rgb(81, 65, 173) 90%);
    }
    li {
      position: relative;
      a{
        display: inline-flex;
        height: 50px;
        align-items: center;
        justify-content: center;
        color: #959EA8;
        text-shadow: 1px 1px 0 #4b2fe9;
        padding: 0 20px;
        border-left: 1px solid #1d2231;
        font-weight: 500;
        font-size: 14px;
        &:hover{
          background: linear-gradient(#735DEE 30%, rgb(81, 65, 173) 90%);
        }
        &:active{
          background: darken(#735DEE, 10%);
        }
      }
      .navBarCode{
        width: 124px;
        height: 160px;
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
    }
  }
}

</style>


