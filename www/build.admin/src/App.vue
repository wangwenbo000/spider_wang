<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
.edui-editor{
  margin: 0 auto;
}
body{
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  user-select:none;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 12px;
}
.file-uploads{
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(45deg, #e7e7e7 25%, #fff 0, #fff 50%, #e7e7e7 0, #e7e7e7 75%, #fff 0); background-size: 30px 30px;
}
.help{
  background: #ff7878;
  display: block;
  font-weight: bold;
  color:#fff;
  padding: 0 10px;
}
.is-danger{
  border: 1px solid #ff7878;
}
#app{
  height: 100%;
}
html{
  width: 100%;
  height: 100%;
}
body{
  font-size: 12px;
  height: 100%;
}
ul{
  list-style: none;
}
.del{
  &:hover{
    color:#ff0000;
  }
}
a{
  text-decoration: none;
  &:hover{
    color: green;
  }
}
// table
  table, th, td{
    border: 1px solid black;
  }
  table{
    border-collapse:collapse;
    width:100%;
    margin-bottom: 10px;
    td{
      vertical-align:middle;
      padding:6px 10px;
    }
    th{
      background-color:green;
      color:white;
    }
    tr{
      cursor: pointer;
      &:nth-child(odd){
        background: #e7e7e7;
      }
      &:hover{
        background: #e1f2ff;
      }
    }
  }
// 翻页
.zpagenav{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.m-r-1 {
    margin-right: 1rem!important;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  // margin-top: 1rem;
  // margin-bottom: 1rem;
  // border-radius: .25rem;
}

.page-item {
  display: inline;
}

.page-item:first-child .page-link {
  margin-left: 0;
  // border-top-left-radius: .25rem;
  // border-bottom-left-radius: .25rem;
}

.page-item:last-child .page-link {
  // border-top-right-radius: .25rem;
  // border-bottom-right-radius: .25rem;
}

.page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #0000ff;
  border-color: #0000ff;
}

.page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.page-link {
  position: relative;
  float: left;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.5;
  color: #0000ff;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.page-link:focus, .page-link:hover {
  color: #014c8c;
  background-color: #eceeef;
  border-color: #ddd;
}

.pagination-lg .page-link {
  padding: .75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.333333;
}

.pagination-lg .page-item:first-child .page-link {
  // border-top-left-radius: .3rem;
  // border-bottom-left-radius: .3rem;
}

.pagination-lg .page-item:last-child .page-link {
  // border-top-right-radius: .3rem;
  // border-bottom-right-radius: .3rem;
}

.pagination-sm .page-link {
  padding: .275rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
}

.pagination-sm .page-item:first-child .page-link {
  border-top-left-radius: .2rem;
  border-bottom-left-radius: .2rem;
}

.pagination-sm .page-item:last-child .page-link {
  border-top-right-radius: .2rem;
  border-bottom-right-radius: .2rem;
}

.pager {
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  list-style: none;
}

.pager::after {
  display: table;
  clear: both;
  content: "";
}
.pager li {
  display: inline;
}

.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.pager li > a:focus, .pager li > a:hover {
  text-decoration: none;
  background-color: #eceeef;
}

.pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager .disabled > span {
  color: #818a91;
  cursor: not-allowed;
  background-color: #fff;
}

.pager-next > a,
.pager-next > span {
  float: right;
}

.pager-prev > a,
.pager-prev > span {
  float: left;
}
</style>
