<template>
<div class="video">
  <!-- <video class="playVideoWapper" autoplay controls :src="url">
    您的浏览器不支持 video 标签。
  </video> -->
  <d-player theme="#735dee"
            @play="play"
            :loop="false"
            :autoplay="false"
            :video="{
              url:url,
              pic:''}"
            :contextmenu="[
              {
                text: '联系MasterWang',
                link: 'https://amos.alicdn.com/getcid.aw?spm=a1z10.1-c.0.0.45ee61bb7SxlEu&v=3&groupid=0&s=1&charset=utf-8&uid=%E8%B5%B5%E8%89%B3%E5%A9%B7yy&site=cntaobao&groupid=0&s=1'
              },
            ]"
            ref="player">
  </d-player>
  <h2>{{$route.params.title}}</h2>
  <p>这是一端介绍</p>
  <swiper :options="swiperOption" ref="mySwiper" class="videoList">
  <swiper-slide v-for="(v,index) in playlist" :key="index" class="videoListItem">
    <router-link :to="{name:'Video',params:{vid:v.vid,title:v.title}}" v-scroll-to="{ el: 'body' }">
      <img src="../assets/cover.png" class="swiper-lazy" >
    </router-link>
    <div class="videoTitle" v-if="$route.params.vid !== v.vid">{{v.title}}</div>
    <transition name="fadeIn">
      <span class="playing" v-if="$route.params.vid === v.vid">{{$t('message.playing')}}</span>
    </transition>
  </swiper-slide>
  </swiper>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import VueDPlayer from 'vue-dplayer'
export default {
  name: 'Video',
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        mousewheelControl: true,
        paginationClickable: true,
        spaceBetween: 10
      },
      playlist: [
        { vid: 't0150btuqbk', title: 'TARANTULRS SOUL', cover: '' },
        { vid: 'o03585da5sl', title: '《国爬征程-海外篇》正片', cover: '' },
        { vid: 'b0300o2pnfn', title: '亚洲女王Omothymusviolaceopes新加坡蓝超级繁殖记', cover: '' },
        { vid: 'm018970qmxh', title: 'SericopelmaSPDarien达莲黑闪电繁殖记录', cover: '' },
        { vid: 'l0151uotrfd', title: 'Lasiodoradifficilis巴西火红捕鸟蛛繁殖', cover: '' }
      ]
    }
  },
  mounted () {
    this.player = this.$refs.player.dp
  },
  components: {
    'd-player': VueDPlayer
  },
  watch: {
    '$route.params': async function (o) {
      await this.getQQVideoRealUrl()
    },
    'url': function (n) {
      console.log(n)
      this.player.switchVideo({
        url: n
      })
    }
  },
  computed: {
    url () {
      return this.$store.state.video.realUrl
    }
  },
  async created () {
    await this.getQQVideoRealUrl()
  },
  methods: {
    ...mapActions([
      'getQQVideoRealUrl'
    ]),
    play () {
      console.log('play callback')
    }
  }
}
</script>
<style lang="scss" scoped>
.video{
  width:1080px;
  position: absolute;
  left:50%;
  top: 120px;
  margin-left:-540px;
  color:#fff;
  .playVideoWapper{
    width: 1080px;
    height: 607.5px;
    background: #000;
  }
  h2{
    margin: 20px 0 10px 0
  }
  p{
    font-size: 12px;
  }
  .videoList{
    width: 100%;
    height: 120px;
    .videoListItem{
      width: 220px;
      height: 120px;
      position: relative;
      img{
        width: 100%;
      }
      .playing{
        position: absolute;
        display: block;
        bottom: 10px;
        left: 10px;
        font-size: 12px;
        background: #735DEE;
        padding: 2px 4px;
      }
      .videoTitle{
        width: 190px;
        position: absolute;
        font-size: 12px;
        left: 10px;
        bottom: 10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
// 禁用chrome 下载标签
video::-internal-media-controls-download-button {
    display:none;
}
video::-webkit-media-controls-enclosure {
    overflow:hidden;
}
video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
}
</style>

