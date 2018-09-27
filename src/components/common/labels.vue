<template>
  <div class="labels clearfix">
    <div class="label" :class="{active: labels.indexOf(item) !== -1}" @click="toggleFixed(item)"
         v-for="(item, index) in fixed">
      {{item}}
    </div>
    <div class="label nofixed active" v-for="(label, index) in labels" v-if="fixed.indexOf(label) === -1">
      {{label}}
      <div class="del" @click="delLabel(index)">x</div>
    </div>
    <div class="label" v-show="!labelInputShow && allowAdd" @click="labelInputShow = true"><i class="el-icon-plus"></i>
    </div>
    <input class="label-input" v-model="labelInput" placeholder="请输入内容" v-show="labelInputShow" @blur="addLabel()"
           @keypress.enter="addLabel()"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      fixed: {
        type: Array,
        default: () => {
          return [];
        }
      },
      labels: {
        type: Array,
        required: true
      },
      allowAdd: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        labelInputShow: false,
        labelInput: ''
      };
    },
    methods: {
      toggleFixed(item) {
        let activeIndex = this.labels.indexOf(item);
        if (activeIndex !== -1) {
          this.labels.splice(activeIndex, 1);
        } else {
          this.labels.push(item);
        }
      },
      delLabel(index) {
        this.labels.splice(index, 1);
      },
      addLabel() {
        let labelInput = this.util.trim(this.labelInput);

        if (labelInput && !this.util.inArray(this.labels, labelInput)) {
          if (/^[^\s]+$/.test(labelInput)) {
            this.labels.push(labelInput);
            this.labelInput = '';
            this.labelInputShow = false;
          } else {
            this.$message.error('不能包含空白字符！');
          }
        } else if (labelInput) {
          this.$message.error('不能重复！');
        } else {
          this.labelInputShow = false;
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .labels {
    .label {
      float: left;
      border: 1px solid #ccc;
      padding: 3px 10px;
      margin-right: 10px;
      white-space: nowrap;
      margin-bottom: 10px;
      position: relative;
      height: 19px;
      line-height: 21px;
      cursor: pointer;

      &.active {
        border-color: #20a0ff;
      }

      &.nofixed {
        cursor: default;
      }

      &:hover {
        .del {
          display: block;
        }
      }

      .del {
        position: absolute;
        width: 14px;
        height: 14px;
        background: #20a0ff;
        text-align: center;
        line-height: 14px;
        border-radius: 50%;
        font-size: 12px;
        color: white;
        top: -7px;
        right: -7px;
        display: none;
        cursor: pointer;
      }
    }

    .el-icon-plus {
      width: 42px;
      text-align: center;
    }

    .label-input {
      @extend .label;
    }
  }
</style>
