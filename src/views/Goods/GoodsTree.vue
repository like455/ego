<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    //获取点击的node的界面的数据---发送给弹框
    handleNodeClick(data) {
      // console.log(data);
      //点击的tree数据传递给父组件弹框组件
      this.$emit('getTreeData',data)
    },
    //懒加载
    loadNode(node, resolve) {
      //   console.log(node.data);
      //懒加载事件load事件
      if (node.level === 0) {
        // console.log("进入了lazy的树加载");
        this.$api.getSelectCategory().then((res) => {
        //   console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        this.$api
          .getSelectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
        // console.log("二级树加载");
      }
    },
  },
};
</script>

<style>
</style>