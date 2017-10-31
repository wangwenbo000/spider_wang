<template>
<ASCom>
  <h2>出售列表更新</h2>
  <p class="list" v-html="list.content"></p>
</ASCom>
</template>
<script>
import ASCom from '@/components/ASCom'
export default {
  name: 'Store',
  components: {
    ASCom
  },
  data () {
    return {
      list: {}
    }
  },
  async created () {
    const list = await this.$axios({
      url: this.$api.store,
      method: 'post'
    })
    console.log(list)
    this.list = list.data.data
  }
}
</script>
<style lang='scss' scoped>
.list{
  font-size: 14px;
}
</style>
