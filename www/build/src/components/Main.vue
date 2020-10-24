<template>
  <div class="hello">
    <Tags></Tags>
    <div class="panel">
    <transition name="fadeIn" mode="out-in">

      <router-view>
      </router-view>

    </transition>
    </div>
    <!-- <Articles></Articles> -->
  </div>
</template>

<script>
import Tags from '@/components/Tags'
import Articles from '@/components/Articles'

import {
  mapActions,
  mapMutations,
  mapState } from 'vuex'
export default {
  name: 'main-frame',
  components: {
    Tags,
    Articles

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
