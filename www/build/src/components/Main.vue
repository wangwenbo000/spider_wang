<template>
  <div class="hello">
    <Search></Search>
    <Tags></Tags>
    <transition name="fadeIn">
      <router-view>
      </router-view>
    </transition>
    <Articles></Articles>
  </div>
</template>

<script>
import Tags from '@/components/Tags'
import Articles from '@/components/Articles'
import Search from '@/components/Search'
import {
  mapActions,
  mapMutations,
  mapState } from 'vuex'
export default {
  name: 'main',
  components: {
    Tags,
    Articles,
    Search
  },
  computed: {
    ...mapState({
      spiderList: state => state.spider.list
    })
  },
  async created () {
    const data = await this.getSpiderList()
    this.changeList(data)
  },
  methods: {
    ...mapActions({
      getSpiderList: 'getList'
    }),
    ...mapMutations([
      'changeList'
    ])
  }
}
</script>

<style scoped>

</style>
