<template>
<div class="articleForm">
  <form @submit.prevent="validateBeforeSubmit">
  <div class="actionBar">
    <button class="cancel" @click.stop="back">取消添加</button>
    <button class="draft" @click.stop="saveDraft">草稿箱</button>
    <button class="push" type="submit">发布记录</button>
  </div>
  <h1>{{$route.query.action === 'edit'?'编辑':'增加'}}记录
    <span v-show="info.status===0">🗂 已存草稿箱</span>
    <span v-show="info.status===1">✅ 已发布状态</span>
    <span v-show="info.status===2">❓未发布或存草稿箱新增状态</span>
  </h1>
  <table>
    <tr>
      <td>文章标题:</td>
      <td><input autofocus type="text" name="titleCn" v-model="info.titleCn" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('titleCn') }">
      <span v-show="errors.has('titleCn')" class="help is-danger">⚠️ {{ errors.first('titleCn') }}</span>
      </td>
      <td>英文标题:</td>
      <td><input type="text" name="titleEn" v-model="info.titleEn" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('titleEn') }">
      <span v-show="errors.has('titleEn')" class="help is-danger">⚠️ {{ errors.first('titleEn') }}</span></td>
    </tr>
    <tr>
      <td colspan="4">
        <textarea rows="3" name="describeCn" placeholder="中文描述" v-model="info.describeCn"  v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('describeCn') }">
        </textarea>
        <span v-show="errors.has('describeCn')" class="help is-danger">⚠️ {{ errors.first('describeCn') }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <textarea rows="3" name="describeEn" placeholder="中文描述" v-model="info.describeEn"  v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('describeEn') }">
        </textarea>
        <span v-show="errors.has('describeEn')" class="help is-danger">⚠️ {{ errors.first('describeEn') }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" align="right">
        文章分类:
      </td>
      <td colspan="4" style="position:relative;" >
        <input type="text" @focus="categoryChoose=true" :value="categoryName" style="background:#fffdee;border: 1px solid #d7c985;">
        <div class="category-choose" v-show="categoryChoose">
          <div class="close" @click="categoryChoose=false">❌</div>
          <Category postUrl="apix/article/getCateList" :name="'categoryChoose'" @nodeClick="nodeClick" :isFormCom="true"></Category>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 10px;">
        <div class="articleCover" v-for="(file, index) in imageList" :key="file.id">
          <img :src="$conf.qnUrl+file.key+'?imageView2/5/w/180/h/120'" width="180" height="120"/>
          <div class="articleCoverInfo">
            <div>✅ 已上传</div>
            <button @click="removeCoverFromDbAndServer(file)">❌ 删除资源</button>
          </div>
        </div>
        <div class="articleCover" v-for="(file, index) in upload.files" :key="file.id">
          <img :src="file.blob" width="180" height="120" />
          <div class="articleCoverInfo">
            <div>文件大小：{{file.size | formatSize}}</div>
            <div>{{file.response==='OK'?'✅ 已上传':'🙋 待上传'}}</div>
            <div>上传进度：{{file.speed | formatSize}}</div>
            <button @click="removeCover(file)">❌ 删除资源</button>
          </div>
        </div>
      </td>
      <td colspan="2" style="padding:0;position:relative;">
        <div class="stopUpload" v-if="imageList.length===1">
          只允许上传一张封面，上传新封面请删除当前封面后操作
        </div>
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
                    v-show="imageList.length===0"
                    ref="upload">
                    <strong>👉 点击或者拖拽图片到此处上传</strong>
                    <br>
                    ⚠️ 上传限1张
                    <br>
                    <span style="color:blue;"> 为了保证用户体验，请不要上传过大的图片，每张图片请保持在2M以内</span>
                    </FileUpload>
      </td>
    </tr>
    <tr>
      <td colspan="4" style="background:#efefef;padding:0;">
        <div class="editorTitle">中文详情描述: <span v-show="editWaitSign" style="color:#ff0000;background:yellow;"><strong>🕕 文章加载中,请勿刷新页面... 两秒没反应请刷新</strong></span></div>
        <script id="contentCn" style="color:#2b2b2b;" name="content" type="text/plain"></script>
      </td>
    </tr>
    <tr>
      <td colspan="4" style="background:#fff;padding:0;">
        <div class="editorTitle">英文详情描述:</div>
        <div id="contentEn" style="color:#2b2b2b;"></div>
      </td>
    </tr>
  </table>
  </form>
</div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import Category from '@/components/Category'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      categoryChoose: false,
      categoryName: '',
      editFiles: [],
      saveId: null,
      editWaitSign: false,
      info: {
        titleCn: '',
        titleEn: '',
        category: null,
        contentCn: '',
        contentEn: '',
        describeCn: '',
        describeEn: '',
        status: 2
      },
      upload: {
        files: [],
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        size: 1024 * 1024 * 10,
        extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
        multiple: false,
        drop: true,
        thread: 1,
        name: 'file',
        postAction: '/apix/upload/uploadArticle',
        data: {
          'id': null
        },
        auto: false
      }
    }
  },
  components: {
    FileUpload,
    Category
  },
  async created () {
    if (this.$route.query.action === 'edit') {
      await this.getArticleDetial()
      this.info = { ...this.$store.state.Article.detial }
    }
  },
  computed: {
    imageList () {
      return this.$store.state.Article.image
    }
  },
  destroyed () {
    console.log('a')
    this.editor.destroy()
  },
  mounted () {
    // var E = window.wangEditor
    // this.editorCn = new E('#contentCn')
    // this.editorEn = new E('#contentEn')
    // this.editorCn.customConfig.pasteFilterStyle = false
    // this.editorEn.customConfig.pasteFilterStyle = false
    // this.editorCn.customConfig.onchange = (html) => {
    //   this.info.contentCn = html
    // }
    // this.editorEn.customConfig.onchange = (html) => {
    //   this.info.contentEn = html
    // }
    // this.editorCn.create()
    // this.editorEn.create()
    this.editor = UE.getEditor('contentCn', {
      // autoHeightEnabled: true,
      // autoFloatEnabled: true,
      initialFrameWidth: 776,
      topOffset: 51
      // initialFrameHeight: 500
    })
    this.editor.addListener('ready', () => {
      this.editor.setContent(this.info.contentCn)
      if (this.info.contentCn === '') {
        this.editWaitSign = true
        setTimeout(() => {
          this.editor.setContent(this.info.contentCn)
          this.editWaitSign = false
        }, 2000)
      }
    })
    this.info.category = parseInt(this.$route.query.cate)
    this.categoryName = this.$route.query.name
  },
  watch: {
    '$route.query': function (o) {
      this.info.category = o.cate
      this.categoryName = o.name
    }
    // 'info': function (o) {
    //   this.editor.addListener('ready', () => {
    //     this.editor.setContent(o.contentCn)
    //   })
    // }
  },
  methods: {
    ...mapActions([
      'addArticle',
      'getArticleDetial',
      'delSourceFromDbAndServer'
    ]),
    back () {
      this.$router.replace({
        path: this.$route.query.redirect
      })
    },
    setEditorContent () {
      this.info.contentCn = this.editor.getContent()
    },
    async saveDraft () {
      const action = this.$route.query.action
      this.setEditorContent()
      this.info.status = 0
      const add = await this.addArticle({
        data: this.info,
        action: action
      })
      this.saveId = action === 'add' ? add.data.data : this.$route.query.id
      // 开始上传文件
      this.$refs.upload.active = true
      this.isNewFile()
    },
    async validateBeforeSubmit () {
      const result = await this.$validator.validateAll()
      const action = this.$route.query.action
      if (result) {
        this.setEditorContent()
        this.info.status = 1
        const add = await this.addArticle({
          data: this.info,
          action: action
        })
        this.saveId = action === 'add' ? add.data.data : this.$route.query.id
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
    removeCover (file) {
      this.$refs.upload.remove(file)
    },
    beforeSend (newFile) {
      newFile.data.id = this.saveId
    },
    async removeCoverFromDbAndServer (file) {
      const delAction = window.confirm('确定要删除云端资源么？')
      if (delAction) {
        await this.delSourceFromDbAndServer(file)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.articleForm{
  padding: 10px;
  flex-grow: 1;
  overflow-y: scroll;
  clear: both;
  h1{
    margin: 0 0 10px 0;
    span{
      font-size: 12px;
      background: #fffdee;
      border:1px solid #000;
      padding: 2px 4px;
    }
  }
  textarea,
  input[type=text]{
    width: 100%;
    box-sizing: border-box;
  }
  table{
    margin-bottom: 50px;
    tr{
      td{
        &:nth-child(2n-1){
          width: 80px;
          color: blue;
        }
      }
    }
    .stopUpload{
      width: 100%;
      height: 140px;
      display:flex;
      justify-content: center;
      align-items: center;
      color: #ff0000;
      font-weight: bold;
    }
    .category-choose{
      height: 500px;
      background: #fffdee;
      position: absolute;
      z-index: 100000;
      border:1px solid #000;
      .close{
        position: absolute;
        z-index: 100001;
        background:#ffb8b8;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 30px;
      }
    }
    .editorTitle{
      height: 30px;
      background: #e7e7e7;
      line-height: 30px;
      text-indent: 10px;
    }
    .articleCover{
      width: 180px;
      height: 120px;
      background: #ebffeb;
      border: 1px solid #78de9b;
      position: relative;
      float: left;
      .articleCoverInfo{
        width: 130px;
        height: 120px;
        float: left;
        position: absolute;
        top: 0;
        right: -140px;
        display: inline-flex;
        flex-direction: column;
        div{
          background: #ccc;
          padding: 2px 2px;
          margin: 2px 0;
        }
      }
    }

  }
}
.actionBar{
  height: 50px;
  background: #e1f2ff;
  position: fixed;
  bottom:0;
  right: 0;
  left: 302px;
  z-index: 100000;
  border-top: 1px solid #9bd6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    margin: 0 10px;
  }
  .cancel{
    background: #ffdddd;
  }
  .draft{
    background: yellow;
  }
  .push{
    background: #00ff00;
  }
}
</style>
