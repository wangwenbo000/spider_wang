<template>
<div class="tagWapper">
  <div class="title">{{$t('message.category')}}</div>
    <ul class="tags">
      <router-link :to="{
                    name: 'CateList',
                    params:{list: list.name, index: index}
                    }"
                   active-class="active"
                   tag="li"
                   v-for="(list, index) in spiderList"
                   :key="list.id">
        <div>
          {{list.name}}
        </div>
        <animate-number from="1"
                        :to="list.children.length"
                        duration="1000"
                        easing="easeOutQuad"
        ></animate-number>
      </router-link>
  </ul>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      spiderList: state => state.spider.list
    })
  }
}
</script>
<style lang="scss">
  .tagWapper{
    width: 1080px;
    margin: 80px auto 0 auto;
    position: relative;
    .title{
      color:#959EA8;
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
  .tags{
    .active{
      background: #fff;
      color:#735DEE;
    }
    li{
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      background: #363D4C;
      color: #959EA8;
      font-size: 14px;
      height: 30px;
      padding: 0 12px;
      margin-top: 6px;
      margin-right: 6px;
      transition: all .3s;
      cursor: pointer;
      &:hover{
        background: #fff;
        color:#735DEE;
      }
      &:active{
        background: darken(#735DEE, 10%);
      }
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 0 10px;
        height: 30px;
        margin-left: 10px;
        border-left: 1px solid #2D3239;
      }
    }
  }
</style>


