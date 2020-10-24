<template>
<div class="tagWapper">
  <!-- <div class="title">{{$t('message.category')}}</div> -->
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
        <!-- <span>{{list.children.length}}</span> -->
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
    // width: 920px;
    margin: 20px auto 0 auto;
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
      color:#1f232e;
      font-weight: bold;
    }
    li{
      width: 135px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #363D4C;
      color: #959EA8;
      border-radius: 6px;
      font-size: 14px;
      height: 30px;
      padding: 4px 14px;
      margin: 2px 2px 0 0;
      // transition: all .3s;
      background: linear-gradient(#252935 10%, #282c39 90%);
      border: 1px solid #1f232e;
      // text-shadow: 0 0 12px rgba(0,0,0,.6);
      cursor: pointer;
      &:nth-child(6n){
        margin-right: 0;
      }
      &:hover{
        // background: linear-gradient(#272a33 30%, #313950 90%);;
        // background: #262935;
        background: #fff;
        color: #1f232e;
        // color:#fff;
      }
      // &:active{
      //   background: darken(#735DEE, 10%);
      // }
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 0 0 0 16px;
        height: 38px;
        // margin-left: 16px;
        // border-left: 1px solid #1d2231;
        font-weight: bold;
        color: #535bfb;
        // font-size: 20px;
        font-family: 'Roboto';
      }
    }
  }
</style>


