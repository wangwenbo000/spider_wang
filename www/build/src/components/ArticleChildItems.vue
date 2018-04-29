<template>
<div>
<ul class="listItem">
  <li v-for="list in list.data" :key="list.id">
    <img :src="$conf.qnUrl+list.cover+'?imageView2/1/w/200/h/120'" alt="">
    <div class="content">
      <router-link tag="a"
                  :to="{
                    name:'Articlecontent',
                    params:{id:list.id}
                    }">
                      {{list.titleCn.substring(0,24)+(list.titleCn.length>24?'...':'')}}
                      </router-link>
      <span>{{list.describeCn}}</span>
      <time>🕐 {{list.date}}</time>
    </div>
  </li>
</ul>
<div class="empty" v-if="!list.count">
  {{$t('message.empty')}}
</div>
<zpagenav :page="list.currentPage"
          :page-size="list.pagesize"
          :total="list.count"
          :max-link="5"
          :page-handler="pageHandler"
          :create-url="createUrl"></zpagenav>

<transition name="fadeIn" mode="out-in">
  <router-view></router-view>
</transition>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  watch: {
    '$route.params': async function (o) {
      await this.getArticleChildList()
    }
  },
  async created () {
    await this.getArticleChildList()
  },
  computed: {
    list () {
      return this.$store.state.article.articleChildList
    }
  },
  methods: {
    ...mapActions([
      'getArticleChildList'
    ]),
    pageHandler (page) {
      this.$router.push({
        name: 'ArticleChildItems',
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
</style>

