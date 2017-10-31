<template>
<div class="scale">
  <div class="success" v-show="showSuccess">
  ✅ 更新成功~
  </div>
  <div id="editorToolBar" style="width:100%;"></div>
  <div id="editorContent" class="text"></div>
  <button @click="save">保存设置</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      showSuccess: false,
      content: ''
    }
  },
  mounted () {
    var E = window.wangEditor
    this.editor = new E('#editorToolBar, #editorContent')
    this.editor.customConfig.onchange = (html) => {
      this.content.content = html
    }
    this.editor.create()
    const a = document.querySelector('.w-e-text-container')
    a.style.height = 800 + 'px'
  },
  watch: {
    'content': function (o) {
      this.editor.txt.html(o.content)
    }
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
      const save = await this.$axios({
        url: this.$api.saveScale,
        method: 'post',
        data: this.content
      })
      console.log(save)
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
.scale{
  flex-grow: 1;
  .text{
    min-height: 100px;
  }
  button{
    float: right;
    margin-top: 10px;
    background: #00ff00;
  }
  .empty, .success{
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #fffdee;
    border: 1px solid #d7c985;
  }
  .success{
    background: #ebffeb;
    border: 1px solid #78de9b;
  }
}
</style>


