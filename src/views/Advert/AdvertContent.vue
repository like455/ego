<template>
  <div class="content">
    <el-button @click="addContent">{{treeData.name}}广告</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="PID" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称" width="150"> </el-table-column>
      <el-table-column prop="address" label="访问地址" min-width='240'> </el-table-column>
      <el-table-column prop="address" label="图片地址" min-width='240'> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:{
    treeData:{
      type:Object,
      default:function(){
        return {name:'按钮'}
      }
    }
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch:{
    treeData:function(val){
      this.$api.addAdvertContent({
      pid:val.pid
    }).then(res=>{
      console.log('监听修改',res);
    })
    }
  },
  methods:{
    handleDelete(){},
    // 增加广告的内容
    addContent(){}
  },
};
</script>

<style lang="scss" scoped>
.content{
  text-align: center;
  button{
    margin-bottom: 20px;
  }
}
</style>