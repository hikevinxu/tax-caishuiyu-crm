<template>
  <div class="upload-container">
    <div class="image-preview">
      <div class="image-preview-wrapper" style="width: 200px;height:200px;">
        <img v-if="imageUrl" :src="imageUrl" style="width: 200px;height:200px">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div>
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-remove="handleMove"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action=""
      :http-request="upload" style="width: 200px;height:200px">
      <i class="el-icon-upload"/>
      <div class="el-upload__text">将文件拖到此处，或<br /><em>点击修改</em></div>
    </el-upload>
    <!-- <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage"/>
        </div>
      </div>
    </div> -->
    
  </div>
</template>

<script>
import { getToken, upLoadPicFromWeApp } from '@/api/qiniu'

export default {
  name: 'uploadImgTemp',
  props: {
    value: {
      type: Object,
      default: function(){
        return {
          imgUrl: ''
        }
      }
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value.imgUrl
      console.log(this.value)
    }
  },
  methods: {
    rmImage() {
      this.emitInput({})
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(file) {
      this.tempUrl = file.data
      this.emitInput(this.tempUrl)
    },
    handleMove(file){
      console.log(file.data)
    },
    beforeUpload() {
      const _self = this
      // return new Promise((resolve, reject) => {
      //   getToken().then(response => {
      //     const key = response.data.qiniu_key
      //     const token = response.data.qiniu_token
      //     _self._data.dataObj.token = token
      //     _self._data.dataObj.key = key
      //     this.tempUrl = response.data.qiniu_url
      //     resolve(true)
      //   }).catch(err => {
      //     console.log(err)
      //     reject(false)
      //   })
      // })
    },
    upload (item) {
      let formData = new FormData()
      formData.append('files', item.file)
      upLoadPicFromWeApp(formData).then(res => {
        if (res.code == 0) {
          // this.tempUrl = res.data[0].fileId
          // this.emitInput(this.tempUrl)
          let oFileReader = new FileReader()
          oFileReader.readAsDataURL(item.file)
          oFileReader.onloadend = (e) => {
            this.tempUrl = e.target.result
            let param = {
              imgUrl: e.target.result,
              fileId: res.data[0].fileId
            }
            this.emitInput(param)
          }
        }
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  display: flex;
//   align-items: center;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 35%;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    margin-right: 20px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}


</style>
