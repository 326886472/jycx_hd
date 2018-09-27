<template>
  <div v-loading='loading' class='body'>
    <el-row class='header'>
      <div class='select'>
        <el-input
          style='width: 10rem;'
          size='mini'
          placeholder='输入商家名称搜索'
          prefix-icon='el-icon-search'
          v-model='searchOption'>
        </el-input>
      </div>
      <div class='handle'>
        <el-button size='mini' @click='find' type='primary' round>查询</el-button>
        <el-button size='mini' @click='newMerchant' type='primary' round>新建</el-button>
      </div>
    </el-row>
    <el-row class='cont'>
      <el-table
        :data='tableData'
        height='95%'
        border
        style='width: 100%'>
        <el-table-column
          align='center'
          header-align='center'
          prop='activityBusinesId'
          label='ID'
          width='80'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='businessName'
          label='商户名称'
          width='120'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='ActiveName'
          label='用户活动'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='ComActiveName'
          label='商户活动'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='mobile'
          label='联系电话'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='regNum'
          label='注册人数'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='realNum'
          label='实名人数'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='payNum'
          label='押金人数'
          width='100'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='FrentNum'
          label='首租人数'
          width='180'
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--align='center'-->
          <!--header-align='center'-->
          <!--prop='createName'-->
          <!--label='创建人'-->
          <!--width='180'-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          align='center'
          header-align='center'
          prop='createTime'
          label='创建时间'
          width='180'
        >
        </el-table-column>
        <el-table-column
          fixed='right'
          align='center'
          header-align='center'
          label='操作'
          >
          <template slot-scope='scope'>
            <el-button @click='changeMessage(scope.row)' type='text' size='small'>修改信息</el-button>
            <el-button @click='getBindMessage(scope.row.activityBusinesId)' v-show="scope.row.isDelete === 0" type='text' size='small'>绑定</el-button>
            <el-button @click='deleteMessage(scope.row)' v-show="scope.row.isDelete === 1" type='text' size='small'>解绑</el-button>
            <el-button @click='activate(scope.row.activityBusinesId)' v-show="scope.row.isDelete === 2" type='text' size='small'>激活</el-button>
            <el-button type='text' size='small' @click='createQR(scope.row)'>生成二维码</el-button>
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
      <el-dialog width='250px' title="二维码" :visible.sync='QRVisible'>
        <vue-qr :config="QRconfig" ></vue-qr>
      </el-dialog>
      <el-dialog width='25%' title='创建商家' :visible.sync='newMerchantVisible'>
        <el-form ref='newMerchantForm' :model='newMerchantForm' label-width='80px'>
          <el-form-item label='商家名称'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <!--<el-form-item label='用户活动'>-->
            <!--<el-autocomplete-->
              <!--v-model='newMerchantForm.pickActive'-->
              <!--:fetch-suggestions='querySearchAsync'-->
              <!--placeholder='请输入内容'-->
              <!--@select='handleSelect'-->
            <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <!--<el-form-item label='商家活动'>-->
            <!--<el-autocomplete-->
              <!--v-model='newMerchantForm.pickComActive'-->
              <!--:fetch-suggestions='querySearchAsync2'-->
              <!--placeholder='请输入内容'-->
              <!--@select='handleSelect2'-->
            <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <el-form-item  label='商家电话'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.mobile'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='createMerchant'>提交</el-button>
            <el-button @click='newMerchantVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改信息-->
      <el-dialog width='25%' title='修改商家' :visible.sync='resetMerchantVisible'>
        <el-form ref='resetMerchantForm' :model='resetMerchantForm' label-width='80px'>
          <el-form-item label='商家名称'>
            <el-col :span='5.5' style="width: 100%;">
              <el-input v-model='resetMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <!--<el-form-item label='用户活动'>-->
            <!--<el-autocomplete-->
              <!--v-model='resetMerchantForm.pickActive'-->
              <!--:fetch-suggestions='querySearchAsync'-->
              <!--placeholder='请输入内容'-->
              <!--@select='handleSelect'-->
            <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <!--<el-form-item label='商家活动'>-->
            <!--<el-autocomplete-->
              <!--v-model='resetMerchantForm.pickComActive'-->
              <!--:fetch-suggestions='querySearchAsync2'-->
              <!--placeholder='请输入内容'-->
              <!--@select='handleSelect2'-->
            <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <el-form-item label='商家电话'>
            <el-col :span='5.5'  style="width: 100%;">
              <el-input v-model='resetMerchantForm.mobile'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='resetMerchant(resetMerchantForm.ID)'>提交</el-button>
            <el-button @click='resetMerchantVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog width='25%' title='绑定活动' :visible.sync='bindActiveVisible'>
        <el-form ref='newMerchantForm' :model='newMerchantForm' label-width='80px'>
          <el-form-item label='用户活动'>
          <el-autocomplete
          v-model='newMerchantForm.pickActive'
          :fetch-suggestions='querySearchAsync'
          placeholder='请输入内容'
          @select='handleSelect'
          ></el-autocomplete>
          </el-form-item>
          <el-form-item label='商家活动'>
          <el-autocomplete
          v-model='newMerchantForm.pickComActive'
          :fetch-suggestions='querySearchAsync2'
          placeholder='请输入内容'
          @select='handleSelect2'
          ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='bindBtn'>绑定</el-button>
            <el-button @click='bindActiveVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
  import VueQr from 'vue-qart';
  export default {
    data() {
      return {
        config: {
          value: 'www.baidu.com' // 显示的值、跳转的地址
          // imagePath: require('../assets/logo.png') // 中间logo的地址
        },
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
        }],
        QRconfig: {
          value: '',
          imagePath: require('../../../src/assets/logo.jpg'),
          filter: 'color'
        },
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
        newMerchantVisible: false,
        QRVisible: false,
        resetMerchantVisible: false,
        bindActiveVisible: false,
        bindMsg: {
          businessActivityId: '',
          activityBusinessId: '',
          userActivityId: ''
        },
        newMerchantForm: {
          name: '',
          pickActive: '',
          pickComActive: '',
          mobile: ''
        },
        resetMerchantForm: {
          name: '',
          pickActive: '',
          pickComActive: '',
          mobile: '',
          pickActiveID: '',
          pickComActiveID: ''
        },
        // 用户活动列表
        activeList: [],
        // 商户活动列表
        activeList2: [],
        state4: '',
        timeout: null
      };
    },
    components: {
      VueQr
    },
    methods: {
      // 换页
      handleCurrentChange(key) {
        this.checkList.page = key;
        // console.log(this.checkList.page);
        this.find();
      },
      // 新建
      newMerchant () {
        this.newMerchantVisible = true;
      },
      // 时间格式
      formatDate (now) {
        var n = new Date(now);
        var year = n.getFullYear();
        var month = n.getMonth() + 1;
        var date = n.getDate();
        return year + '-' + month + '-' + date + ' ';
      },
      find () {
        let post = {
          pageSize: this.checkList.perPage,
          pageNum: this.checkList.page,
          name: this.searchOption
        };
        this.tableData = [];
        this.util.SendAjax(this, post, 'activityBusinessCrm/list').then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let Merchant = {
                activityBusinesId: res.data[i].activityBusinesId,
                businessName: res.data[i].businessName,
                ActiveName: res.data[i].userActivityName,
                ComActiveName: res.data[i].businessActivityName,
                mobile: res.data[i].mobile,
                regNum: res.data[i].registerPeopleNum,
                realNum: res.data[i].authenticationPeopleNum,
                payNum: res.data[i].depositPeopleNum,
                FrentNum: res.data[i].firstOrderPeopleNum,
                createName: res.data[i].createName,
                createTime: this.formatDate(res.data[i].createTime),
                isDelete: res.data[i].isDelete
            };
            this.tableData.push(Merchant);
          }
          this.checkList.count = res.extra.pageData.pageCount;
          this.checkList.page = res.extra.pageData.currentPage;
        });
      },
      // 生成二维码
      createQR (row) {
        console.log(row);
        if (row.ActiveName && row.ComActiveName && row.activityBusinesId) {
          let QRurl = 'http://acitivty.jingyuchuxing.com/user/index.html?businessId=' + row.activityBusinesId;
          this.QRconfig.value = QRurl;
          this.QRVisible = true;
        } else {
          this.$message({
            message: '请绑定活动后方可生成二维码',
            type: 'warning'
          });
        }
      },
      // 激活
      activate (id) {
        this.$confirm('确认要激活吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
            managerId: 160,
            businessId: id
          };
          this.util.SendAjax(this, post, 'activityBusinessCrm/activationBusiness').then((res) => {
            this.$message({
              type: 'success',
              message: '激活成功!'
            });
            this.find();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消激活'
          });
        });
      },
      // 绑定提交按钮
      bindBtn () {
        let post = {
          businessActivityId: this.bindMsg.businessActivityId,
          activityBusinessId: this.bindMsg.activityBusinessId,
          userActivityId: this.bindMsg.userActivityId,
          managerId: 160
        };
        this.util.SendAjax(this, post, 'activityBusinessCrm/bindingActivity').then((res) => {
          this.$message({
            message: '绑定成功！',
            type: 'success'
          });
          this.bindActiveVisible = false;
          this.find();
        });
      },
      // 保存提交
      createMerchant () {
          // if (this.util.isMobile(this.newMerchantForm.mobile, this)) {
            let post = {
              name: this.newMerchantForm.name,
              // activityBusinessId: this.newMerchantForm.pickComActiveID,
              // activityUserId: this.newMerchantForm.pickActiveID,
              mobile: this.newMerchantForm.mobile,
              managerId: 160
            };
            this.util.SendAjax(this, post, 'activityBusinessCrm/insert').then((res) => {
              this.newMerchantVisible = false;
              this.newMerchantForm = {
                name: '',
                pickActive: '',
                pickComActive: '',
                mobile: '',
                pickComActiveID: '',
                pickActiveID: ''
              };
              this.find();
            });
          // }
      },
      // 修改提交
      resetMerchant () {
        if (this.resetMerchantForm.mobile !== '' && this.resetMerchantForm.pickActive !== '' && this.resetMerchantForm.pickComActive !== '' && this.resetMerchantForm.name !== '') {
          // if (this.util.isMobile(this.resetMerchantForm.mobile, this)) {
          let post = {
            name: this.resetMerchantForm.name,
            // userActivityId: this.resetMerchantForm.pickActiveID,
            // businessActivityId: this.resetMerchantForm.pickComActiveID,
            mobile: this.resetMerchantForm.mobile,
            managerId: 160,
            activityBusinessId: this.resetMerchantForm.activityBusinesId
          };
          // console.log(post);
          this.util.SendAjax(this, post, 'activityBusinessCrm/update').then((res) => {
            this.$message({message: '修改成功！', type: 'success'});
            this.resetMerchantVisible = false;
            this.resetMerchantForm = {
              name: '',
              pickActive: '',
              pickComActive: '',
              mobile: '',
              pickActiveID: '',
              pickComActiveID: ''
            };
            this.find();
          });
        } else {
          this.$message({
            message: '数据不能为空',
            type: 'warning'
          });
        }
      },
      // 绑定活动
      getBindMessage (id) {
        this.bindActiveVisible = true;
        this.bindMsg.activityBusinessId = id;
      },
      // 修改信息
      changeMessage (msg) {
        let post = {
          businessId: msg.activityBusinesId
        };
        this.util.SendAjax(this, post, 'activityBusinessCrm/getActivityBusiness').then((res) => {
          this.resetMerchantVisible = true;
          this.resetMerchantForm = {
            name: res.data.businessName,
            pickActive: res.data.userActivityName,
            pickComActive: res.data.businessActivityName,
            pickActiveID: res.data.userActivityId,
            pickComActiveID: res.data.businessActivityId,
            mobile: res.data.mobile,
            activityBusinesId: res.data.activityBusinesId
          };
        });
      },
      // 解绑
      deleteMessage (msg) {
        this.$confirm('确认要解绑吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
            managerId: 160,
            activityBusinessId: msg.activityBusinesId
          };
          this.util.SendAjax(this, post, 'activityBusinessCrm/delete').then((res) => {
            this.find();
            this.$message({
              type: 'success',
              message: '解绑成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });
        });
      },
      querySearchAsync(queryString, cb) {
        let activeList = this.activeList;
        let results = queryString ? activeList.filter(this.createStateFilter(queryString)) : activeList;
        cb(results);
      },
      querySearchAsync2(queryString, cb) {
        let activeList = this.activeList2;
        let results = queryString ? activeList.filter(this.createStateFilter(queryString)) : activeList;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.bindMsg.userActivityId = item.activityId;
      },
      handleSelect2(item) {
        this.bindMsg.businessActivityId = item.activityId;
      },
      // 获取用户活动列表
      getActiveList () {
        this.util.SendAjax(this, '', 'activityBusinessCrm/byInsertBusiness').then((res) => {
          this.activeList = res.data.userList;
          this.activeList2 = res.data.businessList;
        });
      }
    },
    created () {
      this.getActiveList();
      this.find();
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
      position: absolute;
      top: 4rem;
      bottom: 0;
      width: 100%;
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
