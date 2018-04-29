<template>
  <div class="panel articlelist">
    <h2>🕷 {{$t('message.searchResMsg',{num:SearchRes.obj.count,keyword:$route.params.key})}}</h2>
      <router-link tag="a" :to="{name:'Main'}" class="iconfont close">
        &#xe655;
      </router-link>
    <div v-if="SearchRes.type==='spider'">
      <ul class="panel-items">
        <li v-for="list in SearchRes.obj.data"
            :key="list.id">
          <router-link tag="a"
                      :to="{name:'searchZzDetial',params:{id:list.uuid}}">
            <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/204/h/170'"/>
            <span class="isTao" v-if="list.scalePlatform===0">
              <i class="iconfont">&#xe709;</i>
            </span>
            <a href="#" class="titleLink">{{$i18n.locale === 'cn'?list.cnName:list.enName}}</a>
          </router-link>
          <span>{{$i18n.locale === 'cn'?list.enName:list.cnName}}</span>
        </li>
      </ul>
    </div>
    <div v-if="SearchRes.type==='article'">
      <ul class="listItem">
        <li v-for="list in SearchRes.obj.data" :key="list.id">
        <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/200/h/120'" alt="">
        <div class="content">
            <router-link tag="a"
                  :to="{
                    name:'searchArticlecontent',
                    params:{id:list.id}
                    }">
                      {{list.titleCn.substring(0,24)+(list.titleCn.length>24?'...':'')}}
                      </router-link>
          <span>{{list.describeCn}}</span>
          <time>{{list.date}}</time>
        </div>
        </li>
      </ul>
    </div>
    <transition name="fadeIn" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="empty" v-if="!SearchRes.obj.count">
      {{$t('message.empty')}}
    </div>
    <zpagenav :page="SearchRes.obj.currentPage"
          v-if="SearchRes.obj.count"
          :page-size="SearchRes.obj.pagesize"
          :total="SearchRes.obj.count"
          :max-link="5"
          :page-handler="pageHandler"
          :create-url="createUrl"></zpagenav>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  async created () {
    await this.search()
  },
  watch: {
    '$route.params': async function () {
      await this.search()
    }
  },
  computed: {
    SearchRes () {
      return this.$store.state.search.SearchRes
    }
  },
  methods: {
    ...mapActions([
      'search'
    ]),
    pageHandler (page) {
      this.$router.push({
        name: 'searchRes',
        params: {
          page: page
        }
      })
    },
    createUrl (unit) {
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style/a-panel';
@import './style/panel';
.panel{
  h2{
    text-align: center;
    margin: 0 0 10px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #D6D6D6;
    font-size: 32px;
  }
  .close{
    font-size: 32px;
    position: absolute;
    right: 10px;
    top: 20px;
    color: #D6D6D6;
  }
}
</style>

