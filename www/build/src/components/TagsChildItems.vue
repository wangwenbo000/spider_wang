<template>
  <div>
    <ul class="panel-items">
      <li v-for="list in filterList.data"
          :key="list.id">
        <router-link tag="a"
                     :to="{name:'Detial',params:{id:list.uuid}}">
          <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/204/h/170'"/>
          <span class="isTao" v-if="list.scalePlatform===0">
            <i class="iconfont">&#xe709;</i>
          </span>
          <a href="#" class="titleLink">{{$i18n.locale === 'cn'?list.cnName:list.enName}}</a>
        </router-link>
        <span>{{$i18n.locale === 'cn'?list.enName:list.cnName}}</span>
      </li>
    </ul>
    <div class="empty" v-if="!filterList.count">
      {{$t('message.empty')}}
    </div>
    <zpagenav :page="filterList.currentPage"
      :page-size="filterList.pagesize"
      :total="filterList.count"
      :max-link="5"
      :create-url="createUrl"
      :page-handler="pageHandler">
      </zpagenav>
    <transition name="fadeIn" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'category',
  data () {
    return {
      detialList: []
    }
  },
  watch: {
    '$route.params': async function (o) {
      const list = await this.getFilterList()
      this.changeFilter(list)
    }
  },
  async created () {
    const list = await this.getFilterList()
    this.changeFilter(list)
  },
  computed: {
    ...mapGetters([
      'filterCate'
    ]),
    filterList () {
      return this.$store.state.spider.filterList
    }
  },
  methods: {
    ...mapActions([
      'getFilterList'
    ]),
    ...mapMutations([
      'changeFilter'
    ]),
    pageHandler (page) {
      this.$router.push({
        name: 'Filter',
        params: {
          page: page
        }
      })
      this.$scrollTo('body', 1000, { offset: 20 })
    },
    createUrl (unit) {
      return ''
    }
  }
}
</script>
<style lang='scss' scoped>
@import './style/panel';
</style>
