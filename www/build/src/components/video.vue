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
      url: 'http://ugcdl.video.gtimg.com/flv/45/195/t0150btuqbk.mp4?sdtfrom=v3010&guid=33d650af32826d2cb923c72e1f9a284a&vkey=6782FECDFC966FDEAFD752A26ACBFBF851AF11772B2F6E7A2469F9571A305A65BBF56E8107E9B6912EA3003C84513D11AFAD0BA0527476FCDD543AB6B87FE9C0D209C0CFFAD4D3DAF9A371229E87BD7DE5EED6CE558354A626199612E13259BB6A792D1E794FE44982C4FD207CA3A710FBA1C4F5247CFAEE&platform=2',
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
      let url = null
      switch (o.vid) {
        case 't0150btuqbk':
          url = 'http://ugcdl.video.gtimg.com/flv/45/195/t0150btuqbk.mp4?sdtfrom=v3010&guid=33d650af32826d2cb923c72e1f9a284a&vkey=6782FECDFC966FDEAFD752A26ACBFBF851AF11772B2F6E7A2469F9571A305A65BBF56E8107E9B6912EA3003C84513D11AFAD0BA0527476FCDD543AB6B87FE9C0D209C0CFFAD4D3DAF9A371229E87BD7DE5EED6CE558354A626199612E13259BB6A792D1E794FE44982C4FD207CA3A710FBA1C4F5247CFAEE&platform=2'
          break
        case 'o03585da5sl':
          url = 'http://ugcdl.video.gtimg.com/flv/202/141/o03585da5sl.m701.mp4?sdtfrom=v1103&guid=33d650af32826d2cb923c72e1f9a284a&vkey=09EACE0B18C45BFC20262D9CD9258AB87A2A5F7043B619FBD5189B9D70052CBF9CFBF71E4BEA9AF6F79FC38B4D8D357C451E0B70ED5E075F9B9CC6D1FF46ABD3B36E87B5B2F63F4318F304FA69665402C7E47822230E934A4DB19C9064BA2206CE3C60E2E09C002C96B46ACE39BADE3D0BAF8C5FEBB49F83&platform=2'
          break
        case 'b0300o2pnfn':
          url = 'http://ugcbsy.qq.com/flv/29/152/b0300o2pnfn.m701.mp4?sdtfrom=v1103&guid=33d650af32826d2cb923c72e1f9a284a&vkey=E4D57CA3083782CA53CBBCB9A09A21BEF15928AFDA94EB9357952A77BE0DBEDC5D439F0A97C7CD1D3B61E53BBCBC0FC3C4CA66BD192BD35554F5DCCD36F7E9C373976365FADB7F3208617D17CE796F2CAE01711BCC7DD3EDFB47395552CF1E88AC1C97A89280BFCDF62C6A80C1E926A312AA4251B56918D6&platform=2'
          break
        case 'm018970qmxh':
          url = 'http://140.207.62.160/vhot2.qqvideo.tc.qq.com/A6GgB_3gfUdawR7MsvqcGuqsRHqgn465DCF1LOA17ASQ/m018970qmxh.m701.mp4?sdtfrom=v1103&guid=33d650af32826d2cb923c72e1f9a284a&vkey=7FD06B42A4F6698FB0D0AA315BAC44086A8822DC7B061F6DAD9D2A3BD964D04FF54822AA1B39F3643604E84B25AF7CB0045CC2B3465FCAB8D4FB0AA369B25C934B839C4D1FDF40078B57F17F5FCA3AB726B50941246F19876C854C747D16CC10B91302DE18EFED501549D0E90DE076EF2057CBB8E0EF0968&platform=2&ocid=2570130860&ocid=391189932&ocid=3750425610'
          break
        case 'l0151uotrfd':
          url = 'http://175.155.116.160/vhot2.qqvideo.tc.qq.com/AAPI13423_KyoVQRbx_Yt2X_wuZeKUMypWoFWUGkn3BI/l0151uotrfd.m701.mp4?sdtfrom=v1103&guid=33d650af32826d2cb923c72e1f9a284a&vkey=68E8B20A26336045EFE5278FB14797D0C0896B72C45BA776260D716398B5C2D59881279AEF21314EE532CB927CE0D8B2E6ED107F5EB5A9AA50CAF1EEBF4BE92EF458C50F9C8F1D91DD35CF1C0CDD504ABC0F2959524A86B6407FA09890A736E504EF8016BE8D6564A96D8F0F0EFEED124CD28263CE547E83&platform=2&ocid=2570130860&ocid=777065900&ocid=210433034'
          break
      }
      this.player.switchVideo({
        url: url
      })
    }
  },
  methods: {
    play () {
    }
  }
}
</script>
<style lang="scss" scoped>
.video{
  width:960px;
  position: absolute;
  left:50%;
  top: 120px;
  margin-left:-480px;
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
    margin-top: 20px;
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

