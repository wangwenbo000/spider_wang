<template>
  <div>
    <ul class="cateList">
      <li v-for="list in filterList.data"
          :key="list.id">
        <router-link tag="a"
                     :to="{name:'Detial',params:{id:list.id}}">
          <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/204/h/170'"></img>
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
    <transition name="fadeIn">
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
  .empty{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    color:#735DEE;
  }
  .cateList {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 204px;
      height: 240px;
      background: #fff;
      display: flex;
      flex-direction: column;
      margin-right: 7px;
      margin-top: 7px;
      &:nth-child(5n+0) {
        margin-right: 0;
      }
      a{
        display: block;
        img {
          display: block;
          width: 100%;
          height: 170px;
        }
        .titleLink{
          font-size: 16px;
          margin: 10px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #735DEE;
        }
      }
      span {
        font-size: 12px;
        color: #9ea6b7;
        display: block;
        margin: 0 10px;
      }
    }
  }
</style>
