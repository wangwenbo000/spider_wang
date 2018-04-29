<template>
<div class="pageForm">
  <div class="success" v-show="showSuccess">
  ✅ 更新成功~
  </div>
  <div class="actionBar">
    <button class="global-btn gb-green" @click="save">发布记录</button>
  </div>
  <table>
    <tr>
      <td>
        <Editor :context="content.content"
          editor-name="spider-en-html"
          ref="Editor"
          :config="{
            initialFrameWidth: '100%',
            initialFrameHeight: 820,
            topOffset: 51
          }"></Editor>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
import Editor from '@/components/plugin/Editor'
export default {
  data () {
    return {
      showSuccess: false,
      content: ''
    }
  },
  components: {
    Editor
  },
  async created () {
    const content = await this.$axios({
      url: this.$api.scale,
      method: 'post'
    })
    this.content = content.data.data
  },
  methods: {
    async save () {
      this.content.content = this.$refs.Editor.setEditorContent()
      await this.$axios({
        url: this.$api.saveScale,
        method: 'post',
        data: this.content
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


