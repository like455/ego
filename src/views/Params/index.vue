<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 列表数据 -->
    <el-table :data="tableData">
      <el-table-column prop="itemCatId" label="规格参数ID" width="100">
      </el-table-column>
      <el-table-column prop="id" label="类目ID" width="100"> </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="150">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <MyPagination
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 弹框 -->
    <ParamsDialog ref='myDialog' />
  </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  components: {
    MyPagination,
    ParamsDialog,
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 100,
    };
  },
  methods: {
    // 点击添加按钮显示弹框
    showDialog(){
      this.$refs.myDialog.dialogVisible=true
    },
    //编辑
    handleEdit(index, row) {},
    //删除
    handleDelete() {},
    //分页点击
    changeCurrent(val) {
      this.http(val)
    },
    //网络请求
    http(page) {
      this.$api
        .getParams({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            this.total = res.total;
            this.pageSize = res.pageSize;
          }
        });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  button {
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
</style>