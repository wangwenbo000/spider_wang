<template>
<div class="spiderIndex">
<Category name="article"
          postUrl="apix/article/getCateList"
          :addNewId.sync="newId"
          @nodeClick="nodeClick"
          @onAdd="onAdd"
          @onAddP="onAddP"
          @onRename="onRename"
          @onRemove="onRemove"></Category>
<router-view></router-view>
</div>
</template>
<script>
import Category from '@/components/Category'
import { mapActions } from 'vuex'
export default {
  name: 'SpiderIndex',
  data () {
    return {
      newId: 0
    }
  },
  components: {
    Category
  },
  methods: {
    nodeClick (treeNode) {
      this.$router.push({
        name: 'AList',
        params: {
          name: treeNode.name,
          id: treeNode.id,
          page: 1
        }
      })
    },
    async onAddP (n) {
      const add = await this.addCate({
        name: n.name,
        pid: n.pid
      })
      console.log(add)
    },
    async onAdd (n) {
      const add = await this.addCate({
        name: '新增节点',
        pid: n.id
      })
      this.newId = add.data.data
    },
    async onRename (n) {
      await this.updateCate({
        name: n.treeNode.name,
        id: n.treeNode.id
      })
    },
    async onRemove (n) {
      await this.deleteCate(n.treeNode.id)
    },
    ...mapActions([
      'addCate',
      'updateCate',
      'deleteCate'
    ])
  }
}
</script>
<style lang="scss" scoped>
.spiderIndex{
  display: flex;
  flex-grow:1;
}
</style>

