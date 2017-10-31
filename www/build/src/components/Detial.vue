<template>
  <div class="modal-cover" @click="toggleModal">
      <Share :title="detialInfo.enName"></Share>
      <div class="modal" @click.stop>
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(i,index) in imageSwiper" :key="index">
            <img :src="$conf.qnUrl+i.key+'?imageView2/5/w/800/h/510'" style="height:510px;" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <IEcharts :option="bar"></IEcharts>
        <a href="javascript:;" class="close" @click.stop="toggleModal">
          <i class="iconfont">&#xe6e9;</i>
        </a>
        <div class="modal-title">
          <h5>{{detialInfo.enName}}</h5>
        </div>
        <p class="describe">
          {{detialInfo.describeEn}}
        </p>
        <table>
          <tr>
            <td>学名：</td>
            <td>{{detialInfo.enName}}</td>
            <td>习性：</td>
            <td>{{detialInfo.habit}}</td>
          </tr>
          <tr>
            <td>中文名：</td>
            <td>{{detialInfo.cnName}}</td>
            <td>类别：</td>
            <td>瓦鸟洞蜘蛛</td>
          </tr>
          <tr>
            <td>亚科：</td>
            <td>Aviculariinae</td>
            <td>荨麻疹：</td>
            <td>{{detialInfo.Urticating}}</td>
          </tr>
          <tr>
            <td>体长：</td>
            <td class="table-num">{{CBody}}</td>
            <td>足展：</td>
            <td class="table-num">{{CSpan}}</td>
          </tr>
          <tr>
            <td>身长：</td>
            <td>可能温和。还没有宝贵的科学研究。</td>
            <td>速度：</td>
            <td>{{detialInfo.growth}}</td>
          </tr>
          <tr>
            <td>预期寿命</td>
            <td>
              磁性：<span class="table-num">{{CFemales}}</span>
              雄性：<span class="table-num">{{CMales}}</span></td>
            <td colspan="2">
              <div class="accessibility">
                <div class="bar" :style="{width:detialInfo.Accessibility+'0%'}">
                  <span>{{detialInfo.Accessibility}}</span>
                </div>
                <span>专家</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>温度</td>
            <td>
              白天：<span class="table-num">{{CTemperature.day}}</span>
              夜间：<span class="table-num">{{CTemperature.night}}</span>
            </td>
            <td>湿度</td>
            <td>
              白天：<span class="table-num">{{CHumidity.day}}</span>
              夜间：<span class="table-num">{{CHumidity.night}}</span>
            </td>
          </tr>
        </table>
        <div class="mapbox" ref="mapbox"></div>
        <div class="content">
          <p v-html="detialInfo.contentEn"></p>
        </div>
      </div>
    </div>
</template>
<script>
import Share from '@/components/Share'
import mapboxgl from 'mapbox-gl'
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
        // swiper optionss 所有的配置同swiper官方api配置
        autoplay: 3000,
        loop: true,
        lazyLoading: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: false,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // onTransitionStart (swiper) {
        // }
      },
      loading: true,
      bar: {
        color: ['#87f7cf'],
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
          // shape: 'circle',
          // 足展大小，毒性，寿命，攻击性或者性格，提毛指数，爬行速度
          indicator: [
            { text: '足展大小', max: 100 },
            { text: '毒性', max: 100 },
            { text: '寿命', max: 100 },
            { text: '攻击性或者性格', max: 100 },
            { text: '提毛指数', max: 100 },
            { text: '爬行速度', max: 100 }
          ]
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
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
    Share
  },
  mounted () {
    var point = []
    point[0] = parseFloat(this.detialInfo.local.lat)
    point[1] = parseFloat(this.detialInfo.local.lon)
    this.bar.series[0].data[0].value = this.detialInfo.chart
    // this.imageSwiper = this.imageList
    this.$set(this.imageSwiper, this.imageList)
    this.swiper.update()
    this.$nextTick(() => {
      new mapboxgl.Map({
        container: this.$refs.mapbox,
        style: this.$conf.mapStyle,
        center: point,
        zoom: this.detialInfo.local.zoom,
        scrollZoom: false
      })
    })
  },
  filters: {

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
    // ...mapGetters([
    //   'detialInfo'
    // ]),
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    detialInfo () {
      return this.$store.state.spider.detialData
    },
    imageList () {
      return this.$store.state.spider.image
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
.modal-cover {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(28, 31, 36, 0.72);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: #262A33;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #735DEE;
    }
  }
  .modal {
    width: 800px;
    background: #fff;
    position: absolute;
    left: 50%;
    margin-left: -400px;
    top: 100px;
    z-index: 200;
    .close {
      width: 50px;
      height: 50px;
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 110;
      color: #fff;
      font-size: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #735DEE;
    }
    .modal-title {
      height: 56px;
      border-bottom: 1px solid #D6D6D6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      h5 {
        font-size: 24px;
      }
    }
    .describe{
      font-size: 14px;
      border-bottom: 1px solid #D6D6D6;
      margin: 0;
      padding: 20px;
      color: #4B4F57;
      letter-spacing: 0.6px;
      line-height: 24px;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 0;
      font-size: 14px;
      .accessibility{
        width: 100%;
        height: 30px;
        background: #F0F0F0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          position: absolute;
          right: 10px;
        }
        .bar{
          height: 30px;
          background: #735DEE;
          transition: width .3s;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color:#fff;
        }
      }
      .table-num {
        font-size: 16px;
        color:#735DEE;
      }
      tr {
        td {
          border-bottom: 1px solid #D6D6D6;
          border-right: 1px solid #D6D6D6;
          text-align: left;
          padding: 10px 10px;
          &:nth-child(2n-1) {
            font-weight: 600;
          }
        }
      }
    }
    .mapbox {
      outline: none;
      height: 300px;
      width: 100%;
      .mapboxgl-canvas {
        width: 100%;
      }
    }
    .content {
      padding: 20px;
      font-size: 14px;
      color: #4B4F57;
      letter-spacing: 0.6px;
      line-height: 24px;
      border-bottom: 1px solid #D6D6D6;
      p {
        margin: 0;
      }
    }
    .vue-echarts {
      width: 320px;
      height: 300px;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 120;
    }
  }

</style>
