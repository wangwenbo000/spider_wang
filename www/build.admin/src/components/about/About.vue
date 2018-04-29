<template>
<div class="pageForm">
  <h1>关于页面内容编辑</h1>
  <div class="success" v-show="showSuccess">
  ✅ 更新成功~
</div>
  <div class="actionBar">
    <button class="global-btn gb-green" @click="save">发布记录</button>
  </div>
  <table>
    <tr>
      <td>
        <input type="text" v-model="about.name" placeholder="你的名字">
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top;padding:0;background:#f1f1f1;">
        <ul class="tabBar">
          <li @click="showEditor=0" :class="showEditor===0&&'tab-active'">中文内容撰写</li>
          <li @click="showEditor=1" :class="showEditor===1&&'tab-active'">英文内容撰写</li>
        </ul>
        <Editor :context="about.contentCn" editor-name="spider-cn-html" ref="Editor" v-show="showEditor===0"></Editor>
        <Editor :context="about.contentEn" editor-name="spider-en-html" ref="Editore" v-show="showEditor===1"></Editor>
      </td>
    </tr>
  </table>
<!-- <button @click="save">保存修改</button> -->
</div>
</template>
<script>
import Editor from '@/components/plugin/Editor'
export default {
  data () {
    return {
      showSuccess: false,
      showEditor: 0,
      about: {
        name: '',
        contentCn: '',
        contentEn: ''
      }
    }
  },
  components: {
    Editor
  },
  async created () {
    const about = await this.$axios({
      url: this.$api.about,
      method: 'post'
    })
    this.about = about.data.data
  },
  watch: {
    'about': function (o) {
      this.editorCn.txt.html(o.contentCn)
      this.editorEn.txt.html(o.contentEn)
    }
  },
  methods: {
    async save () {
      this.about.contentCn = this.$refs.Editor.setEditorContent()
      this.about.contentEn = this.$refs.Editore.setEditorContent()
      await this.$axios({
        url: this.$api.saveAbout,
        method: 'post',
        data: this.about
      })
      this.showSuccessMsg()
    },
    showSuccessMsg () {
      this.showSuccess = true
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.showSuccess = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/common';
</style>


