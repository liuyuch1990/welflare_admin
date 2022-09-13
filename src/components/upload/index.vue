<template>
   <el-dialog title="上传文件" :visible.sync="open" width="30%">
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        :auto-upload='false'
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        width="100%"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传excel文件，且不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="uploadConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>