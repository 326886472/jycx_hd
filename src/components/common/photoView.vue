<template>
    <div class="zx-plug-photo-view clearfix">
      <div class="zx-plug-img-list">
        <img v-for="(i, key) in img" :src="i" alt="" @click="show(key)">
      </div>
      <div v-show="showBox" :class="auto === true | changeClass('zx-look-box clearfix', 'zx-look-box clearfix noAuto')">
        <div class="zx-plug-opt">
          <span @click="hideBox">
            <i class="el-icon-shouqi"></i>
            收起
          </span>
          <span @click="autoImg" :class="{'on': auto}">
            <i class="el-icon-quanping"></i>
            原图
          </span>
          <span @click="rotate('l')">
            <i class="el-icon-zuozhuan"></i>
            左旋转
          </span>
          <span @click="rotate('r')">
            <i class="el-icon-youzhuan"></i>
            右旋转
          </span>
        </div>
        <div class="clearfix clearfixImg">
          <img :src="img[index]" alt="" :style="rotateI | changeRotate">
          <div class="left-btn-box btn-box" @click="changeShowImg('l')">
          </div>
          <div class="right-btn-box btn-box" @click="changeShowImg('r')">
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  /*
  * 使用方法
  * 传递images 参数 'url,url,url' - type string
  * */
    export default{
        props: {
            images: String
        },
        data() {
            return {
              img: [],
              curImg: '',
              showBox: false,
              auto: false,
              rotateI: 0,
              index: 0
            };
        },
        created () {
            var time = setInterval(() => {
                if (this.images) {
                  this.img = [];
                  var img = this.images.split(',');
                  for (var i = 0; i < img.length; i++) {
                    this.img.push(this.config.baseUrl + img[i]);
                  }
                  this.curImg = this.img[this.index];
                  clearInterval(time);
                }
            }, 100);

            // 如果1分钟后没加载完成
            setTimeout(() => {
              clearInterval(time);
            }, 1000 * 60);
        },
        filters: {
          changeClass: function (a, c1, c2) {
            if (a) {
              return c1.toString();
            }
            return c2.toString();
          },
          changeRotate: function (i) {
            return 'transform:rotate(' + i * 90 + 'deg)';
          }
        },
        methods: {
            // 查看原图
          autoImg() {
              this.auto === true ? this.auto = false : this.auto = true;
          },
          // 收起盒子
          hideBox() {
            this.showBox = false;
          },
          // 旋转
          rotate(ty) {
              if (ty === 'l') {
                  this.rotateI <= 0 ? this.rotateI = 3 : this.rotateI--;
                  return;
              }
            this.rotateI >= 3 ? this.rotateI = 0 : this.rotateI++;
          },
          // 显示盒子
          show(i) {
              this.rotateI = 0;
              this.showBox = true;
              this.index = i;
              this.auto = false;
          },
          changeShowImg(ty) {
            this.rotateI = 0;
            if (ty === 'l') {
              this.index <= 0 ? this.index = this.img.length - 1 : this.index--;
              return;
            }
            this.index >= this.img.length - 1 ? this.index = 0 : this.index++;
          }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .zx-plug-photo-view{
    .zx-plug-img-list{
      img{
        width:80px;
        height: 80px;
        cursor: pointer;
        margin-right:10px;
      }
    }
    .zx-look-box{
      float: left;
      position: relative;
      background: #fff;
      margin-top:20px;
      overflow: hidden;
      .btn-box{
        top:25px;
        bottom:0;
        width:50%;
        position: absolute;
        &.left-btn-box{
          left:0;
          cursor: url("/static/images/leftBtn.png"), auto;
        }
        &.right-btn-box{
          right:0;
          cursor: url("/static/images/rightBtn.png"), auto;
        }
      }
      .clearfixImg{
        overflow: hidden;
        display: flex;
        max-width: 780px;
        min-width: 261px;
      }
      .zx-plug-opt{
        display: flex;
        border:1px solid #aaa;
        border-bottom:none;
        height:25px;
        line-height:25px;
        span{
          flex:1;
          cursor: pointer;
          text-align: center;
          &:hover{
            color: #964e4c;
          }
          &.on{
            color: #964e4c;
          }
        }
      }
      img{
        top:0;
      }
      &.noAuto{
        img{
          /*width:257px;*/
          position: relative;
          &.r90{
            transform:rotate(90deg);
          }
          &.r180{
            transform:rotate(180deg);
          }
          &.r270{
            transform:rotate(270deg);
          }
          &.r270{
            transform:rotate(270deg);
          }
        }
      }

    }
  }
</style>
