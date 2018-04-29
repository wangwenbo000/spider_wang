<template>
<div class="contentWapper">
  <Share></Share>
  <div class="content">
    <div class="article-header">
      <span class="header-cover" :style="{backgroundImage:'url('+$conf.qnUrl+data.cover+')'}"></span>
      <h2>{{data.titleCn}}</h2>
      <time>{{data.date}}</time>
    </div>
    <a href="javascript:;" @click.stop="back" class="iconfont close">&#xe655;</a>
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
    back () {
      this.$router.go(-1)
    },
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
    top: 20px;
    font-size: 32px;
    color: #fff;
    z-index: 2;
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
      width: 790px;
      color: #424b68;
      background: #fff;
      position: absolute;
      left: 50%;
      margin-left: -380px;
      margin-bottom: 20px;
      top: 40px;
      border-radius: 4px;
      z-index: 200;
      border:4px solid #735DEE;
      .article-header{
        position: relative;
        padding: 20px;
        border-bottom: 1px solid #e4e8f1;
        background: rgb(133, 115, 236);
        // border-top-left-radius: 4px;
        // border-top-right-radius: 4px;
        h2{
          margin: 0 0 10px 0;
          position: relative;
          color: #fff;
          z-index: 1;
        }
        time{
          position: relative;
          font-size: 12px;
          background: #c5b880;
          border: 1px solid #b5aa7a;
          border-radius: 4px;
          color:#fff;
          padding: 2px 10px;
        }
        .header-cover{
          position: absolute;
          z-index: 0;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: .2;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
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

