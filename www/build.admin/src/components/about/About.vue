<template>
<div class="about">
<div class="success" v-show="showSuccess">
  ✅ 更新成功~
</div>
<input type="text" v-model="about.name" placeholder="你的名字">
<span>中文介绍</span>
<div id="aboutEditorCn" style="width:100%;"></div>
<span>英文介绍</span>
<div id="aboutEditorEn" style="width:100%;"></div>
<button @click="save">保存修改</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      showSuccess: false,
      about: {
        name: '',
        contentCn: '',
        contentEn: ''
      }
    }
  },
  async created () {
    const about = await this.$axios({
      url: this.$api.about,
      method: 'post'
    })
    this.about = about.data.data
    console.log(about)
  },
  watch: {
    'about': function (o) {
      this.editorCn.txt.html(o.contentCn)
      this.editorEn.txt.html(o.contentEn)
    }
  },
  methods: {
    async save () {
      const save = await this.$axios({
        url: this.$api.saveAbout,
        method: 'post',
        data: this.about
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
  },
  mounted () {
    var E = window.wangEditor
    this.editorCn = new E('#aboutEditorCn')
    this.editorEn = new E('#aboutEditorEn')
    this.editorCn.customConfig.onchange = (html) => {
      this.about.contentCn = html
    }
    this.editorEn.customConfig.onchange = (html) => {
      this.about.contentEn = html
    }
    this.editorCn.create()
    this.editorEn.create()
  }
}
</script>
<style lang="scss" scoped>
.about{
  padding:10px;
  flex-grow: 1;
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
    margin-bottom: 10px;
  }
  span{
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  input{
    width:100%;
    box-sizing: border-box;
  }
  button{
    float: right;
    margin-top: 10px;
    background: #00ff00;
  }
}
</style>


