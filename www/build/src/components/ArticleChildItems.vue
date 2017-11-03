<template>
<div>
<ul class="listItem">
  <li v-for="list in list.data" :key="list.id">
    <img :src="$conf.qnUrl+list.cover+'?imageView2/5/w/200/h/120'" alt="">
    <div class="content">
      <h3>
        <router-link tag="a"
                     :to="{
                        name:'Articlecontent',
                        params:{id:list.id}
                       }">
                       {{list.titleCn}}
                       </router-link>
      </h3>
      <span>{{list.describeCn}}</span>
    </div>
    <time>{{list.date}}</time>
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

<transition name="fadeIn">
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
  .empty{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    color:#735DEE;
  }
.listItem{
  padding-top: 10px;
  .content{
    h3{
      margin: 0;
      a{
        color:#735DEE;
      }
    }
  }
  li{
    padding: 10px;
    height: 80px;
    background: #fff;
    display: flex;
    margin-top: 10px;
    position: relative;
    img{
      width: 140px;
      height: 80px;
      display: block;
      margin-right: 20px;
    }
    span{
      font-size: 12px;
      color: #666;
    }
    time{
      position: absolute;
      color: #9ea6b7;
      right: 10px;
      top: 10px;
    }
  }
}
</style>

