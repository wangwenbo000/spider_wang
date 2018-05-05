<template>
<div class="editor-plugin" style="font-weight:normal;">
  <div class="editorTitle">
    🖋 请撰写描述:
    <span v-show="editWaitSign"><strong>🕕 文章加载中,请勿刷新页面... 两秒没反应请刷新</strong></span>
  </div>
  <script :id="editorName" style="color:#2b2b2b;" name="content" type="text/plain" ></script>
</div>
</template>
<script>
export default {
  props: {
    editorName: {
      type: String,
      default: 'editor'
    },
    context: {
      type: String,
      default: 'editor'
    },
    config: {
      type: Object,
      default: () => {
        return {
          initialFrameWidth: 776,
          initialFrameHeight: 1220,
          topOffset: 50
        }
      }
    },
    timer: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      editWaitSign: true
    }
  },
  mounted () {
    console.log('asss')
    this.$nextTick(() => {
      this.editor = UE.getEditor(this.editorName, this.config)
      setTimeout(() => {
        this.editor.setContent(this.context)
        this.editWaitSign = false
      }, 800)
    })
  },
  methods: {
    setEditorContent () {
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
<style lang="scss" scoped>
// 编辑器标题
.editorTitle{
  height: 30px;
  background: #e1f2ff;
  line-height: 30px;
  text-indent: 10px;
  span{
    padding: 4px;
    background: #ebd8be;
    border-radius: 4px;
    border: 1px solid darken(#ebd8be,10%);
    color: darken(#ebbed6,40%);
    margin-left: 20px;
  }
}
</style>


