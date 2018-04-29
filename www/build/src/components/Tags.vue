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
          🔸 {{list.name}}
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
    width: 920px;
    margin: 60px auto 0 auto;
    position: relative;
    .title{
      color:#959EA8;
      font-size: 24px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
  .tags{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .active{
      background: #fff;
      color:#735DEE;
    }
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #363D4C;
      color: #959EA8;
      border-radius: 4px;
      font-size: 16px;
      height: 30px;
      padding: 4px 14px;
      margin: 8px 8px 0 0;
      // transition: all .3s;
      background: linear-gradient(#313950 30%, #272a33 90%);
      border: 1px solid #131a2e;
      text-shadow: 0 0 12px rgba(0,0,0,.6);
      cursor: pointer;
      &:hover{
        background: linear-gradient(#272a33 30%, #313950 90%);;
        color:#735DEE;
      }
      &:active{
        background: darken(#735DEE, 10%);
      }
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 0 16px;
        height: 38px;
        margin-left: 16px;
        border-left: 1px solid #1d2231;
        font-weight: 500;
        color: #9988f9;
        font-size: 20px;
        font-family: 'Roboto';
      }
    }
  }
</style>


