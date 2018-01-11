<template>
  <div id="app">
    <NavBar></NavBar>
    <video src="./assets/mov.mp4" class="bgmov" autoplay muted playsinline loop>
      您的浏览器不支持 video 标签。
    </video>
    <div class="bgCover"></div>
    <transition name="fadeIn">
      <router-view></router-view>
    </transition>
    <transition name="fade">
    <Spinner v-show="loading"></Spinner>
    </transition>
    <div class="footer" v-if="$route.name!=='Video'">Copyright © 2014-2017 {{$conf.icp}} Power by Superset.Studio</div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Spinner from '@/components/Spinner'
require('iphone-inline-video')
export default {
  name: 'app',
  watch: {
    '$route.name': function (o) {
      const mov = document.querySelector('.bgmov')
      if (o === 'Video') {
        mov.volume = 0
        mov.style.display = 'none'
      } else {
        mov.volume = 0.6
        mov.style.display = 'block'
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    NavBar,
    Spinner
  }
}
</script>

<style lang='scss'>
img[lazy=loading] {
    /*your style here*/
}
img[lazy=error],img[lazy=loaded] {
  /*your style here*/
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
.fade-leave-active {
  transition: opacity .3s
}
.fade-leave-to {
  opacity: 0
}
.fadeIn-enter-active{
  animation-name: fadeInUp;
  animation-duration: .3s;
  animation-fill-mode: both;
}
.fadeIn-leave-to {
  animation-name: fadeOutDown;
  animation-duration: .3s;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeIn {
from {
    opacity: 0;
}
to {
    opacity: 1;
}
}
@keyframes fadeIn {
from {
    opacity: 0;
}
to {
    opacity: 1;
}
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
@font-face {
	font-family: 'Roboto';
  src:  url('./assets/fonts/Roboto-Regular.woff') format('woff'),
        url('./assets/fonts/Roboto-Regular.woff2') format('woff2'),
        url('./assets/fonts/Roboto-Regular.ttf')  format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'iconfont';  /* project id 387362 */
  src: url('//at.alicdn.com/t/font_387362_2g12at6na5rk9.eot');
  src: url('//at.alicdn.com/t/font_387362_2g12at6na5rk9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_387362_2g12at6na5rk9.woff') format('woff'),
  url('//at.alicdn.com/t/font_387362_2g12at6na5rk9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_387362_2g12at6na5rk9.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
::-webkit-input-placeholder {
  color:#ccc;
}
body{
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  user-select:none;
  -webkit-font-smoothing: antialiased;
}
html{
  background: #111;
  width: 100%;
  height: 100%;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
p{
  margin: 0;
  line-height: 24px;
}
a{
  text-decoration: none;
}
.swiper-container-horizontal >
.swiper-pagination-bullets .swiper-pagination-bullet{
  background: #735DEE;
}
.bgmov{
  position: fixed;
  // min-width: 100vw;
  // min-height: 100vh;
  width: 100%;
  height: 100vh;
  z-index: -100;
  object-fit:cover;
  // background: url(./assets/bg.png) center;
  background-size: cover;
}
.bgCover{
  background: url(./assets/bg.png) center;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
}
.footer{
  position: fixed;
  z-index: -1;
  bottom: 12px;
  color: #767676;
  font-size: 10px;
  text-align: center;
  width: 100%;
  transform: scale(.9);
  &:before{
    content:' ';
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: url('./assets/footerLogo.png') no-repeat center;
    background-size: 100%;
  }
}
// 翻页
.zpagenav{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.m-r-1 {
    margin-right: 1rem!important;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  // margin-bottom: 1rem;
  // border-radius: .25rem;
}

.page-item {
  display: inline;
}

.page-item:first-child .page-link {
  margin-left: 0;
  // border-top-left-radius: .25rem;
  // border-bottom-left-radius: .25rem;
}

.page-item:last-child .page-link {
  // border-top-right-radius: .25rem;
  // border-bottom-right-radius: .25rem;
}

.page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #735DEE;
  border-color: #735DEE;
}

.page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.page-link {
  position: relative;
  float: left;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.5;
  color: #735DEE;
  text-decoration: none;
  background-color: #fff;
  // border: 1px solid #ddd;
}

.page-link:focus, .page-link:hover {
  color: #014c8c;
  background-color: #eceeef;
  border-color: #ddd;
}

.pagination-lg .page-link {
  padding: .75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.333333;
}

.pagination-lg .page-item:first-child .page-link {
  // border-top-left-radius: .3rem;
  // border-bottom-left-radius: .3rem;
}

.pagination-lg .page-item:last-child .page-link {
  // border-top-right-radius: .3rem;
  // border-bottom-right-radius: .3rem;
}

.pagination-sm .page-link {
  padding: .275rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
}

.pagination-sm .page-item:first-child .page-link {
  border-top-left-radius: .2rem;
  border-bottom-left-radius: .2rem;
}

.pagination-sm .page-item:last-child .page-link {
  border-top-right-radius: .2rem;
  border-bottom-right-radius: .2rem;
}

.pager {
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  list-style: none;
}

.pager::after {
  display: table;
  clear: both;
  content: "";
}

.pager li {
  display: inline;
}

.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.pager li > a:focus, .pager li > a:hover {
  text-decoration: none;
  background-color: #eceeef;
}

.pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager .disabled > span {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager-next > a,
.pager-next > span {
  float: right;
}

.pager-prev > a,
.pager-prev > span {
  float: left;
}
</style>
