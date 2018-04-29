<template>
<div class="listIndex">
  <Category postUrl="apix/spider/getCateList"
          @nodeClick="nodeClick"
          :isExpandAllNodes="true"
          :isFormCom="true"
          ></Category>
<div class="list">

  <div class="list-titleBar">
    <h2>{{$route.params.name}} Data List <span>🗂 为草稿箱文件，前台页面不显示</span></h2>
    <router-link tag="button" class="global-btn gb-green" :to="{name:'Form',query:{action:'add',cate:$route.params.id,name:$route.params.name,redirect:$route.path}}">＋ 增加新数据</router-link>
  </div>
<div class="success" v-show="showSuccess">
  ✅ 删除成功~
</div>
<table border="1" width="100%">
  <tr>
    <th>ID</th>
    <th>COVER</th>
    <th>enName</th>
    <th>cnName</th>
    <th>是否售卖</th>
    <th>Date</th>
    <th>操作</th>
  </tr>
  <tr v-for="list in dataList.data" :key="list.id" :style="{background:list.status?'':'#ffd9a0'}">
    <td align="center">{{list.status===0?'🗂':list.id}}</td>
    <td width="40">
      <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/50/h/50'" width="40">
    </td>
    <td>
      <router-link tag="a"
                   :to="{
                     name:'Form',
                     query:{
                       action:'edit',
                       cate:$route.params.id,
                       id:list.id,
                       name:$route.params.name,
                       redirect:$route.path
                       }}" class="list-title-link">
                       <strong>{{list.enName}}{{list.status===0?' (草稿)':''}}</strong>
                       </router-link>
                       <br>
        <span style="color:#999;">{{list.uuid}}</span>
      </td>
    <td>{{list.cnName}}</td>
    <td align="center">
      {{list.isScale?'✅':'❌'}}
    </td>
    <td>{{list.date}}</td>
    <td align="center">
      <router-link tag="a"
      class="global-btn gb-yellow"
                   :to="{
                     name:'Form',
                     query:{
                       action:'edit',
                       cate:$route.params.id,
                       id:list.id,
                       name:$route.params.name,
                       redirect:$route.path
                       }}">
                       ✏️ Edit
                       </router-link>
      <a href="javascript:;" @click.stop="deleteItem(list.id)" class="global-btn gb-red">🗑 Delete</a>
    </td>
  </tr>
</table>
<div class="empty" v-show="dataList.count === 0">
  ⚠️ 暂时没有数据！
</div>
<zpagenav :page="dataList.currentPage"
          :page-size="dataList.pagesize"
          :total="dataList.count"
          :max-link="5"
          :page-handler="pageHandler"
          :create-url="createUrl"></zpagenav>
</div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import Category from '@/components/Category'
export default {
  name: 'SpiderList',
  components: {
    Category
  },
  data () {
    return {
      showSuccess: false
    }
  },
  async created () {
    await this.getChildList()
  },
  computed: {
    dataList () {
      return this.$store.state.Spider.childList
    }
  },
  watch: {
    '$route.params': async function () {
      await this.getChildList()
    }
  },
  methods: {
    ...mapActions([
      'getChildList',
      'deleteItem'
    ]),
    pageHandler (page) {
      this.$router.push({
        name: 'List',
        params: {
          page: page
        }
      })
    },
    nodeClick (treeNode) {
      this.$router.push({
        name: 'List',
        params: {
          name: treeNode.name,
          id: treeNode.id,
          page: 1
        }
      })
    },
    createUrl () {
      return ''
    },
    async deleteItem (id) {
      const action = window.confirm('你确定要删除吗？')
      if (action) {
        await this.$store.dispatch('deleteItem', id)
        clearTimeout(this.timeOut)
        this.showSuccess = true
        this.timeOut = setTimeout(() => {
          this.showSuccess = false
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/common';
</style>

