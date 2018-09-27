<template>
  <div class="up-imgs clearfix">
    <div class="imglogo" v-for="(item, index) in img.showList">
        <span class="remove-btn" @click.stop="removeImg(index)">
          <i class="el-icon-close"></i>
        </span>
      <img :src="item" alt="" class="temp-img">
    </div>
    <div class="imglogo" v-show="img.showList.length < max">
      <input type="file" @change="fileUp" class="up-input" :multiple="max > 1" ref="upInput"/>
      <i class="el-icon-plus" :class="{unstart: !img.start}"></i>
      <div class="max">（最多{{max}}张）</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 有三个属性：{fileList: 存放真实的文件列表，showList 存放显示的图片, start 是否开始}
      img: {
        type: Object,
        required: true
      },
      max: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {};
    },
    created() {
      this.$watch('img.start', function (value) {
        if (value) {
          this.$refs.upInput.click();
        }
      });
    },
    methods: {
      fileUp(e) {
        if (this.img.start) {
          let fileList = e.target.files;

          if (fileList.length > 0) {
            if (fileList.length + this.img.fileList.length > this.max) {
              this.$message.error('最多上传' + this.max + '张图片！');
            } else {
              for (let i = 0; i < fileList.length; i++) {
                this.img.fileList.push(fileList[i]);
                this.img.showList.push(window.URL.createObjectURL(fileList[i]));
              }
            }
          }
        }
      },
      removeImg(index) {
        if (this.img.start) {
          this.img.fileList.splice(index, 1);
          this.img.showList.splice(index, 1);
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .up-imgs {
    .imglogo {
      width: 120px;
      height: 120px;
      position: relative;
      border: 2px solid #20a0ff;
      float: left;
      margin-right: 15px;

      .temp-img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }

      .up-input {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 3;
        cursor: pointer;
      }

      .remove-btn {
        position: absolute;
        top: 0;
        right: 0;
        background: #20a0ff;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 16px;
        cursor: pointer;
        z-index: 2;

        .el-icon-close {
          font-size: 12px;
          color: white;
        }
      }

      .el-icon-plus {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 120px;
        font-size: 30px;
        z-index: 2;

        &.unstart {
          z-index: 4;
          cursor: pointer;
        }
      }

      .max {
        z-index: 1;
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #888;
        bottom: 20px;
      }
    }
  }
</style>
