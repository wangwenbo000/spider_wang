<template>
<div class="spiderIndex">
<Category postUrl="apix/spider/getCateList"
          @nodeClick="nodeClick"
          :isFormCom="true"
          ></Category>
<router-view></router-view>
</div>
</template>
<script>
import Category from '@/components/Category'
export default {
  name: 'SpiderIndex',
  components: {
    Category
  },
  methods: {
    nodeClick (treeNode) {
      this.$router.push({
        name: 'List',
        params: {
          name: treeNode.name,
          id: treeNode.id,
          page: 1
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.spiderIndex{
  display: flex;
  flex-grow:1;
}
</style>

