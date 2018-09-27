<template>
  <div v-loading="loading" class='body'>
    <el-row class='header'>
      <div class='active'>
        <span style='color: #409EFF;'>活动状态：</span>
        <el-select style='width: 6rem' size='mini' v-model='stateOption' placeholder='全部'>
          <el-option
            v-for='item in stateOptions'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </div>
      <div class='createTime'>
        <span style='color: #409EFF;'>创建时间：</span>
        <el-date-picker
          style='width: 15rem'
          size='mini'
          v-model='timeOption'
          type='daterange'
          value-format="yyyy-MM-dd"
          align='right'
          unlink-panels
          range-separator='至'
          start-placeholder='开始日期'
          end-placeholder='结束日期'
          :picker-options='pickerOptions'>
        </el-date-picker>
      </div>
      <div class='select'>
        <el-input
          style="width: 10rem;"
          size="mini"
          placeholder="输入活动名称搜索"
          prefix-icon="el-icon-search"
          v-model="searchOption">
        </el-input>
      </div>
      <div class="handle">
        <el-button size="mini" @click="find" type="primary" round>查询</el-button>
        <el-button size="mini" @click="newActive" type="primary" round>新建</el-button>
      </div>
    </el-row>
    <el-row class="cont">
      <el-table
        :data="tableData"
        height="95%"
        border
        style="width: 100%"
        :cell-style="tableRowClassName">
        <el-table-column
          align="center"
          header-align="center"
          prop="ID"
          label="ID"
          width="80">
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--header-align="center"-->
          <!--prop="name"-->
          <!--label="活动类型"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--align="center"-->
          <!--header-align="center"-->
          <!--prop="regAward"-->
          <!--label="注册奖励"-->
          <!--width="120"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--align="center"-->
          <!--header-align="center"-->
          <!--prop="realAward"-->
          <!--label="实名奖励"-->
          <!--width="120"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--align="center"-->
          <!--header-align="center"-->
          <!--prop="payAward"-->
          <!--label="押金奖励"-->
          <!--width="120"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          align="center"
          header-align="center"
          prop="ActivityName"
          label="活动名称"
          :formatter="ActivityNameFormat"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="discription"
          label="活动描述"
          width="150"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--header-align="center"-->
          <!--prop="createID"-->
          <!--label="创建人"-->
          <!--width="100"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          align="center"
          header-align="center"
          prop="infoDate"
          label="生效时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="loseDate"
          label="失效时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="createTime"
          label="创建时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="isOpen"
          :formatter="FIsOpen"
          label="是否启用"
          width="80"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          fixed="right"
          label="操作"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <span style="cursor: pointer;" class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu  size="mini" slot="dropdown">
                <el-dropdown-item :command=[1,scope] >修改</el-dropdown-item>
                <el-dropdown-item :command=[2,scope] divided>{{tableData[scope.$index].isOpen | switchOpen}}</el-dropdown-item>
                <!--<el-dropdown-item :command=[3,scope] v-show=!tableData[scope.$index].isOpen divided>删除</el-dropdown-item>-->
                <el-dropdown-item :command=[4,scope] divided>设置用户奖励</el-dropdown-item>
                <!--<el-dropdown-item :command=[5,scope] divided>设置商家奖励</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!--分页-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="checkList.page"
          :page-size="checkList.perPage"
          layout="prev, pager, next, jumper"
          :total="checkList.count">
        </el-pagination>
      </div>
      <!--Dialog-->
      <el-dialog title="创建活动" :visible.sync="newActiveVisible">
        <el-form ref="newActiveform" :model="newActiveform" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="newActiveform.name"></el-input>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker
              style="width: 100%"
              v-model="newActiveform.pickTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="newActiveform.discription"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createActive">立即创建</el-button>
            <el-button @click="newActiveVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改活动" :visible.sync="alertActiveVisible">
        <el-form ref="newActiveform" :model="newActiveform" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="newActiveform.name"></el-input>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker
              v-model="newActiveform.pickTime"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>

          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="newActiveform.discription"></el-input>
          </el-form-item>
          <el-form-item>
            <!--TODO 修改活动-->
            <el-button type="primary" @click="alActive">立即修改</el-button>
            <el-button @click="alertActiveVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <setUserPrize v-on:loadingChange="LChange($event)" v-bind:loading="loading" ref="setUserForm"></setUserPrize>
      <!--<setMerchantForm v-on:loadingChange="LChange($event)" v-bind:loading="loading" ref="setMerchantForm"></setMerchantForm>-->
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
  import setUserPrize from './setUserPrize.vue';
  // import setMerchantForm from './setMerchantForm.vue';
  export default {
    data() {
      return {
        checkList: {
          perPage: 10,
          page: 1,
          count: 0
        },
        createID: this.$cookie.get('adminUsername'),
        loading: false,
        // 状态选择器
        stateOptions: [{
          value: '1',
          label: '已启用'
        }, {
          value: '0',
          label: '未启用'
        }, {
          value: null,
          label: '全部'
        }],
        stateOption: '',
      //  时间选择器
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeOption: '',
      //  搜索
        searchOption: '',
      //  表格
        tableData: [],
      //  新建弹窗
        newActiveVisible: false,
        alertActiveVisible: false,
        newActiveform: {
          name: '',
          pickTime: '',
          discription: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '今后一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '今后一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '今后三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
        // 设置用户奖励弹窗
      };
    },
    components: {
      setUserPrize
      // setMerchantForm
    },
    filters: {
      switchOpen: function (option) {
        switch (option) {
          case 1:
            return '停用';
          case 0:
            return '启用';
        }
      }
    },
    created () {
      this.find();
    },
    methods: {
      // 改变已过期的活动样式
      tableRowClassName({row, column, rowIndex, columnIndex}) {
        if (row.overdue === 1 && columnIndex === 1) {
          return 'color: rgba(255, 69, 0, 0.68)';
        } else {
          return '';
        }
      },
      // 换页
      handleCurrentChange(key) {
        this.checkList.page = key;
        // console.log(this.checkList.page);
        this.find();
      },
      // 新建
      newActive () {
        this.newActiveform = {
          name: '',
          pickTime: '',
          discription: '',
          activityId: ''
        };
        this.newActiveVisible = true;
      },
      // timeChange (val) {
      //   console.log(val);
      // },
      // 立即修改
      alActive () {
        let post = {
          objects: 'a',
          title: this.newActiveform.name,
          discription: this.newActiveform.discription,
          startDate: this.newActiveform.pickTime[0],
          endDate: this.newActiveform.pickTime[1],
          activityId: this.newActiveform.activityId
        };
        this.util.SendAjax(this, post, 'activityCrmApi/updateActivity').then((res) => {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.find();
          this.alertActiveVisible = false;
        });
      },
      // formatterData
      FIsOpen (row, column, cellValue) {
        switch (cellValue) {
          case 1:
            return '已启用';
          case 0:
            return '未启用';
        }
      },
      ActivityNameFormat (row, column, cellValue) {
        if (row.overdue === 0) {
          return cellValue;
        } else if (row.overdue === 1) {
          return cellValue + '(活动已过期)';
        }
      },
      // TODO
      find () {
        let startDate;
        let endDate;
        if (this.timeOption === '' || this.timeOption === undefined || this.timeOption === null) {
          startDate = null;
          endDate = null;
        } else {
          startDate = this.timeOption[0];
          endDate = this.timeOption[1];
        }
        let post = {
          pageSize: this.checkList.perPage,
          pageNum: this.checkList.page,
          state: this.stateOption,
          title: this.searchOption,
          startDate: startDate,
          endDate: endDate,
          objects: 'a',
          parentId: 0
        };
        // console.log(post);
        this.util.SendAjax(this, post, 'activityCrmApi/getActivity.do').then((res) => {
          this.tableData = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {};
            obj.ID = res.data[i].activityId;
            obj.infoDate = this.formatDate(res.data[i].startDate);
            obj.loseDate = this.formatDate(res.data[i].endDate);
            obj.createTime = this.formatDate(res.data[i].createTime);
            obj.isOpen = res.data[i].state;
            obj.ActivityName = res.data[i].title;
            obj.discription = res.data[i].discription;
            obj.overdue = res.data[i].overdue;
            this.tableData.push(obj);
          }
          this.checkList.page = res.extra.pageData.currentPage;
          this.checkList.count = res.extra.pageData.totalCount;
        });
      },
      // TODO
      formatDate (now) {
        var n = new Date(now);
        var year = n.getFullYear();
        var month = n.getMonth() + 1;
        var date = n.getDate();
        return year + '-' + month + '-' + date + ' ';
      },
      // 立即创建
      createActive () {
        let startDate;
        let endDate;
        if (this.newActiveform.pickTime === '' || this.newActiveform.pickTime === undefined || this.newActiveform.pickTime === null) {
          startDate = null;
          endDate = null;
        } else {
          startDate = this.newActiveform.pickTime[0];
          endDate = this.newActiveform.pickTime[1];
        }
        let post = {
          title: this.newActiveform.name,
          startDate: startDate,
          endDate: endDate,
          discription: this.newActiveform.discription,
          objects: 'a'
        };
        this.util.SendAjax(this, post, 'activityCrmApi/addActivity').then((res) => {
          this.$message({
            message: '创建成功！',
            type: 'success'
          });
          this.find();
          this.newActiveVisible = false;
          this.newActiveform = {
            name: '',
            pickTime: '',
            discription: ''
          };
        });
      },
      // 启用停用
      switchIsOpen (scope) {
        let post = {
          parentId: scope.row.ID
        };
        if (scope.row.isOpen === 0) {
          this.util.SendAjax(this, post, 'activityCrmApi/startActivity').then((res) => {
            scope.row.isOpen = 1;
          });
        } else {
          this.util.SendAjax(this, post, 'activityCrmApi/stopActivity').then((res) => {
            scope.row.isOpen = 0;
          });
        }
      },
      // 修改
      alertActive (scope) {
        // scope.row.ID 参数
        let post = {
          activityId: scope.row.ID
        };
        this.alertActiveVisible = true;
        this.util.SendAjax(this, post, 'activityCrmApi/getOneActivity').then((res) => {
          let startDate = this.formatDate(res.data.startDate);
          let endDate = this.formatDate(res.data.endDate);
          let pickTime = [startDate, endDate];
          this.newActiveform = {
            name: res.data.title,
            pickTime: pickTime,
            discription: res.data.discription,
            activityId: res.data.activityId
          };
        });
        this.newActiveform = {
          name: '',
          pickTime: '',
          discription: ''
        };
      },
      // 删除
      deleteActive (scope) {
        this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
            parentId: scope.row.ID
          };
          this.util.SendAjax(this, post, 'activityCrmApi/delActivity').then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.find();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCommand (com) {
        switch (com[0]) {
          case 1:
            this.alertActive(com[1]);
            break;
          case 2:
            this.switchIsOpen(com[1]);
            break;
          case 3:
            this.deleteActive(com[1]);
            break;
          case 4:
            this.$refs.setUserForm.userPrizeVisible = true;
            this.$refs.setUserForm.getDetail(com[1].row.ID);
            break;
          // case 5:
          //   this.$refs.setMerchantForm.MerchantPrizeVisible = true;
          //   break;
        }
      },
      LChange(msg) {
        if (msg === 1) {
          this.loading = !this.loading;
        }
      }
    }
  };
</script>

<style lang='scss' rel='stylesheet/scss'>
  .body{
    background: rgb(173,175,199);
    height: 100%;
    .header {
      background: #fff;
      padding: 1rem 3rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      -webkit-box-shadow: 2px 1px 4px 0px #8e8e8e;
      -moz-box-shadow: 2px 1px 4px 0px #8e8e8e;
      box-shadow: 2px 1px 4px 0px #8e8e8e;
      margin-left: 3px;
      transform: translateX(-3px);
      > div {
        flex: 1;
      }
      .createTime {
        flex: 1.5;
      }
    }
    .cont {
      margin-top: .3rem;
      width: 100%;
      position: absolute;
      top: 4rem;
      bottom: 0;
    }
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .titleAlign {
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color: #606266;
    font-weight: bold;
  }

  .block {
    height: 5%;
    text-align: center;
    background: white;
  }
  .el-input--mini .el-input__inner {padding-left: 30px!important;}
</style>

