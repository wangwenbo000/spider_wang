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
h2{
  margin: 0 0 30px 0;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 4px;
}
.list{
  font-size: 14px;
}
</style>
