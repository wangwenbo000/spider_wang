<template>
<div class="category">
  <div class="title">
    <h4>分类列表<span v-show="loading">LOADING</span></h4>
    <div class="treeToolBar">
      <a href="javascript:;" class="addFolder"  @click="addPnodes" v-if="!isFormCom">
        📂
      </a>
      <a href="javascript:;" class="zs" @click="expandAllNode">
        {{expandStatus?'🔼':'🔽'}}
      </a>
    </div>
  </div>
  <div class="searchTree">
    <input type="text" @input="search" v-model="searchTxt" placeholder="搜索关键词">
  </div>
  <div class="treeScroll">
    <ul :id="'treeDemo'+name" class="ztree"></ul>
  </div>
</div>
</template>
<script>
export default {
  name: 'SpiderCate',
  props: {
    name: '',
    addNewId: 0,
    isFormCom: {
      default: false
    },
    postUrl: ''
  },
  data () {
    return {
      searchTxt: '',
      newCount: 1,
      setting: {
        view: {
          // addHoverDom: this.addHoverDom,
          // removeHoverDom: this.removeHoverDom,
          fontCss: this.getFontCss
        },
        edit: {
          enable: true
        },
        async: {
          autoParam: ['id'],
          enable: true,
          dataType: 'json',
          url: '',
          type: 'post',
          dataFilter: this.dataFilter
        },
        callback: {
          beforeAsync: this.beforeAsync,
          onAsyncError: this.onAsyncError,
          onAsyncSuccess: this.onAsyncSuccess,
          beforeClick: this.zTreeBeforeClick,
          beforeRemove: this.beforeRemove,
          onClick: this.nodeClick,
          onRename: this.nodeRename,
          onRemove: this.nodeRemove
        }
      },
      expandStatus: true,
      loading: true
    }
  },
  mounted () {
    this.setting.async.url = this.postUrl
    this.setting.edit.enable = !this.isFormCom
    if (!this.isFormCom) {
      this.setting.view.addHoverDom = this.addHoverDom
      this.setting.view.removeHoverDom = this.removeHoverDom
    }
    this.zTree = $.fn.zTree.getZTreeObj('treeDemo' + this.name)
    this.zTreeObj = $.fn.zTree.init($('#treeDemo' + this.name), this.setting)
    // })
  },
  watch: {
    'addNewId': function (o) {
      const nodeList = this.zTreeObj.getNodesByParamFuzzy('name', '新增节点' + (this.newCount - 1), null)
      nodeList[0].id = o
      this.zTree.updateNode(nodeList[0])
    }
  },
  methods: {
    addPnodes () {
      const treeNode = {
        name: '新建大分类',
        pid: 0,
        isParent: true
      }
      this.zTreeObj.addNodes(null, treeNode)
      this.$emit('onAddP', treeNode)
    },
    search () {
      if (this.searchTxt !== '') {
        this.updateNode(true)
      } else {
        this.updateNode(false)
      }
    },
    updateNode (highlight) {
      this.zTree = $.fn.zTree.getZTreeObj('treeDemo' + this.name)
      const nodeList = this.zTreeObj.getNodesByParamFuzzy('name', this.searchTxt, null)
      for (var j = 0, m = nodeList.length; j < m; j++) {
        nodeList[j].highlight = highlight
        this.zTree.updateNode(nodeList[j])
      }
    },
    getFontCss (treeId, treeNode) {
      return (treeNode.highlight) ? { color: '#A60000', 'font-weight': 'bold' } : { color: '#333', 'font-weight': 'normal' }
    },
    addHoverDom (treeId, treeNode) {
      // 非父节点不允许添加子节点
      if (!treeNode.isParent) return false
      var sObj = $('#' + treeNode.tId + '_span')
      if (treeNode.editNameFlag || $('#addBtn_' + treeNode.tId).length > 0) return
      var addStr = "<span class='button add' style='background-position: -144px 0;' id='addBtn_" + treeNode.tId +
				"' title='add node' onfocus='this.blur();'></span>"
      sObj.after(addStr)
      var btn = $('#addBtn_' + treeNode.tId)
      if (btn) {
        btn.bind('click', () => {
          const action = window.confirm('确定要添加新节点么？')
          if (action) {
            this.$emit('onAdd', treeNode)
            this.zTree = $.fn.zTree.getZTreeObj('treeDemo' + this.name)
            this.zTree.addNodes(treeNode, {
              id: (100 + this.newCount),
              pId: treeNode.id,
              name: '新增节点' + (this.newCount++)
            })
            return false
          } else {
            return false
          }
        })
      }
    },
    removeHoverDom (treeId, treeNode) {
      $('#addBtn_' + treeNode.tId).unbind().remove()
    },
    nodeRename (event, treeId, treeNode, isCancel) {
      this.$emit('onRename', { event, treeId, treeNode, isCancel })
    },
    nodeRemove (event, treeId, treeNode, isCancel) {
      this.$emit('onRemove', { event, treeId, treeNode, isCancel })
    },
    beforeRemove () {
      const action = window.confirm('确定要删除节点么？')
      if (!action) {
        return false
      }
    },
    expandAllNode () {
      this.expandStatus = !this.expandStatus
      this.zTreeObj.expandAll(this.expandStatus)
    },
    beforeAsync () {
      this.loading = true
    },
    onAsyncError (event, treeId, treeNode, XMLHttpRequest) {
      if (XMLHttpRequest.status === 401) {
        localStorage.auth = false
        this.$router.push({
          name: 'Hello'
        })
      }
    },
    onAsyncSuccess (event, treeId, treeNode, msg) {
      // console.log(treeNode, msg)
      this.zTreeObj.expandAll(true)
      this.loading = false
    },
    dataFilter (treeId, parentNode, childNodes) {
      childNodes.forEach(item => {
        if (item.hasOwnProperty('children')) {
          item.isParent = true
        }
      })
      this.$store.dispatch('changeCate', childNodes)
      return childNodes
    },
    nodeClick (event, treeId, treeNode) {
      this.$emit('nodeClick', treeNode)
      if (this.isFormCom) return false
    },
    zTreeBeforeClick (treeId, treeNode, clickFlag) {
      return !treeNode.isParent// 当是父节点 返回false 不让选取
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  width: 200px;
  height: 100%;
  border-right: 1px solid #ddd;
  position: relative;
  flex-shrink: 0;
  .searchTree{
    height: 22px;
    background: #ccc;
    input{
      width: 97%;
    }
  }
  .treeScroll{
    position: absolute;
    overflow-y: scroll;
    width: 200px;
    top:52px;
    bottom: 0;
    &::-webkit-scrollbar {
      background-color: #fffdee;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #e1f2ff;
    }
  }
  .title{
    height: 30px;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4{
      margin: 0 0 0 10px;
      span{
        margin-left: 10px;
        background: #ffff00;
        color:#ff0000;
      }
    }
    .treeToolBar{
      display: flex;
    }
    .addFolder{
      background: #f0f0f0;
    }
    .zs{
      background: #ccc;
    }
    .zs,
    .addFolder{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
    }
  }
}
.ztree li span.button.add{
  margin-left: 2px;
  margin-right: -1px;
  background-position: -144px 0;
  vertical-align: top;
}
</style>

