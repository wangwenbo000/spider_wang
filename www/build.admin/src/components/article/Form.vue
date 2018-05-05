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
    <tr height="20">
      <td width="60">文章标题:</td>
      <td><input autofocus type="text" name="titleCn" v-model="info.titleCn" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('titleCn') }">
      <span v-show="errors.has('titleCn')" class="help is-danger">⚠️ {{ errors.first('titleCn') }}</span>
      </td>
      <td colspan="2" rowspan="8" style="vertical-align:top;padding:0;">
        <ul class="tabBar">
          <li @click="showEditor=0" :class="showEditor===0&&'tab-active'">中文内容撰写</li>
          <li @click="showEditor=1" :class="showEditor===1&&'tab-active'">英文内容撰写</li>
        </ul>
        <Editor :context="info.contentCn" editor-name="spider-cn-html" ref="Editor" v-show="showEditor===0"></Editor>
        <Editor :context="info.contentEn" editor-name="spider-en-html" ref="Editore" v-show="showEditor===1"></Editor>
      </td>
    </tr>
    <tr height="20">
      <td>英文标题:</td>
      <td><input type="text" name="titleEn" v-model="info.titleEn" v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('titleEn') }">
      <span v-show="errors.has('titleEn')" class="help is-danger">⚠️ {{ errors.first('titleEn') }}</span></td>
    </tr>
    <tr height="60">
      <td>中文描述</td>
      <td>
        <textarea rows="6" name="describeCn" placeholder="中文描述" v-model="info.describeCn"  v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('describeCn') }">
        </textarea>
        <span v-show="errors.has('describeCn')" class="help is-danger">⚠️ {{ errors.first('describeCn') }}</span>
      </td>
    </tr>

    <tr height="60">
      <td>英文描述</td>
      <td >
        <textarea rows="6" name="describeEn" placeholder="中文描述" v-model="info.describeEn"  v-validate="'required|min:2'" :class="{'input': true,'is-danger': errors.has('describeEn') }">
        </textarea>
        <span v-show="errors.has('describeEn')" class="help is-danger">⚠️ {{ errors.first('describeEn') }}</span>
      </td>
    </tr>

    <tr height="20">
      <td align="right">
        文章分类:
      </td>
      <td style="position:relative;" >
        <input type="text" @focus="categoryChoose=true" :value="categoryName" style="background:#fffdee;border: 1px solid #d7c985;">
        <div class="category-choose" v-show="categoryChoose">
          <div class="close" @click="categoryChoose=false">❌</div>
          <Category postUrl="apix/article/getCateList" :name="'categoryChoose'" @nodeClick="nodeClick" :isFormCom="true"></Category>
        </div>
      </td>
    </tr>
    <tr height="20">
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
    </tr>
    <tr height="20">
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
    <!-- <tr>
      <td colspan="4" style="background:#efefef;padding:0;">
        <div class="editorTitle">中文详情描述: <span v-show="editWaitSign" style="color:#ff0000;background:yellow;"><strong>🕕 文章加载中,请勿刷新页面... 两秒没反应请刷新</strong></span></div>
        <script id="contentCn" style="color:#2b2b2b;" name="content" type="text/plain"></script>
      </td>
    </tr> -->
    <tr>
      <!-- <td colspan="4" style="background:#fff;padding:0;">
        <div class="editorTitle">英文详情描述:</div>
        <div id="contentEn" style="color:#2b2b2b;"></div>
      </td> -->
      <td colspan="2"></td>
    </tr>
  </table>
  </form>
</div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import Category from '@/components/Category'
import Editor from '@/components/plugin/Editor'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      showEditor: 0,
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
    Category,
    Editor
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
  mounted () {
    this.info.category = parseInt(this.$route.query.cate)
    this.categoryName = this.$route.query.name
  },
  watch: {
    '$route.query': function (o) {
      this.info.category = o.cate
      this.categoryName = o.name
    }
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
    async saveDraft () {
      const action = this.$route.query.action
      this.info.contentCn = this.$refs.Editor.setEditorContent()
      this.info.contentEn = this.$refs.Editore.setEditorContent()
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
        // this.setEditorContent()
        this.info.status = 1
        this.info.contentCn = this.$refs.Editor.setEditorContent()
        this.info.contentEn = this.$refs.Editore.setEditorContent()
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
@import '../style/common';
    .stopUpload{
      width: 100%;
      height: 140px;
      display:flex;
      justify-content: center;
      align-items: center;
      color: #ff0000;
      font-weight: bold;
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
</style>
