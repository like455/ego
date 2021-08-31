<template>
  <div>
    <el-tree
      :props="props"
      :data="data"
      :load="loadNode"
      lazy
      node-key="pid"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :default-expanded-keys="[1001]"
      @node-click="handleNodeClick"
    >
    </el-tree>
    <!-- 内弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <p>你当前处于的广告位置{{ advertInfo.name }}</p>
      <el-input type="text" v-model="advertName" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      dialogVisible: false, //弹框事件，默认关闭
      advertName: "", //广告名字
      advertInfo: {}, //点击弹框的节点的内容
      title: "添加广告",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      data: [],
    };
  },
  methods: {
    http(){
      this.$api.getAdvertList().then((res) => {
          console.log("广告分类", res);
          this.data=res.result;
        });
    },
    // 进入组件懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        //第一次请求
        this.$api.getAdvertList().then((res) => {
          console.log("广告分类", res);
          return resolve(res.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .getAdvertList({
            id: node.data.pid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
    handleNodeClick(data) {
      console.log(data);
      // 点击tree节点，发送数据
      this.$emit('getTreeData',data)
    },
    // 增加
    append(data) {
      console.log(data);
      // 显示弹框
      this.dialogVisible = true;
      this.title = "添加广告";
      // 获取点击的节点的位置
      this.advertInfo = data;
    },
    // 修改
    updata(data) {
      console.log(data);
      // 显示弹框
      this.dialogVisible = true;
      this.title = "添加名称";
      // 获取点击的节点的位置
      this.advertInfo = data;
    },
    // 提交确定按钮
    submitAdvert() {
      if (this.title == "添加广告") {
        // 添加
        this.$api
          .addAdvertChild({
            pid: this.advertInfo.pid,
            name: this.advertName
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              // 隐藏弹框，清空数据
              this.dialogVisible = false;
              this.advertName = "";
              // 更新tree
              this.http()
            } else {
              //错误信息提示
            }
          });
      } else {
        // 修改
      }
    },
    //删除
    remove(node, data) {},
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "add")}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.updata(data, "updata")}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
</style>