<template>
  <div>
    <div class="panel-title-bar">
      <h3 class="title">{{$route.params.list}}</h3>
      <router-link tag="i" :to="{name:'Main'}" class="iconfont close">
        &#xe655;
      </router-link>
    </div>
    <ul class="panel-child-tags">
      <router-link tag="li"
                   v-for="list in filterCate"
                   :key="list.id"
                   :class="$route.params.title === list.id&&'active'"
                   :to="{
                     name:'Filter',
                     params:{title:list.id, page:1}}">
        {{list.name}}
      </router-link>
    </ul>
    <transition name="fadeIn" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'category',
  data () {
    return {
      detialList: []
    }
  },
  computed: {
    ...mapGetters([
      'filterCate'
    ])
  }
}
</script>
<style lang='scss' scoped>
// @import './style/panel';
</style>
