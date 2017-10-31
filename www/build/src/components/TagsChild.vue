<template>
  <div class="category">
    <div class="titleBar">
      <h3 class="title">{{$route.params.list}}</h3>
      <i class="iconfont close">
        <router-link tag="a" :to="{name:'Main'}">
          &#xe6e9;
        </router-link>
      </i>
    </div>
    <ul class="cateBar">
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
    <transition name="fadeIn">
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
.category {
  width: 1048px;
  background: #F3F3F3;
  margin: 0 auto;
  padding: 16px;
  margin-top: 16px;
  .titleBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #D6D6D6;
    padding-bottom: 10px;
    .title {
      margin: 0;
      color: #735DEE;
    }
    .close {
      font-size: 22px;
    }
  }
  .cateBar {
    margin-top: 10px;
    display: flex;
    font-size: 14px;
    flex-wrap: wrap;
    border-bottom: 1px solid #D6D6D6;
    padding-bottom: 10px;
    .active{
      background: #D6D6D6;
      color:#735DEE;
    }
    li {
      margin-right: 6px;
      margin-top: 6px;
      border: 1px solid #D6D6D6;
      padding: 6px 12px;
      cursor: pointer;
      transition: all .3s;
      &:hover{
        background: #D6D6D6;
        color:#735DEE;
      }
    }
  }
  .cateList {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 204px;
      height: 240px;
      background: #fff;
      display: flex;
      flex-direction: column;
      margin-right: 7px;
      margin-top: 7px;
      &:nth-child(5n+0) {
        margin-right: 0;
      }
      a{
        display: block;
        img {
          display: block;
          width: 100%;
          height: 170px;
        }
        .titleLink{
          font-size: 16px;
          font-weight: 100;
          margin: 10px;
        }
      }
      span {
        font-size: 12px;
        color: #ddd;
        display: block;
        margin: 0 10px;
      }
    }
  }

}
</style>
