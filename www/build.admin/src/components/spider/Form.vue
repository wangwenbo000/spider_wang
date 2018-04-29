<template>
<div class="pageForm">
  <form @submit.prevent="validateBeforeSubmit">
  <div class="actionBar">
    <button class="global-btn gb-red" @click="back">取消添加</button>
    <button class="global-btn gb-yellow" @click="saveDraft">草稿箱</button>
    <button class="global-btn gb-green" type="submit">发布记录</button>
  </div>
  <h1>{{$route.query.action === 'edit'?'编辑':'增加'}}记录
    <span v-show="info.status===0">🗂 已存草稿箱</span>
    <span v-show="info.status===1">✅ 已发布状态</span>
    <span v-show="info.status===2">❓未发布或存草稿箱新增状态</span>
  </h1>
  <table>
    <tr>
      <td width="60">中文名称:</td>
      <td>
        <input autofocus type="text" name="cnName" v-model="info.cnName" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('cnName') }">
        <span v-show="errors.has('cnName')" class="help is-danger">⚠️ {{ errors.first('cnName') }}</span>
      </td>
      <td rowspan="26" valign="top" style="vertical-align:top;padding:0;" width="520">
        <ul class="tabBar">
          <li @click="showEditor=0" :class="showEditor===0&&'tab-active'">中文内容撰写</li>
          <li @click="showEditor=1" :class="showEditor===1&&'tab-active'">英文内容撰写</li>
        </ul>
        <Editor :context="info.contentCn" editor-name="spider-cn-html" ref="Editor" v-show="showEditor===0"></Editor>
        <Editor :context="info.contentEn" editor-name="spider-en-html" ref="Editore" v-show="showEditor===1"></Editor>
      </td>
    </tr>
    <tr>
      <td>English Name:</td>
      <td>
        <input type="text" name="enName" v-model="info.enName" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('enName') }">
        <span v-show="errors.has('enName')" class="help is-danger">⚠️ {{ errors.first('enName') }}</span>
      </td>
    </tr>
    <tr>
      <td>简介描述:</td>
      <td>
        <textarea rows="3"
                  name="describeCn"
                  placeholder="请简单描述一下"
                  v-model="info.describeCn"
                  v-validate="'required|min:10'"
                  :class="{'input': true,'is-danger': errors.has('describeCn') }">
                  </textarea>
                  <span v-show="errors.has('describeCn')" class="help is-danger">
                     ⚠️ {{ errors.first('describeCn') }}
                  </span>
      </td>
    </tr>
    <tr>
      <td>英文描述:</td>
      <td>
        <textarea rows="3"
                  name="describeEn"
                  placeholder="请用英文简单描述一下"
                  v-model="info.describeEn"
                  v-validate="'required|min:10'"
                  :class="{'input': true,'is-danger': errors.has('describeEn') }"></textarea>
                  <span v-show="errors.has('describeEn')" class="help is-danger">
                    ⚠️ {{ errors.first('describeEn') }}
                  </span>
      </td>
    </tr>
    <tr>
      <td >亚科</td>
      <td style="position:relative;">
        <input type="text" @focus="subfamilyChoose=true" v-model="info.subfamily">
        <div class="category-choose" style="height:300px;" v-if="subfamilyChoose">
          <div class="close" @click="subfamilyChoose=false">❌</div>
          <Category postUrl="apix/spider/getCateList" :name="'subfamilyChoose'" @nodeClick="pNodeClick" :isFormCom="true" :isAllowPNode="true" :isExpandAllNodes="true"></Category>
        </div>
      </td>
    </tr>
    <tr>
      <td>稀有度</td>
      <td>
        <select name="" v-model="info.rarity">
          <option :value="1" selected>常见</option>
          <option :value="2">普通</option>
          <option :value="3">稀有</option>
          <option :value="4">罕见</option>
          <option :value="5">传说</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>是否售卖:</td>
      <td>
        <input name="isScale" id="isScale1" type="radio" value="1" v-model="info.isScale"/>
        <label for="isScale1">是</label>
        <input name="isScale" id="isScale2" type="radio" value="0" v-model="info.isScale"/>
        <label for="isScale2">否</label>
      </td>
    </tr>
    <tr v-show="parseInt(info.isScale) === 1">
      <td style="background:#fff5d4;">售卖平台:</td>
      <td style="background:#fff5d4">
        <input name="scalePlatform" id="scalePlatform1" type="radio" :value="1" v-model="info.scalePlatform"/>
        <label for="scalePlatform1">微信</label>
        <input name="scalePlatform" id="scalePlatform2" type="radio" :value="0" v-model="info.scalePlatform"/>
        <label for="scalePlatform2">淘宝</label>
        <span v-show="info.scalePlatform===0">
          <input type="text" placeholder="淘宝售卖地址http://" v-model="info.scaleUrl">
        </span>
      </td>
    </tr>
    <tr>
      <td>荨麻疹:</td>
      <td>
        <input name="Urticating" type="radio" id="Urticating1" :value="1" v-model="info.Urticating"/>
        <label for="Urticating1">是</label>
        <input name="Urticating" type="radio" id="Urticating2" :value="0" v-model="info.Urticating"/>
        <label for="Urticating2">否</label>
      </td>
    </tr>
    <tr>
      <td>成长速度</td>
      <td>
        <input name="growth" type="radio" :value="0" v-model="info.growth"/>极慢
        <input name="growth" type="radio" :value="1" v-model="info.growth"/>缓慢
        <input name="growth" type="radio" :value="2" v-model="info.growth"/>快
        <input name="growth" type="radio" :value="3" v-model="info.growth"/>飞速
      </td>
    </tr>
    <tr>
      <td>分类:</td>
      <td style="position:relative;">
        <input type="text" @focus="categoryChoose=true" :value="categoryName">
        <div class="category-choose" v-show="categoryChoose">
          <div class="close" @click="categoryChoose=false">❌</div>
          <Category postUrl="apix/spider/getCateList" :name="'categoryChoose'" @nodeClick="nodeClick" :isFormCom="true"></Category>
        </div>
      </td>
    </tr>
    <tr>
      <td>习性:</td>
      <td>
        <input type="checkbox" value="穴栖" id="穴栖" v-model="info.habit">穴栖
        <input type="checkbox" value="地栖" id="地栖" v-model="info.habit">地栖
        <input type="checkbox" value="树栖" id="树栖" v-model="info.habit">树栖
      </td>
    </tr>
    <tr>
      <td>足展:</td>
      <td style="display:flex;border:none;align-items:center;">
        <strong>≤</strong>
        <input type="range" name="span-min" min="1" max="40" v-model="info.span.min"/><span class="rangeNum">{{info.span.min}}cm</span>
        ---
        <input type="range" name="span-max" min="1" max="40" v-model="info.span.max"/><span class="rangeNum">{{info.span.max}}cm</span>
        <span class="rangePreview">{{CSpan}}</span>
      </td>
    </tr>
    <tr>
      <td>体长:</td>
      <td style="display:flex;border:none;align-items:center;">
        <strong>≤</strong>
        <input type="range" name="body" min="1" max="10" v-model="info.body.min"/><span class="rangeNum">{{info.body.min}}cm</span>
        ---
        <input type="range" name="body" min="1" max="10" v-model="info.body.max"/><span class="rangeNum">{{info.body.max}}cm</span>
        <span class="rangePreview">{{CBody}}</span>
      </td>
    </tr>
    <tr>
      <td rowspan="2">寿命:</td>
      <td>
        <strong>磁性：</strong>
        <input type="range" name="body" min="0" max="50" v-model="info.females.min"/><span class="rangeNum">{{info.females.min}}岁</span>
        ---
        <input type="range" name="body" min="0" max="50" v-model="info.females.max"/><span class="rangeNum">{{info.females.max}}岁</span>
        <span class="rangePreview">{{CFemales}}</span>
      </td>
    </tr>
    <tr>
      <td>
        <strong>雄性：</strong>
        <input type="range" name="body" min="0" max="50" v-model="info.males.min"/><span class="rangeNum">{{info.males.min}}岁</span>
        ---
        <input type="range" name="body" min="0" max="50" v-model="info.males.max"/><span class="rangeNum">{{info.males.max}}岁</span>
        <span class="rangePreview">{{CMales}}</span>
      </td>
    </tr>
    <tr>
      <td>饲养难度:</td>
      <td>
        <select name="" v-model="info.Accessibility">
          <option :value="1" selected>入门级</option>
          <option :value="2">玩家级</option>
          <option :value="3">专家级</option>
          <option :value="4">梦幻级</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        地域: <br/>
        ( 🌐 需翻墙! )
      </td>
      <td style="position:relative;">
        地点名称：<input type="text" name="local" v-model="info.local.name" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('local') }" style="width:100px;">
        <span v-show="errors.has('local')" class="help is-danger">
                     ⚠️ {{ errors.first('local') }}
                  </span>
        <a href="javascript:;" @click="openMap">检索</a>
        缩放空间：<input type="range" name="body" min="1" max="10" v-model="info.local.zoom"/>
        <input type="text" v-model="info.local.zoom" style="width:30px;">
        <br>
        经度：<input type="text" placeholder="" style="width:100px;" v-model="info.local.lon">
        纬度：<input type="text" placeholder="" style="width:100px;" v-model="info.local.lat">
      </td>
    </tr>
    <tr>
      <td rowspan="2">温度:</td>
      <td>
        <strong>白天：</strong>
        <input type="range" name="body" min="-10" max="60" v-model="info.temperature.day.min"/><span class="rangeNum">{{info.temperature.day.min}}℃</span>
        ---
        <input type="range" name="body" min="-10" max="60" v-model="info.temperature.day.max"/><span class="rangeNum">{{info.temperature.day.max}}℃</span>
        <span class="rangePreview">{{CTemperature.day}}</span>
      </td>
    </tr>
    <tr>
      <td>
        <strong>夜间：</strong>
        <input type="range" name="body" min="-10" max="60" v-model="info.temperature.night.min"/><span class="rangeNum">{{info.temperature.night.min}}℃</span>
        ---
        <input type="range" name="body" min="-10" max="60" v-model="info.temperature.night.max"/><span class="rangeNum">{{info.temperature.night.max}}℃</span>
        <span class="rangePreview">{{CTemperature.night}}</span>
      </td>
    </tr>
    <tr>
      <td rowspan="2">湿度:</td>
      <td>
        <strong>白天：</strong>
        <input type="range" name="body" min="0" max="100" v-model="info.humidity.day.min"/><span class="rangeNum">{{info.humidity.day.min}}%RH</span>
        ---
        <input type="range" name="body" min="0" max="100" v-model="info.humidity.day.max"/><span class="rangeNum">{{info.humidity.day.max}}%RH</span>
        <span class="rangePreview">{{CHumidity.day}}</span>
      </td>
    </tr>
    <tr>
      <td>
        <strong>夜间：</strong>
        <input type="range" name="body" min="0" max="100" v-model="info.humidity.night.min"/><span class="rangeNum">{{info.humidity.night.min}}%RH</span>
        ---
        <input type="range" name="body" min="0" max="100" v-model="info.humidity.night.max"/><span class="rangeNum">{{info.humidity.night.max}}%RH</span>
        <span class="rangePreview">{{CHumidity.night}}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="background:#fffdee;padding:0;">
        <div style="display:flex">
          <ul class="uploadCover">
            <li v-for="(file, index) in editFiles" :key="file.id">
              <img :src="$conf.qnUrl+file.key+'?imageView2/5/w/120/h/120'" width="50" height="auto"/>
              <div class="chooseCoverForm">
                <input type="radio" name="chooseCover" :id="'chooseCover'+index" :value="file.key" v-model="coverName"/>
                <label :for="'chooseCover'+index">设为封面</label>
                <div>已上传✅</div>
              </div>
              <a href="javascript:;" class="deleteCover" @click.prevent="removeCoverFromDBandServer(file)">❌</a>
            </li>
          </ul>
          <ul class="uploadCover">
            <li v-for="(file, index) in upload.files" :key="file.id">
              <img :src="file.blob" width="50" height="auto" />
              <div class="chooseCoverForm">
                <input type="radio" name="chooseCover" :id="'chooseCover'+index" :value="file.name" v-model="coverName"></input>
                <label :for="'chooseCover'+index">设为封面</label>
                <div>{{file.size | formatSize}}</div>
                <div>{{file.speed | formatSize}}</div>
              </div>
              <a href="javascript:;" class="deleteCover" @click.prevent="removeCover(file)">❌ Delete</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="background: #fffdee;padding:0;">
        <FileUpload :post-action="upload.postAction"
                    :extensions="upload.extensions"
                    :accept="upload.accept"
                    :multiple="upload.multiple"
                    :size="upload.size || 0"
                    :thread="upload.thread < 1 ? 1 : (upload.thread > 5 ? 5 : upload.thread)"
                    :data="upload.data"
                    :drop="upload.drop"
                    v-model="upload.files"
                    @input-file="inputFile"
                    ref="upload">
                    <strong>👉 点击或者拖拽图片到此处上传</strong>
                    <br>
                    上传不限量（建议最多4张）
                    <br>
                    封面：204px × 170px | 轮播图：800px × 510px
                    <br>
                    这两个规格的图建议裁切后上传，你不裁系统会自动帮你裁切，但不一定准确
                    <span style="color:blue;"> 为了保证用户体验，请不要上传过大的图片，每张图片请保持在2M以内</span>
                    </FileUpload>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <div style="display:flex;align-items:center;justify-content: space-around;">
          <div class="charts">
            <IEcharts :option="bar"></IEcharts>
          </div>
          <div>
            <div class="chartBar">
            <span>足展大小：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[0]"/>
            <span class="rangeNum">{{info.chart[0]}}</span>
          </div>
          <div class="chartBar">
            <span>毒性：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[1]"/>
            <span class="rangeNum">{{info.chart[1]}}</span>
          </div>
          <div class="chartBar">
            <span>寿命：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[2]"/>
            <span class="rangeNum">{{info.chart[2]}}</span>
          </div>
          <div class="chartBar">
            <span>凶猛程度：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[3]"/>
            <span class="rangeNum">{{info.chart[3]}}</span>
          </div>
          <div class="chartBar">
            <span>提毛指数：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[4]"/>
            <span class="rangeNum">{{info.chart[4]}}</span>
          </div>
          <div class="chartBar">
            <span>敏捷度：</span>
            <input type="range" name="body" min="0" max="100" v-model="info.chart[5]"/>
            <span class="rangeNum">{{info.chart[5]}}</span>
          </div>
          </div>
        </div>

      </td>
    </tr>
    <tr>
      <td colspan="2">

      </td>
    </tr>
  </table>
  </form>
</div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/lite.vue'
import 'echarts/lib/chart/radar'
import FileUpload from 'vue-upload-component'
import { mapActions } from 'vuex'
import Category from '@/components/Category'
import Editor from '@/components/plugin/Editor'
export default {
  name: 'SpiderForm',
  data () {
    return {
      showEditor: 0,
      categoryChoose: false,
      subfamilyChoose: false,
      categoryName: '',
      coverName: '',
      saveId: null,
      editFiles: [],
      bar: {
        color: ['#3b3b8f'],
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
            { text: '凶猛程度', max: 100 },
            { text: '提毛指数', max: 100 },
            { text: '敏捷度', max: 100 }
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
              value: [0, 0, 0, 0, 0, 0],
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
      },
      upload: {
        files: [],
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        size: 1024 * 1024 * 10,
        extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
        multiple: true,
        drop: true,
        thread: 1,
        name: 'file',
        postAction: '/apix/upload/upload',
        data: {
          'id': null
        },
        auto: false
      },
      info: {
        cnName: '',
        enName: '',
        describeCn: '',
        describeEn: '',
        Urticating: 1,
        chart: [0, 0, 0, 0, 0, 0],
        isScale: 1,
        scalePlatform: 1,
        growth: 1,
        habit: [],
        rarity: 0,
        Accessibility: 0,
        category: 0,
        subfamily: '',
        scaleUrl: '',
        males: {
          min: 1,
          max: 1
        },
        females: {
          min: 1,
          max: 1
        },
        body: {
          min: 1,
          max: 1
        },
        span: {
          min: 1,
          max: 1
        },
        temperature: {
          day: {
            min: 0,
            max: 0
          },
          night: {
            min: 0,
            max: 0
          }
        },
        humidity: {
          day: {
            min: 0,
            max: 0
          },
          night: {
            min: 0,
            max: 0
          }
        },
        local: {
          name: '',
          zoom: 6,
          lon: 0,
          lat: 0
        },
        contentCn: '',
        contentEn: '',
        status: 2
      }
    }
  },
  computed: {
    CSpan () {
      return '≤' + this.info.span.min + 'cm -' + this.info.span.max + 'cm'
    },
    CBody () {
      return '≤' + this.info.body.min + 'cm -' + this.info.body.max + 'cm'
    },
    CFemales () {
      return '≤' + this.info.females.min + '岁 -' + this.info.females.max + '岁'
    },
    CMales () {
      return '≤' + this.info.males.min + '岁 -' + this.info.males.max + '岁'
    },
    CTemperature () {
      return {
        day: this.info.temperature.day.min + '℃ - ' + this.info.temperature.day.max + '℃',
        night: this.info.temperature.night.min + '℃ - ' + this.info.temperature.night.max + '℃'
      }
    },
    CHumidity () {
      return {
        day: this.info.humidity.day.min + '%RH - ' + this.info.humidity.day.max + '%RH',
        night: this.info.humidity.night.min + '%RH - ' + this.info.humidity.night.max + '%RH'
      }
    }
    // imageList () {
    //   return this.$store.state.Spider.image
    // }
  },
  components: {
    FileUpload,
    Category,
    IEcharts,
    Editor
  },
  async created () {
    if (this.$route.query.action === 'edit') {
      await this.getDetial()
      this.info = { ...this.$store.state.Spider.detial }
      // this.info = Object.assign({}, this.$store.state.Spider.detial)
      this.editFiles = this.$store.state.Spider.image
      this.coverName = this.info.cover
    }
  },
  mounted () {
    this.info.category = parseInt(this.$route.query.cate)
    this.categoryName = this.$route.query.name
  },
  watch: {
    '$route.query': function (o) {
      this.info.category = o.cate
      this.categoryName = o.name
    },
    'coverName': function (o) {
      if (o === null) return false
      if (o.match('spider/swiper')) {
        this.info.cover = o
      }
    },
    'info.chart': function (o) {
      this.bar.series[0].data[0].value = this.info.chart
    },
    'upload.files': function (o) {
      if (o.length === 1 && this.editFiles.length === 0) {
        this.coverName = o[0].name
      }
    }
  },
  methods: {
    back () {
      this.$router.replace({
        path: this.$route.query.redirect
      })
    },
    openMap () {
      if (this.info.local.name === '') {
        alert('请输入搜索地址')
        return false
      }
      var iTop = (window.screen.availHeight - 30 - 1000) / 2
      var iLeft = (window.screen.availWidth - 10 - 800) / 2
      window.open('https://www.google.com/maps/search/' + this.info.local.name, 'sharer', 'toolbar=0,status=0,width=1000,height=800,top=' + iTop + ',left=' + iLeft)
      return false
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // console.log('add', newFile)
        // 缩略图
        var URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile = this.$refs.upload.update(newFile, { blob: URL.createObjectURL(newFile.file) })
        }
        // post filename
        newFile.data.name = newFile.name
      }
      if (newFile && oldFile) {
        if (newFile.active && !oldFile.active) {
          this.beforeSend(newFile)
        }
        if (newFile.success && !oldFile.success) {
          // this.success(newFile)
          if (this.$refs.upload.uploaded) {
            this.back()
          }
        }
      }
    },
    async validateBeforeSubmit () {
      const result = await this.$validator.validateAll()
      const action = this.$route.query.action
      if (result) {
        this.info.status = 1
        this.info.chart = this.info.chart.join(',')
        this.info.contentCn = this.$refs.Editor.setEditorContent()
        this.info.contentEn = this.$refs.Editore.setEditorContent()
        const id = await this.addSpiderData({
          data: this.info,
          action: action
        })
        this.saveId = action === 'add' ? id.data.data : this.$route.query.id
        // 开始上传文件
        this.$refs.upload.active = true
        this.isNewFile()
        return false
      }
    },
    isNewFile () {
      if (this.$refs.upload.files.length === 0) {
        this.back()
      }
    },
    async saveDraft () {
      const action = this.$route.query.action
      this.info.status = 0
      this.info.chart = this.info.chart.join(',')
      const id = await this.addSpiderData({
        data: this.info,
        action: action
      })
      this.saveId = id.data.data
      // 开始上传文件
      this.$refs.upload.active = true
      this.isNewFile()
    },
    nodeClick (info) {
      this.$router.push({
        query: {
          action: this.$route.query.action,
          cate: info.id,
          id: this.$route.query.id,
          name: info.name,
          redirect: this.$route.query.redirect
        }
      })
      this.categoryChoose = false
    },
    pNodeClick (node) {
      console.log(node)
      this.info.subfamily = node.name
      this.subfamilyChoose = false
    },
    beforeSend (newFile) {
      newFile.data.id = this.saveId
      newFile.data.coverName = this.coverName
    },
    removeCover (file) {
      this.$refs.upload.remove(file)
    },
    async removeCoverFromDBandServer (file) {
      const delAction = window.confirm('确定要删除这条已上传资源么？')
      if (delAction) {
        await this.delSource(file)
        const list = this.editFiles.filter(value => {
          return value.id !== file.id
        })
        this.editFiles = list
      }
    },
    ...mapActions([
      'addSpiderData',
      'getDetial',
      'delSource'
    ])
  }
}
</script>
<style lang="scss" scoped>
@import '../style/common';
.charts{
  width: 270px;
  height: 220px;
  // margin:0 auto;
}
.chartBar{
  display: flex;
  align-items: center;
  span:first-child{
    background: #d1cbee;
    display: inline-block;
    width: 100px;
    text-align: right;
    margin: 6px 0;
  }
}

    .uploadCover{
      display: flex;
      padding: 6px;
      margin: 0;
      li{
        width: 120px;
        height: 120px;
        border:1px solid #d7c985;
        margin-left: 8px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: linear-gradient(45deg, #e7e7e7 25%, #fff 0, #fff 50%, #e7e7e7 0, #e7e7e7 75%, #fff 0);
        background-size: 30px 30px;
        .chooseCoverForm{
          z-index: 1;
          position: absolute;
          top: 0;
          background: rgba(0,0,0,.5);
          color: #fff;
        }
        img{
          width: 100%;
          position: absolute;
          display: block;
          z-index: 0;
        }
        .deleteCover{
          background: #ffc5c5;
          position: absolute;
          padding: 0 4px;
          right: 0;
          bottom: 0;
        }
      }
    }
    .uploadArea{
      width: 100%;
      height: 116px;
      background: #e9ffe9;
      border:1px dashed #87b687;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26PX;
    }

</style>

