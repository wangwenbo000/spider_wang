<template>
<div class="modal-cover"
      @click="toggleModal">
    <!-- 分享组件 -->
    <Share :title="detialInfo.enName"></Share>
    <div class="modal"
          @click.stop>
      <!-- 关闭按钮 -->
      <a href="javascript:;"
          class="close"
          @click.stop="back">
        <i class="iconfont">&#xe6e9;</i>
      </a>
      <!-- SWIPER轮播 -->
      <swiper :options="swiperOption"
              ref="mySwiper">
        <swiper-slide v-for="(i,index) in imageSwiper"
                      :key="index">
          <img :src="$conf.qnUrl+i.key+'?imageView2/0/h/400'">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 标题 -->
      <div class="modal-title">
        <h5 v-show="$i18n.locale==='en'">{{detialInfo.enName}}</h5>
        <h5 v-show="$i18n.locale==='cn'">{{detialInfo.cnName}}</h5>
        <div>
          <a :href="detialInfo.scaleUrl" target="_blank" class="shopping-taobao" v-if="detialInfo.scalePlatform===0">淘宝详情</a>
          <a class="wangwang" v-if="detialInfo.scalePlatform===0" href="https://amos.alicdn.com/getcid.aw?spm=a1z10.1-c.0.0.45ee61bb7SxlEu&v=3&groupid=0&s=1&charset=utf-8&uid=%E8%B5%B5%E8%89%B3%E5%A9%B7yy&site=cntaobao&groupid=0&s=1" target="_blank">
          <i class="iconfont">&#xe602;</i>
          即刻旺旺
          </a>
        </div>
      </div>
      <!-- 描述 -->
      <p class="describe" v-show="$i18n.locale==='en'" v-html="detialInfo.describeEn">
        <!-- {{detialInfo.describeEn}} -->
      </p>
      <p class="describe" v-show="$i18n.locale==='cn'">
        {{detialInfo.describeCn}}
      </p>
      <!-- 数据表 -->
      <table>
        <tr>
          <td width="80">学名：</td>
          <td width="310">{{detialInfo.enName}}</td>
          <td colspan="2" rowspan="5" class="chartWapper">
            <IEcharts :option="bar"></IEcharts>
          </td>
        </tr>
        <tr>
          <td>中文名：</td>
          <td>{{detialInfo.cnName}}</td>
        </tr>
        <tr>
          <td>亚科：</td>
          <td>{{detialInfo.subfamily}}</td>
        </tr>
        <tr>
          <td>成长速度：</td>
          <td>{{growSpeed}}</td>
        </tr>
        <tr>
          <td>习性：</td>
          <td>
            <span class="table-num table-num-m"
                  v-for="x in detialInfo.habit"
                  :key="x">
                  {{x}}
            </span>
          </td>
        </tr>
        <tr>
          <td>荨麻疹：</td>
          <td>{{detialInfo.Urticating === 0 ? '否':'是'}}</td>
          <td width="80">体长：</td>
          <td><span class="table-num">{{CBody}}</span></td>
        </tr>
        <tr>
          <td>预期寿命</td>
          <td>
            雌性：<span class="table-num">{{CFemales}}</span>
            雄性：<span class="table-num">{{CMales}}</span>
          </td>
          <td>足展：</td>
          <td>
            <span class="table-num">{{CSpan}}</span>
          </td>
        </tr>
        <tr>
          <td>温度</td>
          <td>
            <div class="table-num-wrapper">白天：<span class="table-num">{{CTemperature.day}}</span></div>
            <div class="table-num-wrapper">夜间：<span class="table-num">{{CTemperature.night}}</span></div>
          </td>
          <td>
            饲养难度：
          </td>
          <td>
            <Level :level-num="detialInfo.Accessibility"
                    :level-data="['入门级','玩家级','专家级','梦幻级']">
            </Level>
          </td>
        </tr>
        <tr>
          <td>湿度</td>
          <td>
            <div class="table-num-wrapper">白天：<span class="table-num">{{CHumidity.day}}</span></div>
            <div class="table-num-wrapper">夜间：<span class="table-num">{{CHumidity.night}}</span></div>
          </td>
          <td>稀有度：</td>
          <td>
            <Level :level-num="detialInfo.rarity"
                    :level-data="['常见','普通','稀有','罕见','传说']">
            </Level>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="mapbox" ref="mapbox">
              <div class="localName">
                <i class="iconfont">&#xe61a;</i>
                {{detialInfo.local.name}} | {{detialInfo.local.lat}}, {{detialInfo.local.lon}}
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- 介绍 -->
      <div class="content">
        <h2 class="content-title">SPIDER INFORMATION</h2>
        <p v-html="detialInfo.contentEn"
            v-if="$i18n.locale==='en'"></p>
        <p v-html="detialInfo.contentCn"
            v-if="$i18n.locale==='cn'"></p>
      </div>
    </div>
  </div>
</template>
<script>
import Share from '@/components/Share'
import Level from '@/components/LevelCom'
// import mapboxgl from 'mapbox-gl'
import IEcharts from 'vue-echarts-v3/src/lite.vue'
import 'echarts/lib/chart/radar'
import { mapActions } from 'vuex'
mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZ3dlbmJvIiwiYSI6ImEwTjJOVUEifQ.PSnvBkC79ydlN4yvDs-HSQ'

export default {
  name: 'detial',
  data () {
    return {
      imageSwiper: [],
      swiperOption: {
        autoplay: 3000,
        loop: true,
        // effect: 'fade',
        direction: 'horizontal',
        // grabCursor: true,
        // setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination'
        // paginationClickable: true,
        // mousewheelControl: false
        // observeParents: true
        // debugger: true
      },
      // loading: true,
      bar: {
        color: ['#735DEE'],
        textStyle: {
          fontWeight: ['bold'],
          fontFamily: ['Roboto']
        },
        radiu: 2,
        title: {
          text: '基础雷达图'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)'
        },
        radar: {
          indicator: [
            { text: '足展大小', max: 100 },
            { text: '毒性', max: 100 },
            { text: '寿命', max: 100 },
            { text: '凶猛程度', max: 100 },
            { text: '提毛指数', max: 100 },
            { text: '敏捷度', max: 100 }
          ]
        },
        series: [{
          name: '',
          type: 'radar',
          areaStyle: {
            normal: {
              opacity: 0.6,
              color: 'rgba(115, 93, 238, 0.4)'
            }
          },
          data: [
            {
              value: [100, 100, 100, 100, 100, 100],
              name: '预算分配（Allocated Budget）',
              label: {
                normal: {
                  show: true,
                  formatter: params => {
                    return params.value
                  }
                }
              }
            }
          ]
        }]
      }
    }
  },
  components: {
    IEcharts,
    Share,
    Level
  },
  mounted () {
    this.bar.series[0].data[0].value = this.detialInfo.chart
    this.$set(this.imageSwiper, this.imageList)
    this.swiper.update()
  },
  watch: {
    'detialInfo.chart': function (o) {
      this.bar.series[0].data[0].value = o
    },
    'imageList': function (o) {
      this.imageSwiper = o
      if (o.length === 0) {
        this.imageSwiper.push({ key: 'empty.jpg' })
      }
    },
    'detialInfo.local': function (o) {
      setTimeout(() => {
        var point = []
        point[0] = parseFloat(this.detialInfo.local.lat)
        point[1] = parseFloat(this.detialInfo.local.lon)
        new mapboxgl.Map({
          container: this.$refs.mapbox,
          style: this.$conf.mapStyle,
          center: point,
          zoom: this.detialInfo.local.zoom,
          scrollZoom: false
        })
      }, 1000)
    }
  },
  async created () {
    await this.getDetialData()
  },
  beforeRouteEnter (to, from, next) {
    const body = document.querySelector('body')
    body.style.cssText = 'overflow:hidden;'
    next()
  },
  beforeRouteLeave (to, from, next) {
    const body = document.querySelector('body')
    body.style.cssText = ''
    next()
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    detialInfo () {
      return this.$store.state.spider.detialData
    },
    imageList () {
      return this.$store.state.spider.image
    },
    growSpeed () {
      switch (this.detialInfo.growth) {
        case 0:
          return '极慢'
        case 1:
          return '缓慢'
        case 2:
          return '快'
        case 3:
          return '飞速'
      }
    },
    CSpan () {
      return '≤' + this.detialInfo.span.min + 'cm -' + this.detialInfo.span.max + 'cm'
    },
    CBody () {
      return '≤' + this.detialInfo.body.min + 'cm -' + this.detialInfo.body.max + 'cm'
    },
    CFemales () {
      return '≤' + this.detialInfo.females.min + '岁 -' + this.detialInfo.females.max + '岁'
    },
    CMales () {
      return '≤' + this.detialInfo.males.min + '岁 -' + this.detialInfo.males.max + '岁'
    },
    CTemperature () {
      return {
        day: this.detialInfo.temperature.day.min + '℃ - ' + this.detialInfo.temperature.day.max + '℃',
        night: this.detialInfo.temperature.night.min + '℃ - ' + this.detialInfo.temperature.night.max + '℃'
      }
    },
    CHumidity () {
      return {
        day: this.detialInfo.humidity.day.min + '%RH - ' + this.detialInfo.humidity.day.max + '%RH',
        night: this.detialInfo.humidity.night.min + '%RH - ' + this.detialInfo.humidity.night.max + '%RH'
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggleModal () {
      this.$router.push({
        name: 'Filter',
        params: {
          title: this.$route.params.title
        }
      })
    },
    ...mapActions([
      'getDetialData'
    ])
  }
}
</script>
<style lang='scss' scoped>
@import './style/detial';
</style>
