<template>
  <div class="searchRes">
    <h2>🕷 {{$t('message.searchResMsg',{num:SearchRes.obj.count,keyword:$route.params.key})}}</h2>
    <i class="iconfont close">
      <router-link tag="a" :to="{name:'Main'}">
          &#xe6e9;
        </router-link>
      </i>
    <div v-if="SearchRes.type==='spider'">
      <ul class="cateList">
      <li v-for="list in SearchRes.obj.data"
          :key="list.id">
        <router-link tag="a"
                     :to="{name:'Detial',params:{id:list.id}}">
          <img :src="$conf.qnUrl+list.cover+'?imageView2/5/w/204/h/170'"></img>
          <a class="titleLink">{{list.enName}}</a>
        </router-link>
        <span>{{list.cnName}}</span>
      </li>
    </ul>
    </div>
    <div v-if="SearchRes.type==='article'">
      <ul class="listItem">
      <li v-for="list in SearchRes.obj.data" :key="list.id">
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
    </div>
    <div class="empty" v-if="!SearchRes.obj.count">
      {{$t('message.empty')}}
    </div>
    <zpagenav :page="SearchRes.obj.currentPage"
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
.empty{
  color:#735DEE;
  text-align: center;
  width: 100%;
}
  .searchRes{
    width: 1048px;
    position: relative;
    background: #F3F3F3;
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -540px;
    padding: 16px;
      .close{
    font-size: 32px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
    h2{
      text-align: center;
      margin: 0 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #D6D6D6;
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
          font-weight: 100;
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
  }
</style>

