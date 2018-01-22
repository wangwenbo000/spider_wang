<template>
  <div class="share">
    <a @click.stop="weibo" target="_blank" class="weibo"><i class="iconfont">&#xe61c;</i></a>
    <a @click.stop="qqZone" class="qq">
    <i class="iconfont">&#xe673;</i></a>
    <a @click.stop="facebook" class="facebook"><i class="iconfont">&#xe66e;</i></a>
    <a @click.stop="twitter" class="twitter"><i class="iconfont">&#xec9c;</i></a>
  </div>
</template>
<script>
export default {
  props: {
    title: '',
    pic: ''
  },
  methods: {
    weibo () {
      window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(document.location.href) + '&title=' + this.title, 'sharer', 'toolbar=0,status=0,width=626,height=436') + '&title=' + this.title
      return false
    },
    qqZone () {
      window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(document.location.href) + '&title=' + encodeURIComponent(this.title), 'sharer', 'toolbar=0,status=0,width=626,height=436')
      return false
    },
    facebook () {
      const u = location.href
      window.open('http://www.facebook.com/sharer.php?src=bm&u=' + encodeURIComponent(u), 'sharer', 'toolbar=0,status=0,width=626,height=436')
      return false
    },
    twitter () {
      const u = location.href
      const t = this.title
      window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(u) + '&text=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436')
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.share{
  width: 36px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left:50%;
  margin-left: 420px;
  bottom: 20px;
  a{
    height: 36px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  .qq{
    background: #ffce00;
  }
  .weibo{
    background: #e6162d;
    font-size: 26px;
  }
  .facebook{
    background: #4867aa;
  }
  .twitter{
    background: #1ab2e8;
  }
}
</style>
