<template>
  <div class="articlelist">
    <div class="list-title">
      <div class="list-title-left">
        <img :src="$conf.qnUrl+$conf.articleFolder+$route.params.list+'.png'"/>
        <h2>{{$route.params.list}}</h2>
      </div>
      <i class="iconfont close">
        <router-link tag="a" :to="{name:'Main'}">
          &#xe6e9;
        </router-link>
      </i>
    </div>
    <div class="list">
      <ul class="listBar">
        <router-link tag="li"
                     :to="{
                       name:'ArticleChildItems',
                       params:{title:list.id,page:1}
                       }"
                       :class="$route.params.title === list.id&&'active'"
                       v-for="list in getArticleCateChild"
                       :key="list.id">
                       {{list.name}}
        </router-link>
        <li v-if="!getArticleCateChild.length" class="empty">{{$t('message.empty')}}</li>
      </ul>
      <transition name="fadeIn">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'articlelist',
  computed: {
    ...mapGetters([
      'getArticleCateChild'
    ])
  }
}
</script>

<style lang="scss" scoped>
.empty{
  color:#735DEE;
  text-align: center;
  width: 100%;
}
.articlelist{
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(28, 31, 36, 0.72);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  overflow-y: scroll;
  .list-title{
    width: 1080px;
    margin: 180px auto 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color:#fff;
  }
  .list-title-left{
    width: 1080px;
    display: flex;
    align-items: center;
    color:#fff;
    img{
      display: block;
      width: 92px;
      margin-right: 20px;
    }
  }
  .close{
    font-size: 32px;
    a{
      color: #fff;
    }
  }
  .list{
    width: 1048px;
    padding: 0 16px 16px 16px;
    background: #EFEFEF;
    margin: 10px auto;
    .listBar{
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #D6D6D6;
      .active{
        color:#735DEE;
        background: #D6D6D6;
      }
      li{
        margin-right: 6px;
        margin-top: 6px;
        font-size: 14px;
        border: 1px solid #D6D6D6;
        padding: 6px 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
