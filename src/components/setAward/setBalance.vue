<template>
  <div v-loading='loading' class='body'>
    <el-row class='header'>
      <div class='select'>
        <el-input
          style='width: 10rem;'
          size='mini'
          placeholder='输入余额名称'
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
          prop='prizeBalanceId'
          label='ID'
          width='80'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='prizeBalanceName'
          label='标题'
          width='120'>
        </el-table-column>
        <el-table-column
          align='center'
          header-align='center'
          prop='amount'
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
      <!--Dialog 创建余额-->
      <el-dialog width='25%' title='创建余额' :visible.sync='newMerchantVisible'>
        <el-form ref='newMerchantForm' :model='newMerchantForm' label-width='90px'>
          <el-form-item label='余额名称'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label='描述'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='newMerchantForm.description'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="余额金额">
            <input
              class="myInput"
              type="text" value=""
              v-model="newMerchantForm.amount"
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
      <el-dialog width='25%' title='修改余额' :visible.sync='resetMerchantVisible'>
        <el-form ref='resetMerchantForm' :model='resetMerchantForm' label-width='90px'>
          <el-form-item label='余额名称'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='resetMerchantForm.name'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label='描述'>
            <el-col style="width: 100%;" :span='5.5'>
              <el-input v-model='resetMerchantForm.description'></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="余额金额">
            <input
              v-model="resetMerchantForm.amount"
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
        searchOption: '',
        //  表格
        tableData: [],
        //  新建弹窗
        newMerchantVisible: false,
        resetMerchantVisible: false,
        newMerchantForm: {
          name: '',
          description: '',
          resource: '0',
          amount: ''
        },
        resetMerchantForm: {
          name: '',
          description: '',
          resource: '0',
          amount: ''
        },
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
          amount: ''
        };
        this.newMerchantVisible = true;
      },
      // 搜索
      find () {
        let post = {
          pageSize: this.checkList.perPage,
          pageNum: this.checkList.page,
          name: this.searchOption
        };
        // console.log(post);
        this.tableData = [];
        this.util.SendAjax(this, post, 'balanceCrmApi/getList').then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.tableData.push(res.data[i]);
          }
          this.checkList.page = res.extra.pageData.currentPage;
          this.checkList.count = res.extra.pageData.totalCount;
        });
      },
      // 保存新建提交
      submit () {
        let post = {
          prizeBalanceName: this.newMerchantForm.name,
          amount: this.newMerchantForm.amount,
          description: this.newMerchantForm.description,
          createrId: 160
        };
        this.util.SendAjax(this, post, 'balanceCrmApi/add').then((res) => {
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
          prizeBalanceName: this.resetMerchantForm.name,
          amount: this.resetMerchantForm.amount,
          description: this.resetMerchantForm.description,
          createrId: 160,
          prizeBalanceId: id
        };
        // console.log(post);
        this.util.SendAjax(this, post, 'balanceCrmApi/update').then((res) => {
          this.$message({message: '修改成功！', type: 'success'});
          this.resetMerchantVisible = false;
          this.resetMerchantForm = {
            name: '',
            description: '',
            amount: ''
          };
          this.find();
        });
      },
      // 修改信息
      changeMessage (msg) {
        let post = {
          balanceId: msg.prizeBalanceId
        };
        this.util.SendAjax(this, post, 'balanceCrmApi/getOneBalance').then((res) => {
          this.resetMerchantForm.name = res.data.prizeBalanceName;
          this.resetMerchantForm.description = res.data.description;
          this.resetMerchantForm.ID = res.data.prizeBalanceId;
          this.resetMerchantForm.amount = res.data.amount;
          this.resetMerchantVisible = true;
        });
        },
      // 删除
      deleteMessage (msg) {
        this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
            balanceId: msg.prizeBalanceId
          };
          this.util.SendAjax(this, post, 'balanceCrmApi/delete').then((res) => {
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
      }
      }
  };
</script>

<style lang='scss' rel='stylesheet/scss'>
  .body{
    .block {
      height: 5%;
      text-align: center;
      background: white;
    }
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
