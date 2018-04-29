<template>
  <div class="articlelist">
    <div class="list-title">
      <div class="list-title-left">
        <img :src="$conf.qnUrl+$conf.articleFolder+$route.params.list+'.png'"/>
        <h2>{{$route.params.list}}</h2>
      </div>
      <router-link tag="i" :to="{name:'Main'}" class="iconfont close">
        &#xe655;
      </router-link>
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
      <transition name="fadeIn" mode="out-in">
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
@import './style/a-panel';
</style>
