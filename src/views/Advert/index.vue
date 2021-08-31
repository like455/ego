<template>
  <div class="advert">
    <!-- 左边 -->
    <AdvertTree class="advert-left" @getTreeData='getTreeData' />
    <!-- 右侧内容 -->
    <AdvertContent class="advert-right" :treeData='treeData' />
  </div>
</template>

<script>
import AdvertTree from "./AdvertTree.vue";
import AdvertContent from "./AdvertContent.vue";
export default {
  components: {
    AdvertTree,
    AdvertContent
  },
  data(){
    return{
      treeData:{name:'按钮'}
    }
  },
  methods:{
    getTreeData(val){
      console.log('----------------',val);
      this.treeData=val
    }
  }
};
</script>

<style lang="scss" scoped>
.advert{
  margin: 20px;
}
.advert-left{
  width: 300px;
  float: left;
}
.advert-right{
  float: left;
}
</style>