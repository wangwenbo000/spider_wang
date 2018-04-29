<template>
<ASCom>
  <img :src="$conf.qnUrl+'wangshihan.jpg'" alt="" class="avatar">
  <h2>{{about.name}}</h2>
  <p v-html="about.contentCn" v-if="$i18n.locale==='cn'"></p>
  <p v-html="about.contentEn" v-if="$i18n.locale==='en'"></p>
</ASCom>
</template>
<script>
import ASCom from '@/components/ASCom'
export default {
  name: 'About',
  components: {
    ASCom
  },
  data () {
    return {
      about: {}
    }
  },
  async created () {
    const info = await this.$axios({
      url: this.$api.info,
      method: 'post'
    })
    this.about = info.data.data
  }
}
</script>
<style lang='scss' scoped>
.avatar{
  position: absolute;
  display: block;
  border: 4px solid #FFFFFF;
  width: 128px;
  height: 128px;
  border-radius: 4px;
  top: -14px;
  background: #7e7e7e;
}
h2{
  font-size: 32px;
  margin: 36px 0 0 160px;
}
p{
  font-size: 14px;
  letter-spacing: 0;
  line-height: 22px;
  margin-top: 40px;
  text-align:justify;
}
</style>
