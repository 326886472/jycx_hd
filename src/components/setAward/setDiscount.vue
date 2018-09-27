<template>
  <div v-loading='loading' class='body'>
    <el-row class='header'>
      <div class='createTime'>
        <span style='color: #409EFF;'>有效期范围：</span>
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
        <span style='color: #409EFF;'>有效期天数：</span>
        <el-input
          style='width: 10rem;'
          size='mini'
          placeholder='活动天数'
          prefix-icon='el-icon-search'
          v-model='searchTimeOption'>
        </el-input>
      </div>
      <div class='select'>
        <el-input
          style='width: 10rem;'
          size='mini'
          placeholder='输入优惠券名称'
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
          prop='prizeCouponId'
          label='ID'
          width='80'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='prizeCouponName'
          label='标题'
          width='120'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='prizeCouponAmount'
          label='金额'
          width='120'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='description'
          label='描述'
          width='300'
        >
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='termDescription'
          label='时间'
          width='200'
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
            <el-button @click='deleteMessage(scope.row)' type='text' size='small'>删除</el-button>
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
      <!--Dialog 创建优惠券-->
      <el-dialog width='25%' title='创建优惠券' :visible.sync='newMerchantVisible'>
        <el-form ref='newMerchantForm' :model='newMerchantForm' label-width='90px'>
          <el-form-item label='优惠券名称'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label='描述'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.description'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="优惠券金额">
            <input
              v-model="newMerchantForm.prizeCouponAmount"
              class="myInput"
              type="text" value=""
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          </el-form-item>
          <el-form-item label="时间类型">
            <el-radio-group v-model="newMerchantForm.resource">
              <el-radio label='0'>时间段</el-radio>
              <el-radio label='1'>天数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="newMerchantForm.resource === '0'" label="时间段">
            <el-date-picker
              style='width: 100%'
              v-model='newMerchantForm.timeOption'
              type='daterange'
              value-format="yyyy-MM-dd"
              align='right'
              unlink-panels
              range-separator='至'
              start-placeholder='开始日期'
              end-placeholder='结束日期'
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item v-show="newMerchantForm.resource === '1'" label="天数">
            <input
              v-model="newMerchantForm.time"
              class="myInput"
              type="text" value=""
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='submit'>新建</el-button>
            <el-button @click='newMerchantVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改信息-->
      <el-dialog width='25%' title='修改优惠券' :visible.sync='resetMerchantVisible'>
        <el-form ref='resetMerchantForm' :model='resetMerchantForm' label-width='90px'>
          <el-form-item label='优惠券名称'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='resetMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label='描述'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='resetMerchantForm.description'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="优惠券金额">
            <input
              v-model="resetMerchantForm.prizeCouponAmount"
              class="myInput"
              type="text" value=""
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          </el-form-item>
          <el-form-item label="时间类型">
            <el-radio-group v-model="resetMerchantForm.resource">
              <el-radio label='0'>时间段</el-radio>
              <el-radio label='1'>天数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="resetMerchantForm.resource === '0'" label="时间段">
            <el-date-picker
              style='width: 100%'
              v-model='resetMerchantForm.timeOption'
              type='daterange'
              value-format="yyyy-MM-dd"
              align='right'
              unlink-panels
              range-separator='至'
              start-placeholder='开始日期'
              end-placeholder='结束日期'
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item v-show="resetMerchantForm.resource === '1'" label="天数">
            <input
              v-model="resetMerchantForm.time"
              class="myInput"
              type="text" value=""
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" />
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='resetMerchant(resetMerchantForm.ID)'>提交</el-button>
            <el-button @click='resetMerchantVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
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
        //  时间选择器
        pickerOptions: {
          shortcuts: [{
            text: '过去一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去三个月',
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
        //  搜索天数
        searchTimeOption: '',
        //  表格
        tableData: [],
        //  新建弹窗
        newMerchantVisible: false,
        resetMerchantVisible: false,
        newMerchantForm: {
          name: '',
          description: '',
          resource: '0',
          timeOption: '',
          time: '',
          prizeCouponAmount: ''
        },
        resetMerchantForm: {
          name: '',
          description: '',
          resource: '0',
          timeOption: '',
          time: '',
          prizeCouponAmount: ''
        },
        // 用户活动列表
        activeList: [],
        // 商户活动列表
        activeList2: [],
        state4: '',
        timeout: null
      };
    },
    created () {
      this.find();
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
        this.newMerchantForm = {
          name: '',
          description: '',
          resource: '0',
          timeOption: '',
          time: '',
          prizeCouponAmount: ''
        };
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
      // 搜索
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
          name: this.searchOption,
          startDate: startDate,
          endDate: endDate,
          days: this.searchTimeOption
        };
        // console.log(post);
        this.tableData = [];
        this.util.SendAjax(this, post, 'couponCrmApi/getList').then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.tableData.push(res.data[i]);
          }
         this.checkList.page = res.extra.pageData.currentPage;
         this.checkList.count = res.extra.pageData.totalCount;
        });
      },
      // 保存新建提交
      submit () {
        let startDate = this.newMerchantForm.timeOption[0];
        let endDate = this.newMerchantForm.timeOption[1];
        if (this.newMerchantForm.timeOption === '' || this.newMerchantForm.timeOption === undefined || this.newMerchantForm.timeOption === null) {
          startDate = null;
          endDate = null;
        }
        let post = {
          prizeCouponName: this.newMerchantForm.name,
          prizeCouponAmount: this.newMerchantForm.prizeCouponAmount,
          startDate: startDate,
          endDate: endDate,
          days: this.newMerchantForm.time,
          grantDateMain: this.newMerchantForm.resource,
          description: this.newMerchantForm.description,
          createrId: 160
        };
       this.util.SendAjax(this, post, 'couponCrmApi/add').then((res) => {
         this.$message({
           message: '创建成功！',
           type: 'success'
         });
         this.find();
         this.newMerchantVisible = false;
       });
      },
      // 修改提交
      resetMerchant (id) {
        // console.log(id);
          let post = {
            prizeCouponName: this.resetMerchantForm.name,
            prizeCouponAmount: this.resetMerchantForm.prizeCouponAmount,
            startDate: this.resetMerchantForm.timeOption[0],
            endDate: this.resetMerchantForm.timeOption[1],
            days: this.resetMerchantForm.time,
            grantDateMain: this.resetMerchantForm.resource,
            description: this.resetMerchantForm.description,
            createrId: 160,
            prizeCouponId: id
          };
          // console.log(post);
          this.util.SendAjax(this, post, 'couponCrmApi/update').then((res) => {
            this.$message({message: '修改成功！', type: 'success'});
            this.resetMerchantVisible = false;
            this.resetMerchantForm = {
              name: '',
              description: '',
              resource: '0',
              timeOption: '',
              time: '',
              prizeCouponAmount: ''
            };
            this.find();
          });
      },
      // 修改信息
      changeMessage (msg) {
        let post = {
          couponId: msg.prizeCouponId
        };
        this.util.SendAjax(this, post, 'couponCrmApi/getOneCoupon').then((res) => {
          let startDate = new Date(this.timestampToTime(res.data.startDate));
          let endDate = new Date(this.timestampToTime(res.data.endDate));
          this.resetMerchantForm.timeOption = [startDate, endDate];
          this.resetMerchantForm.name = res.data.prizeCouponName;
          this.resetMerchantForm.description = res.data.description;
          this.resetMerchantForm.resource = res.data.grantDateMain.toString();
          this.resetMerchantForm.time = res.data.days;
          this.resetMerchantForm.ID = res.data.prizeCouponId;
          this.resetMerchantForm.prizeCouponAmount = res.data.prizeCouponAmount;
          this.resetMerchantVisible = true;
        });
      },
      // 时间转换
      timestampToTime(timestamp) {
        let date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + ',';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ',';
        let D = date.getDate() + ',';
        return Y + M + D;
      },
      // 删除
      deleteMessage (msg) {
        this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
            couponId: msg.prizeCouponId
          };
          this.util.SendAjax(this, post, 'couponCrmApi/delete').then((res) => {
            this.find();
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
      // 获取用户活动列表
      getActiveList () {
        this.util.SendAjax(this, '', 'activityBusinessCrm/byInsertBusiness').then((res) => {
          this.activeList = res.data.userList;
          this.activeList2 = res.data.businessList;
        });
      }
    }
  };
</script>

<style lang='scss' rel='stylesheet/scss'>
  .body{
    .myInput {
      border-color: #c0c4cc;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .myInput:focus {
      border-color: #409EFF;
      outline: 0;
    }
    .block {
      height: 5%;
      text-align: center;
      background: white;
    }
    .el-input--mini .el-input__inner {padding-left: 30px!important;}
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
      border-bottom: 1px solid #e1e1e8;
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
</style>
