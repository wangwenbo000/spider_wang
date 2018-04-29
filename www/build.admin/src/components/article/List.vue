<template>
<div class="listIndex">
<Category name="article"
          postUrl="apix/article/getCateList"
          :addNewId.sync="newId"
          @nodeClick="nodeClick"
          @onAdd="onAdd"
          @onAddP="onAddP"
          @onRename="onRename"
          @onRemove="onRemove"></Category>
<div class="list">
  <div class="list-titleBar">
    <h2>{{$route.params.name}} Data List <span>🗂 为草稿箱文件，前台页面不显示</span></h2>
    <router-link tag="button" class="global-btn gb-green" :to="{name:'AForm',query:{action:'add',cate:$route.params.id,name:$route.params.name,redirect:$route.path}}">＋ 增加新数据</router-link>
  </div>
<div class="success" v-show="showSuccess">
  ✅ 删除成功~
</div>
<table border="1" width="100%">
  <tr>
    <th>ID</th>
    <th>封面</th>
    <th>文章标题</th>
    <th>发布时间</th>
    <th>操作</th>
  </tr>
  <tr v-for="list in dataList.data" :key="list.id" :style="{background:list.status?'':'#ffd9a0'}">
    <td align="center">
      {{list.status===0?'🗂':list.id}}
    </td>
    <td width="40" style="padding:0;">
      <img v-lazy="$conf.qnUrl+list.cover+'?imageView2/5/w/50/h/50'" width="50" style="display:block;">
    </td>
    <td>
      <router-link tag="a"
                   :to="{
                     name:'AForm',
                     query:{
                       action:'edit',
                       cate:$route.params.id,
                       id:list.id,
                       name:$route.params.name,
                       redirect:$route.path
                       }}" class="list-title-link">
                       <strong>{{list.titleCn}}{{list.status===0?' (草稿)':''}}</strong>
                       </router-link>
      <br>
      <span style="color:#999;">{{list.titleEn}}</span>
    </td>
    <td>{{list.date}}</td>
    <td align="center">
      <router-link tag="a"
                  class="global-btn gb-yellow"
                   :to="{
                     name:'AForm',
                     query:{
                       action:'edit',
                       cate:$route.params.id,
                       id:list.id,
                       name:$route.params.name,
                       redirect:$route.path
                       }}">
                       ✏️ Edit
                       </router-link>
      <a class="global-btn gb-red" href="javascript:;" @click.stop="deleteItem(list.id)">🗑 Delete</a>
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
          :create-url="createUrl"
          v-show="dataList.count > 0"></zpagenav>
</div>
</div>
</template>
<script>
import Category from '@/components/Category'
import { mapActions } from 'vuex'
export default {
  name: 'SpiderList',
  data () {
    return {
      showSuccess: false,
      newId: 0
    }
  },
  components: {
    Category
  },
  async created () {
    await this.getArticleChildList()
  },
  computed: {
    dataList () {
      return this.$store.state.Article.childList
    }
  },
  watch: {
    '$route.params': async function () {
      await this.getArticleChildList()
    }
  },
  methods: {
    ...mapActions([
      'getArticleChildList'
    ]),
    pageHandler (page) {
      this.$router.push({
        name: 'List',
        params: {
          page: page
        }
      })
    },
    createUrl () {
      return ''
    },
    async deleteItem (id) {
      const action = window.confirm('你确定要删除吗？')
      if (action) {
        await this.$store.dispatch('delArticleItem', id)
        clearTimeout(this.timeOut)
        this.showSuccess = true
        this.timeOut = setTimeout(() => {
          this.showSuccess = false
        }, 1000)
      }
    },
    nodeClick (treeNode) {
      this.$router.push({
        name: 'AList',
        params: {
          name: treeNode.name,
          id: treeNode.id,
          page: 1
        }
      })
    },
    async onAddP (n) {
      const add = await this.addCate({
        name: n.name,
        pid: n.pid
      })
      console.log(add)
    },
    async onAdd (n) {
      const add = await this.addCate({
        name: '新增节点',
        pid: n.id
      })
      this.newId = add.data.data
    },
    async onRename (n) {
      await this.updateCate({
        name: n.treeNode.name,
        id: n.treeNode.id
      })
    },
    async onRemove (n) {
      await this.deleteCate(n.treeNode.id)
    },
    ...mapActions([
      'addCate',
      'updateCate',
      'deleteCate'
    ])
  }
}
</script>
<style lang="scss" scoped>
@import '../style/common';
</style>

