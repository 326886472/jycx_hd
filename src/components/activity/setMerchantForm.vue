<template>
  <el-dialog width="50%" title="设置商户奖励" :visible.sync="MerchantPrizeVisible">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="注册奖励">
        <!--<el-input v-model="form.regAward"></el-input>-->
        <el-row :gutter="10">
          <el-col :span="20">
            <el-autocomplete
              style="width: 100%"
              :size="medium"
              v-model="form.regAward.name"
              @select="((item)=>{handleSelect(item, form.regAward)})"
              :fetch-suggestions="querySearchAsync"
              size="mini"
            >
              <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="2" style="line-height: 3.3rem">
            <i style="font-size: 1.6rem" @click='seeDetile(form.regAward.describe)' :title='form.regAward.describe' class="el-icon-view"></i>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="实名奖励">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-autocomplete
              style="width: 100%"
              :size="medium"
              v-model="form.realAward.name"
              @select="((item)=>{handleSelect(item, form.realAward)})"
              :fetch-suggestions="querySearchAsync"
              size="mini"
            >
              <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="2" style="line-height: 3.3rem">
            <i style="font-size: 1.6rem" @click='seeDetile(form.realAward.describe)' :title='form.realAward.describe' class="el-icon-view"></i>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="押金奖励">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-autocomplete
              style="width: 100%"
              :size="medium"
              v-model="form.payAward.name"
              @select="((item)=>{handleSelect(item, form.payAward)})"
              :fetch-suggestions="querySearchAsync"
              size="mini"
            >
              <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="2" style="line-height: 3.3rem">
            <i style="font-size: 1.6rem" @click='seeDetile(form.payAward.describe)' :title='form.payAward.describe' class="el-icon-view"></i>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="首租奖励">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-autocomplete
              style="width: 100%"
              :size="medium"
              v-model="form.FrentAward.name"
              @select="((item)=>{handleSelect(item, form.FrentAward)})"
              :fetch-suggestions="querySearchAsync"
              size="mini"
            >
              <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="2" style="line-height: 3.3rem">
            <i style="font-size: 1.6rem" @click='seeDetile(form.FrentAward.describe)' :title='form.FrentAward.describe' class="el-icon-view"></i>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">立即创建</el-button>
        <el-button @click="MerchantPrizeVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        form: {
          regAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          realAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          payAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          FrentAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          }
        },
        cashList: [],
        MerchantPrizeVisible: false
      };
    },
    props: ['loading'],
    created () {
      this.getCashList();
    },
    methods: {
      // 选择下拉选项
      handleSelect (item, i) {
        i.describe = item.description;
        i.goodsId = item.goodsId;
      },
      // 获取列表
      getCashList () {
        this.util.SendAjax(this, '', 'cashCrmApi/getList').then((res) => {
          this.cashList = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {};
            obj.value = res.data[i].prizeCashName;
            obj.description = res.data[i].description;
            obj.goodsId = res.data[i].prizeCashId;
            this.cashList.push(obj);
          }
          // console.log(this.cashList);
        });
      },
      // 查看详情
      seeDetile (msg) {
        this.$alert(msg, '描述', {
          confirmButtonText: '确定'
        });
      },
      // 获取现金奖励列表
      querySearchAsync(queryString, cb) {
        var restaurants = this.cashList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // TODO
      onSubmit () {
        let post = {
          activityT: {
          }
        };
        this.SendAjax(this, post, 'activityCrmApi/updateActivityRule').then((res) => {
        });
        this.MerchantPrizeVisible = false;
        this.form = {
          regAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          realAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          payAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          },
          FrentAward: {
            name: '',
            num: '',
            describe: '',
            goodsId: ''
          }
        };
        this.changeLoading();
      },
      changeLoading () {
        this.$emit('loadingChange', 1);
      }
    }
  };
</script>
