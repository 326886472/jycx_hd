<template>
    <el-dialog width="70%" title="设置商户奖励" :visible.sync="MerchantPrizeVisible">
    <el-row>
      <el-col :span="12">
        <el-form size="mini" ref="form" :model="form" label-width="85px">
          <div class="titleAlign">注册奖励{{form.regAward | formatRegAward}}</div>
          <el-form-item label="余额奖励">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-autocomplete
                  v-model="form.regAward.balance"
                  @blur="RegBchange(form.regAward.balance, 'balance', form.regAward, 'regAward')"
                  @select="handleSelect_1_1"
                  :fetch-suggestions="querySearchAsync1"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(form.regAward.balanceExplain)' :title='form.regAward.balanceExplain' class="el-icon-view"></i>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-col :span="12" style="text-align: center">
              <el-button type="success"  @click="onSubmit(1)">保存</el-button>
            </el-col>
            <el-col :span="12" >
              <el-button type="danger"  @click="deleteDom('regAward','删除注册奖励')">删除注册奖励</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form size="mini" ref="form" :model="form" label-width="85px">
          <div class="titleAlign">实名奖励{{form.realAward | formatRegAward}}</div>
          <el-form-item label="余额奖励">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-autocomplete
                    v-model="form.realAward.balance"
                    @blur="RegBchange(form.realAward.balance, 'balance', form.realAward, 'realAward')"
                    @select="handleSelect_2_1"
                    :fetch-suggestions="querySearchAsync1"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.realAward.balanceExplain)' :title='form.realAward.balanceExplain' class="el-icon-view"></i>
                </el-col>
              </el-row>
          </el-form-item>


          <el-form-item>
            <el-col :span="12" style="text-align: center">
              <el-button type="success"  @click="onSubmit(2)">保存</el-button>
            </el-col>
            <el-col :span="12" >
              <el-button type="danger"  @click="deleteDom('realAward','删除实名奖励')">删除实名奖励</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form  size="mini" ref="form" :model="form" label-width="85px">
          <div class="titleAlign">押金奖励{{form.payAward | formatRegAward}}</div>
          <el-form-item label="余额奖励">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-autocomplete
                    v-model="form.payAward.balance"
                    @blur="RegBchange(form.payAward.balance, 'balance', form.payAward, 'payAward')"
                    @select="handleSelect_3_1"
                    :fetch-suggestions="querySearchAsync1"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.payAward.balanceExplain)' :title='form.payAward.balanceExplain' class="el-icon-view"></i>
                </el-col>
              </el-row>
          </el-form-item>


          <el-form-item>
            <el-col :span="12" style="text-align: center">
              <el-button type="success"   @click="onSubmit(3)">保存</el-button>
            </el-col>
            <el-col :span="12" >
              <el-button type="danger"   @click="deleteDom('payAward','删除押金奖励')">删除押金奖励</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form size="mini" ref="form" :model="form" label-width="85px">
          <div class="titleAlign">首租奖励{{form.FrentAward | formatRegAward}}</div>
          <el-form-item label="余额奖励">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-autocomplete
                    v-model="form.FrentAward.balance"
                    @blur="RegBchange(form.FrentAward.balance, 'balance', form.FrentAward, 'FrentAward')"
                    @select="handleSelect_4_1"
                    :fetch-suggestions="querySearchAsync1"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.FrentAward.balanceExplain)' :title='form.FrentAward.balanceExplain' class="el-icon-view"></i>
                </el-col>
              </el-row>
          </el-form-item>


          <el-form-item>
            <el-col :span="12" style="text-align: center">
              <el-button type="success" @click="onSubmit(4)">保存</el-button>
            </el-col>
            <el-col :span="12" >
              <el-button type="danger" @click="deleteDom('FrentAward','删除首租奖励')">删除首租奖励</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        activeId: {
          reg: '',
          real: '',
          pay: '',
          Frent: ''
        },
        balanceList: [],
        otherList: [],
        cashList: [],
        form: {
          // 删除奖励节点
          regAward: {
            balance: '',
            balanceExplain: '',
            balanceGoodsId: '',
            other: '',
            otherExplain: '',
            otherGoodsId: '',
            balanceNum: '',
            otherNum: '',
            goodsUnit: '',
            discount: [{
              amount: '',
              price: '',
              discountExplain: '',
              discountGoodsId: '',
              goodsUnit: ''
            }],
            disable: {
              balance: false,
              other: false,
              discount: false
            }
          },
          realAward: {
            balance: '',
            balanceExplain: '',
            balanceGoodsId: '',
            other: '',
            otherExplain: '',
            otherGoodsId: '',
            balanceNum: '',
            otherNum: '',
            goodsUnit: '',
            discount: [{
              amount: '',
              price: '',
              discountExplain: '',
              discountGoodsId: '',
              goodsUnit: ''
            }],
            disable: {
              balance: false,
              other: false,
              discount: false
            }
          },
          payAward: {
            balance: '',
            balanceExplain: '',
            balanceGoodsId: '',
            other: '',
            otherExplain: '',
            otherGoodsId: '',
            balanceNum: '',
            otherNum: '',
            goodsUnit: '',
            discount: [{
              amount: '',
              price: '',
              discountExplain: '',
              discountGoodsId: '',
              goodsUnit: ''
            }],
            disable: {
              balance: false,
              other: false,
              discount: false
            }
          },
          FrentAward: {
            balance: '',
            balanceExplain: '',
            balanceGoodsId: '',
            other: '',
            otherExplain: '',
            otherGoodsId: '',
            balanceNum: '',
            otherNum: '',
            goodsUnit: '',
            discount: [{
              amount: '',
              price: '',
              discountExplain: '',
              discountGoodsId: '',
              goodsUnit: ''
            }],
            disable: {
              balance: false,
              other: false,
              discount: false
            }
          }
        },
        MerchantPrizeVisible: false
      };
    },
    created () {
      // TODO 活动ID
      this.getCashList();
    },
    filters: {
      formatRegAward (ruler) {
        if (ruler.activityId || ruler.discount[0].activityId) {
          return '';
        } else {
          return '（未配置）';
        }
      }
    },
    props: ['loading'],
    methods: {
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
        });
      },
      getBalanceList () {
        this.util.SendAjax(this, '', 'balanceCrmApi/getList').then((res) => {
          this.balanceList = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {};
            obj.value = res.data[i].prizeBalanceName;
            obj.description = res.data[i].description;
            obj.goodsId = res.data[i].prizeBalanceId;
            this.balanceList.push(obj);
          }
        });
      },
      getGoodsList () {
        this.util.SendAjax(this, '', 'goodsCrmApi/getList').then((res) => {
          this.otherList = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {};
            obj.value = res.data[i].prizeGoodsName;
            obj.description = res.data[i].description;
            obj.goodsId = res.data[i].prizeGoodsId;
            this.otherList.push(obj);
          }
        });
      },
      getDetail (id) {
        let post = {
          parentId: id
        };
        this.changeLoading();
        this.util.SendAjax(this, post, 'activityCrmApi/getActivityRule').then((res) => {
          this.form = {
            // 删除奖励节点
            regAward: {
              balance: '',
                balanceExplain: '',
                balanceGoodsId: '',
                other: '',
                otherExplain: '',
                otherGoodsId: '',
                balanceNum: '',
                otherNum: '',
                goodsUnit: '',
                discount: [{
                amount: '',
                price: '',
                discountExplain: '',
                discountGoodsId: '',
                goodsUnit: ''
              }],
                disable: {
                balance: false,
                  other: false,
                  discount: false
              }
            },
            realAward: {
              balance: '',
                balanceExplain: '',
                balanceGoodsId: '',
                other: '',
                otherExplain: '',
                otherGoodsId: '',
                balanceNum: '',
                otherNum: '',
                goodsUnit: '',
                discount: [{
                amount: '',
                price: '',
                discountExplain: '',
                discountGoodsId: '',
                goodsUnit: ''
              }],
                disable: {
                balance: false,
                  other: false,
                  discount: false
              }
            },
            payAward: {
              balance: '',
                balanceExplain: '',
                balanceGoodsId: '',
                other: '',
                otherExplain: '',
                otherGoodsId: '',
                balanceNum: '',
                otherNum: '',
                goodsUnit: '',
                discount: [{
                amount: '',
                price: '',
                discountExplain: '',
                discountGoodsId: '',
                goodsUnit: ''
              }],
                disable: {
                balance: false,
                  other: false,
                  discount: false
              }
            },
            FrentAward: {
              balance: '',
                balanceExplain: '',
                balanceGoodsId: '',
                other: '',
                otherExplain: '',
                otherGoodsId: '',
                balanceNum: '',
                otherNum: '',
                goodsUnit: '',
                discount: [{
                amount: '',
                price: '',
                discountExplain: '',
                discountGoodsId: '',
                goodsUnit: ''
              }],
                disable: {
                balance: false,
                  other: false,
                  discount: false
              }
            }
          };
          this.format(res);
          this.changeLoading();
          this.form.parentActivityId = id;
        });
      },
      format (res) {
        let data = res.data;
        if (data.rule1) {
          this.activeId.reg = data.rule1.activityRuleS[0].activityId;
          this.form.regAward.disable.balance = !data.rule1.ifBanlance;
          this.form.regAward.disable.other = !data.rule1.ifGoods;
          this.form.regAward.disable.discount = !data.rule1.ifCoupon;
          this.form.regAward.discount = [];
          if (data.rule1.ifCash) {
            this.form.regAward.balance = data.rule1.activityRuleS[0].prizeName;
            this.form.regAward.balanceNum = data.rule1.activityRuleS[0].goodsNum;
            this.form.regAward.balanceExplain = data.rule1.activityRuleS[0].description;
            this.form.regAward.balanceGoodsId = data.rule1.activityRuleS[0].goodsId;
            this.form.regAward.goodsUnit = data.rule1.activityRuleS[0].goodsUnit;
            this.form.regAward.activityId = data.rule1.activityRuleS[0].activityId;
          }
          if (data.rule1.ifGoods) {
            this.form.regAward.other = data.rule1.activityRuleS[0].prizeName;
            this.form.regAward.otherNum = data.rule1.activityRuleS[0].goodsNum;
            this.form.regAward.otherExplain = data.rule1.activityRuleS[0].description;
            this.form.regAward.otherGoodsId = data.rule1.activityRuleS[0].goodsId;
            this.form.regAward.goodsUnit = data.rule1.activityRuleS[0].goodsUnit;
            this.form.regAward.activityId = data.rule1.activityRuleS[0].activityId;
          };
          if (data.rule1.ifCoupon) {
            let list = data.rule1.activityRuleS;
            for (let i = 0; i < list.length; i++) {
              let coupon = {
                amount: list[i].goodsNum,
                price: list[i].prizeName,
                discountExplain: list[i].description,
                discountGoodsId: list[i].goodsId,
                goodsUnit: list[i].goodsUnit,
                activityId: list[i].activityId
              };
              this.form.regAward.discount.push(coupon);
            }
          } else {
            this.form.regAward.discount = [{
              amount: '',
              price: '',
              discountExplain: '',
              goodsUnit: '',
              activityId: ''
            }];
          }
        }

        if (data.rule2) {
          this.activeId.real = data.rule2.activityRuleS[0].activityId;
          this.form.realAward.disable.balance = !data.rule2.ifBanlance;
          this.form.realAward.disable.other = !data.rule2.ifGoods;
          this.form.realAward.disable.discount = !data.rule2.ifCoupon;
          this.form.realAward.discount = [];
          if (data.rule2.ifCash) {
            this.form.realAward.balance = data.rule2.activityRuleS[0].prizeName;
            this.form.realAward.balanceNum = data.rule2.activityRuleS[0].goodsNum;
            this.form.realAward.balanceExplain = data.rule2.activityRuleS[0].description;
            this.form.realAward.balanceGoodsId = data.rule2.activityRuleS[0].goodsId;
            this.form.realAward.goodsUnit = data.rule2.activityRuleS[0].goodsUnit;
            this.form.realAward.activityId = data.rule2.activityRuleS[0].activityId;
          }
          if (data.rule2.ifGoods) {
            this.form.realAward.other = data.rule2.activityRuleS[0].prizeName;
            this.form.realAward.otherNum = data.rule2.activityRuleS[0].goodsNum;
            this.form.realAward.otherExplain = data.rule2.activityRuleS[0].description;
            this.form.realAward.otherGoodsId = data.rule2.activityRuleS[0].goodsId;
            this.form.realAward.goodsUnit = data.rule2.activityRuleS[0].goodsUnit;
            this.form.realAward.activityId = data.rule2.activityRuleS[0].activityId;
          };
          if (data.rule2.ifCoupon) {
            let list = data.rule2.activityRuleS;
            for (let i = 0; i < list.length; i++) {
              let coupon = {
                amount: list[i].goodsNum,
                price: list[i].prizeName,
                discountExplain: list[i].description,
                discountGoodsId: list[i].goodsId,
                goodsUnit: list[i].goodsUnit,
                activityId: list[i].activityId
              };
              this.form.realAward.discount.push(coupon);
            }
          } else {
            this.form.realAward.discount = [{
              amount: '',
              price: '',
              discountExplain: '',
              goodsUnit: '',
              activityId: ''
            }];
          }
        }

        if (data.rule3) {
          this.activeId.pay = data.rule3.activityRuleS[0].activityId;
          this.form.payAward.disable.balance = !data.rule3.ifBanlance;
          this.form.payAward.disable.other = !data.rule3.ifGoods;
          this.form.payAward.disable.discount = !data.rule3.ifCoupon;
          this.form.payAward.discount = [];
          if (data.rule3.ifCash) {
            this.form.payAward.balance = data.rule3.activityRuleS[0].prizeName;
            this.form.payAward.balanceNum = data.rule3.activityRuleS[0].goodsNum;
            this.form.payAward.balanceExplain = data.rule3.activityRuleS[0].description;
            this.form.payAward.balanceGoodsId = data.rule3.activityRuleS[0].goodsId;
            this.form.payAward.goodsUnit = data.rule3.activityRuleS[0].goodsUnit;
            this.form.payAward.activityId = data.rule3.activityRuleS[0].activityId;
          }
          if (data.rule3.ifGoods) {
            this.form.payAward.other = data.rule3.activityRuleS[0].prizeName;
            this.form.payAward.otherNum = data.rule3.activityRuleS[0].goodsNum;
            this.form.payAward.otherExplain = data.rule3.activityRuleS[0].description;
            this.form.payAward.otherGoodsId = data.rule3.activityRuleS[0].goodsId;
            this.form.payAward.goodsUnit = data.rule3.activityRuleS[0].goodsUnit;
            this.form.payAward.activityId = data.rule3.activityRuleS[0].activityId;
          };
          if (data.rule3.ifCoupon) {
            let list = data.rule3.activityRuleS;
            for (let i = 0; i < list.length; i++) {
              let coupon = {
                amount: list[i].goodsNum,
                price: list[i].prizeName,
                discountExplain: list[i].description,
                discountGoodsId: list[i].goodsId,
                goodsUnit: list[i].goodsUnit,
                activityId: list[i].activityId
              };
              this.form.payAward.discount.push(coupon);
            }
          } else {
            this.form.payAward.discount = [{
              amount: '',
              price: '',
              discountExplain: '',
              goodsUnit: '',
              activityId: ''
            }];
          }
        }

        if (data.rule4) {
          this.activeId.Frent = data.rule4.activityRuleS[0].activityId;
          this.form.FrentAward.disable.balance = !data.rule4.ifBanlance;
          this.form.FrentAward.disable.other = !data.rule4.ifGoods;
          this.form.FrentAward.disable.discount = !data.rule4.ifCoupon;
          this.form.FrentAward.discount = [];
          if (data.rule4.ifCash) {
            this.form.FrentAward.balance = data.rule4.activityRuleS[0].prizeName;
            this.form.FrentAward.balanceNum = data.rule4.activityRuleS[0].goodsNum;
            this.form.FrentAward.balanceExplain = data.rule4.activityRuleS[0].description;
            this.form.FrentAward.balanceGoodsId = data.rule4.activityRuleS[0].goodsId;
            this.form.FrentAward.goodsUnit = data.rule4.activityRuleS[0].goodsUnit;
            this.form.FrentAward.activityId = data.rule4.activityRuleS[0].activityId;
          }
          if (data.rule4.ifGoods) {
            this.form.FrentAward.other = data.rule4.activityRuleS[0].prizeName;
            this.form.FrentAward.otherNum = data.rule4.activityRuleS[0].goodsNum;
            this.form.FrentAward.otherExplain = data.rule4.activityRuleS[0].description;
            this.form.FrentAward.otherGoodsId = data.rule4.activityRuleS[0].goodsId;
            this.form.FrentAward.goodsUnit = data.rule4.activityRuleS[0].goodsUnit;
            this.form.FrentAward.activityId = data.rule4.activityRuleS[0].activityId;
          };
          if (data.rule4.ifCoupon) {
            let list = data.rule4.activityRuleS;
            for (let i = 0; i < list.length; i++) {
              let coupon = {
                amount: list[i].goodsNum,
                price: list[i].prizeName,
                discountExplain: list[i].description,
                discountGoodsId: list[i].goodsId,
                goodsUnit: list[i].goodsUnit,
                activityId: list[i].activityId
              };
              this.form.FrentAward.discount.push(coupon);
            }
          } else {
            this.form.FrentAward.discount = [{
              amount: '',
              price: '',
              discountExplain: '',
              goodsUnit: '',
              activityId: ''
            }];
          }
        }
      },
      // 现金奖励下拉选择
      handleSelect_1_1 (item) {
        this.form.regAward.balanceExplain = item.description;
        this.form.regAward.balanceGoodsId = item.goodsId;
        this.handleChange('regAward', 'balance');
      },
      handleSelect_2_1 (item) {
        this.form.realAward.balanceExplain = item.description;
        this.form.realAward.balanceGoodsId = item.goodsId;
        this.handleChange('realAward', 'balance');
      },
      handleSelect_3_1 (item) {
        this.form.payAward.balanceExplain = item.description;
        this.form.payAward.balanceGoodsId = item.goodsId;
        this.handleChange('payAward', 'balance');
      },
      handleSelect_4_1 (item) {
        this.form.FrentAward.balanceExplain = item.description;
        this.form.FrentAward.balanceGoodsId = item.goodsId;
        this.handleChange('FrentAward', 'balance');
      },
      // 获取余额奖励
      querySearchAsync1(queryString, cb) {
        var restaurants = this.cashList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      },
      // 查看详情
      seeDetile (msg) {
        this.$alert(msg, '描述', {
          confirmButtonText: '确定'
        });
      },
      // 获取代价券有效期时间列表
      // querySearchAsyncDay(queryString, cb) {
      //   var restaurants = this.dayList;
      //   var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      //   clearTimeout(this.timeout);
      //   this.timeout = setTimeout(() => {
      //     cb(results);
      //   }, 300 * Math.random());
      // },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      removeDiscount (discount, position) {
        let index = this.form[position].discount.indexOf(discount);
        if (index !== -1 && this.form[position].discount.length > 1) {
          this.form[position].discount.splice(index, 1);
        } else {
          this.$message({
            message: '至少保留一条',
            type: 'warning'
          });
        }
      },
      deleteDom (node, val) {
        this.$confirm('确认' + val + '?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let activityId;
          if (this.form[node].activityId) {
            activityId = this.form[node].activityId;
          } else if (this.form[node].discount[0].activityId) {
            activityId = this.form[node].discount[0].activityId;
          }
          let post = {
            activityId: activityId
          };
          this.util.SendAjax(this, post, 'activityCrmApi/deleteActivityRule').then((res) => {
            this.form[node] = {
              balance: '',
              balanceExplain: '',
              other: '',
              otherExplain: '',
              balanceNum: '',
              otherNum: '',
              discount: [{
                amount: '',
                price: '',
                discountExplain: ''
              }],
              disable: {
                balance: false,
                other: false,
                discount: false
              }
            };
            this.$message({
              type: 'success',
              message: '已' + val
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addDiscount (list) {
        if (list.length < 5) {
          list.push({
            amount: '',
            price: '',
            discountExplain: ''
          });
        } else {
          this.$message({
            message: '优惠券最多5种',
            type: 'warning'
          });
        }
      },
      // 改变input的值
      RegBchange (value, position, init, type) {
          if (value !== '') {
            init.disable.balance = true;
            init.disable.other = true;
            init.disable.discount = true;
            init.disable[position] = false;
          } else {
            this.form[type] = {
              balance: '',
              other: '',
              discount: [{
                amount: '',
                price: '',
                discountExplain: ''
              }],
              disable: {
                balance: false,
                other: false,
                discount: false
              }
            };
          }
        },
      // 在选择一个活动奖励后将其他选项屏蔽
      handleChange (position, type) {
        let form = this.form;
        form[position].disable.balance = true;
        form[position].disable.other = true;
        form[position].disable.discount = true;
        form[position].disable[type] = false;
      },
      discountChange (position) {
          var flag = 0;
          let Award = this.form[position];
          for (let i = 0; i < Award.discount.length; i++) {
            if (Award.discount[i].price !== '' || Award.discount[i].amount !== '') {
              flag++;
            }
          }
          if (flag !== 0) {
            Award.balance = '';
            Award.other = '';
            Award.disable.balance = true;
            Award.disable.other = true;
          } else {
            Award.disable.balance = false;
            Award.disable.other = false;
          }
      },
      // TODO
      onSubmit (type) {
        // this.MerchantPrizeVisible = false;
        let objects;
        let title;
        let activityId;
        let awardType;
        let goodsNum = [];
        let goodsId = [];
        if (type === 1) {
          activityId = this.activeId.reg;
          objects = '0';
          title = '注册奖励';
          if (this.form.regAward.disable.balance === false) {
            awardType = 4;
            goodsNum[0] = 1;
            goodsId[0] = this.form.regAward.balanceGoodsId;
          }
        } else if (type === 2) {
          activityId = this.activeId.real;
          title = '实名奖励';
          objects = '1';
          if (this.form.realAward.disable.balance === false) {
            awardType = 4;
            goodsNum[0] = '1';
            goodsId[0] = this.form.realAward.balanceGoodsId;
          }
        } else if (type === 3) {
          activityId = this.activeId.pay;
          title = '押金奖励';
          objects = '1';
          if (this.form.payAward.disable.balance === false) {
            awardType = 4;
            goodsNum[0] = '1';
            goodsId[0] = this.form.payAward.balanceGoodsId;
          }
        } else if (type === 4) {
          activityId = this.activeId.Frent;
          title = '首租奖励';
          objects = '1';
          if (this.form.FrentAward.disable.balance === false) {
            awardType = 4;
            goodsNum[0] = '1';
            goodsId[0] = this.form.FrentAward.balanceGoodsId;
          }
        }
        let list = [];
        if (awardType === 3 && (goodsNum[0] === '' || goodsNum[0] === undefined)) {
          list = [];
        } else {
          for (let i = 0; i < goodsId.length; i++) {
            // 数据清空点保存时不传activityRuleS
            let obj = {
              type: awardType,
              goodsNum: goodsNum[i],
              goodsId: goodsId[i]
            };
            list.push(obj);
          }
        }
        let post = {
          activityT: {
            activityId: activityId,
            objects: objects,
            type: type,
            title: title,
            parentActivityId: this.form.parentActivityId
          },
          activityRuleS: list
        };
        let post1 = JSON.stringify(post);
        this.util.SendAjax(this, post1, 'activityCrmApi/updateActivityRule').then((res) => {
          this.getDetail(post.activityT.parentActivityId);
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
        });
      },
      changeLoading () {
        this.$emit('loadingChange', 1);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-input__inner {
    padding: 0 10px !important;
  }

  .el-autocomplete {
    width: 100% !important;
  }

</style>
