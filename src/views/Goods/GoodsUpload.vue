<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-success="handleSuccess"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from "../../api/config";
export default {
  data() {
    return {
      fileList: [],
      url: base.baseUrl + base.uploadUrl,
    };
  },
  methods: {
    submitUpload() {
      //提交上传功能
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      // console.log("图片上传成功", response, file, fileList);
      //传递图片的路径--回显图片
      // console.log(base.baseUrl + "/" + response.url.slice(7));
      let imgUrl = base.baseUrl + "/" + response.url.slice(7);
      this.$emit('showImage',imgUrl)
    },
  },
};
</script>

<style>
</style>