<template>
<div class="contentWapper">
  <Share></Share>
  <div class="content">
    <div class="article-header">
      <h2>{{data.titleCn}}</h2>
      <time>{{data.date}}</time>
    </div>
    <router-link tag="a" :to="{name:'ArticleChildItems'}" class="close">
      <i class="iconfont">&#xe6e9;</i>
    </router-link>
    <div v-html="data.contentCn" class="a-content"></div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import Share from '@/components/Share'
export default {
  name: 'ArticleContent',
  async created () {
    await this.getArticleDetial()
  },
  components: {
    Share
  },
  computed: {
    data () {
      return this.$store.state.article.articleDetial
    }
  },
  methods: {
    ...mapActions([
      'getArticleDetial'
    ])
  }
}
</script>
<style lang="scss" scoped>
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 22px;
    color: #735DEE;
  }
  .contentWapper{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(28, 31, 36, 0.72);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 120;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: #262A33;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #735DEE;
    }
    .content{
      width: 800px;
      color: #424b68;
      background: #fff;
      position: absolute;
      left: 50%;
      margin-left: -380px;
      margin-bottom: 20px;
      top: 100px;
      z-index: 200;
      .article-header{
        height: 106px;
        position: relative;
        padding: 20px;
        border-bottom: 1px solid #e4e8f1;
        time{
          color:#9ea6b7;
        }
      }
      .a-content{
        padding: 20px;
        a{
          color: #735DEE;
        }
      }

    }
  }
</style>

