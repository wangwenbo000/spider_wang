<template>
  <div class="article">
    <div class="title">{{$t('message.Article')}}</div>
    <ul class="article-cate">
      <router-link tag="li"
                   v-for="list in getArticleCateList"
                   :key="list.id"
                   :to="{name:'article',params:{list:list.name}}"
                   class="Arthropoda"
                   :style="{
                     background:'url('+$conf.qnUrl+$conf.articleFolder+list.cover+'.png)',
                     backgroundSize:'100%'
                    }">
                   <span v-show="$i18n.locale==='en'">{{list.name}}</span>
                   <span v-show="$i18n.locale==='cn'">{{list.cnName}}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import {
  mapActions,
  mapMutations,
  mapGetters } from 'vuex'
export default {
  async created () {
    const data = await this.getCateList()
    this.changeArticleList(data)
  },
  computed: {
    ...mapGetters([
      'getArticleCateList'
    ])
  },
  methods: {
    ...mapActions([
      'getCateList'
    ]),
    ...mapMutations([
      'changeArticleList'
    ])
  }
}
</script>
<style lang="scss">
.article{
  width: 920px;
  margin: 80px auto 40px auto;
  position: relative;
  .title{
    color:#959EA8;
    position: absolute;
    font-size: 24px;
    top: -40px;
    font-weight: bold;
  }
  .article-cate{
    display: flex;
    justify-content: space-between;
    li{
      width: 174px;
      height: 78px;
      border-radius: 4px;
      overflow: hidden;
      // margin-right: 8px;
      position: relative;
      cursor: pointer;
      border: 1px solid rgb(38, 30, 83);
      transition: all .3s;
      &:active{
        transform: scale(.96);
      }
      span{
        position: absolute;
        font-size: 12px;
        color: #fff;
        left: 6px;
        bottom: 6px;
        text-shadow: 1px 1px 0 #735DEE;
      }
    }
  }
}
</style>

