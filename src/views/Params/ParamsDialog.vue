<template>
  <el-dialog
    title="商品的规格参数类目选择"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <div v-if="dialogVisible">
      <GoodsTree @getTreeData="getTreeData" />
    </div>
    <!-- 内弹框 -->
    <el-dialog
      width="45%"
      title="商品规格参数配置"
      :visible.sync="innerVisible"
      append-to-body
    >
      <!-- ------------------------------------------------- -->
      <p>当前选中的商品：{{ productInfo.name }}</p>
      <el-button @click="addDomain">新增规格列表</el-button>
      <hr />
      <el-form
        :model="dynamicForm"
        ref="dynamicForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <!-- 第一次遍历 -->
        <el-form-item
          v-for="(item, index) in dynamicForm.groups"
          :label="item.title"
          :key="index"
        >
          <div class="list">
            <el-input v-model="item.title"></el-input>
            <el-button @click.prevent="addChildDomain(index)"
              >添加子组</el-button
            >
            <el-button @click.prevent="removeDomain(index)">删除组</el-button>
          </div>
          <!-- 第二层遍历 -->
          <el-form-item
            v-for="(ele, n) in item.children"
            :label="ele.title"
            :key="n"
            style="margin-top: 10px; margin-left: 40px"
          >
            <div class="list">
              <el-input v-model="ele.title"></el-input>
              <el-button @click.prevent="removeCurrentDomain(index, n)"
                >删除组</el-button
              >
            </div>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDynamicForm">提交</el-button>
        <el-button @click="innerVisible = false">重置</el-button>
      </span>
      <!-- ------------------------------------------------ -->
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="isShow" @click="showInnerVisble"
        >确定并添加分组</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import GoodsTree from "../Goods/GoodsTree.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      isShow: true, //禁止
      innerVisible: false,
      productInfo: {}, //点击tree数据
      dynamicForm: {
        //动态表单数据
        groups: [
          // {
          //   value: "", //规格的值
          //   title: "llll", //规格的名称
          //   children: [
          //     {
          //       value: "",
          //       title: "",
          //     },
          //     {
          //       value: "",
          //       title: "",
          //     },
          //     {
          //       value: "",
          //       title: "",
          //     },
          //   ],
          // },
          // {
          //   value: "",
          //   title: "hhhh",
          //   children: [],
          // },
        ],
      },
    };
  },
  components: {
    GoodsTree,
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    //点击tree传递tree数据
    getTreeData(val) {
      // console.log("------------", val);
      //按钮可以点击
      this.isShow = false;
      this.productInfo = val;
    },
    showInnerVisble() {
      this.innerVisible = true;
    },
    //动态表单事件--------------------------
    removeDomain(index) {
      this.dynamicForm.groups.splice(index, 1);
    },
    addChildDomain(index) {
      this.dynamicForm.groups[index].children.push({
        value: "",
        title: "",
      });
    },
    //删除当前子组件
    removeCurrentDomain(index, n) {
      this.dynamicForm.groups[index].children.splice(n, 1);
    },
    // 增加大的组件列表
    addDomain() {
      this.dynamicForm.groups.push({
        value: "",
        value: "",
        children: [],
      });
    },
    //提交事件
    submitDynamicForm() {
      // console.log("规格数据", this.dynamicForm.groups);
      let specsName = this.productInfo.name;
      let itemCatId = this.productInfo.cid;
      // console.log('规格id，类目名字',itemCatId,specsName);
      this.$api
        .addRulesParams({
          specsName,
          itemCatId,
          content: JSON.stringify(this.dynamicForm.groups),
        })
        .then((res) => {
          console.log("提交事件-----------", res);
          if (res.status === 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            // 关闭弹框
            this.innerVisible = false;
            this.dialogVisible = false;
            // 更新视图
            this.$parent.http(1);
            // 清空表单
            this.dynamicForm.groups = [];
            // this.$refs.dynamicForm.resetFields();
            // 
            this.isShow=true;
          } else {
            this.$message.error("添加商品规格失败");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>