<template>
    <el-dialog width="85%" title="设置用户奖励" :visible.sync="userPrizeVisible">
    <el-row>
      <el-col :span="12">
        <el-form size="mini" ref="form" :model="form" label-width="85px">
          <div class="titleAlign">注册奖励{{form.regAward | formatRegAward}}</div>
          <el-form-item label="余额奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model="form.regAward.balance"
                  @blur="RegBchange(form.regAward.balance, 'balance', form.regAward, 'regAward')"
                  @select="handleSelect_1_1"
                  :disabled="form.regAward.disable.balance"
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
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="RegBchange(form.regAward.balanceNum, 'balance', form.regAward, 'regAward')" :disabled="form.regAward.disable.balance" type="number" :min='1' v-model="form.regAward.balanceNum">
                  <template slot="suffix">{{form.regAward.balanceGoodsUnit}}</template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="其他奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model="form.regAward.other"
                  @blur="RegBchange(form.regAward.other, 'other', form.regAward, 'regAward')"
                  @select="handleSelect_1_2"
                  :disabled="form.regAward.disable.other"
                  :fetch-suggestions="querySearchAsync2"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(form.regAward.otherExplain)' :title='form.regAward.otherExplain' class="el-icon-view"></i>
              </el-col>
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="RegBchange(form.regAward.otherNum, 'other', form.regAward, 'regAward')" :disabled="form.regAward.disable.other" type="number" :min='1' v-model="form.regAward.otherNum">
                  <template slot="suffix">{{form.regAward.otherGoodsUnit}}</template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-for="(i, index) in form.regAward.discount" label="优惠券奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model='i.price'
                  @blur="discountChange('regAward')"
                  @select="((item)=>{handleSelect_1_3(item, index)})"
                  :disabled="form.regAward.disable.discount"
                  :fetch-suggestions="querySearchAsyncMoney"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.termDescription }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(i.discountExplain)' :title='i.discountExplain' class="el-icon-view"></i>
              </el-col>
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="discountChange('regAward')" :disabled="form.regAward.disable.discount" type="number" :min='1' v-model="i.amount">
                  <template slot="suffix">{{i.goodsUnit}}</template>
                </el-input>
              </el-col>

              <el-col :span="1.5">
                <el-button size="mini"  @click.prevent="removeDiscount(i, 'regAward')">删除</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button type="primary" @click="addDiscount(form.regAward.discount)">添加</el-button>
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
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.realAward.balance"
                    @blur="RegBchange(form.realAward.balance, 'balance', form.realAward, 'realAward')"
                    @select="handleSelect_2_1"
                    :disabled="form.realAward.disable.balance"
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
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.realAward.balanceNum, 'balance', form.realAward, 'realAward')" :disabled="form.realAward.disable.balance" type="number" :min='1' v-model="form.realAward.balanceNum">
                    <template slot="suffix">{{form.realAward.balanceGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="其他奖励">
              <el-row :gutter="10">
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.realAward.other"
                    @blur="RegBchange(form.realAward.other, 'other', form.realAward, 'realAward')"
                    @select="handleSelect_2_2"
                    :disabled="form.realAward.disable.other"
                    :fetch-suggestions="querySearchAsync2"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.realAward.otherExplain)' :title='form.realAward.otherExplain' class="el-icon-view"></i>
                </el-col>
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.realAward.otherNum, 'other', form.realAward, 'realAward')" :disabled="form.realAward.disable.other" type="number" :min='1' v-model="form.realAward.otherNum">
                    <template slot="suffix">{{form.realAward.otherGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item v-for="(i,index) in form.realAward.discount" label="优惠券奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model='i.price'
                  @blur="discountChange('realAward')"
                  @select="((item)=>{handleSelect_2_3(item, index)})"
                  :disabled="form.realAward.disable.discount"
                  :fetch-suggestions="querySearchAsyncMoney"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.termDescription }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(i.discountExplain)' :title='i.discountExplain' class="el-icon-view"></i>
              </el-col>
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="discountChange('realAward')" :disabled="form.realAward.disable.discount" type="number" :min='1' v-model="i.amount">
                  <template slot="suffix">{{i.goodsUnit}}</template>
                </el-input>
              </el-col>

              <el-col :span="1.5">
                <el-button size="mini"  @click.prevent="removeDiscount(i, 'realAward')">删除</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button type="primary"  @click="addDiscount(form.realAward.discount)">添加</el-button>
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
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.payAward.balance"
                    @blur="RegBchange(form.payAward.balance, 'balance', form.payAward, 'payAward')"
                    @select="handleSelect_3_1"
                    :disabled="form.payAward.disable.balance"
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
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.payAward.balanceNum, 'balance', form.payAward, 'payAward')" :disabled="form.payAward.disable.balance" type="number" :min='1' v-model="form.payAward.balanceNum">
                    <template slot="suffix">{{form.payAward.balanceGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="其他奖励">
              <el-row :gutter="10">
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.payAward.other"
                    @blur="RegBchange(form.payAward.other, 'other', form.payAward, 'payAward')"
                    @select="handleSelect_3_2"
                    :disabled="form.payAward.disable.other"
                    :fetch-suggestions="querySearchAsync2"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.payAward.otherExplain)' :title='form.payAward.otherExplain' class="el-icon-view"></i>
                </el-col>
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.payAward.otherNum, 'other', form.payAward, 'payAward')" :disabled="form.payAward.disable.other" type="number" :min='1' v-model="form.payAward.otherNum">
                    <template slot="suffix">{{form.payAward.otherGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item v-for="(i, index) in form.payAward.discount" label="优惠券奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model='i.price'
                  @blur="discountChange('payAward')"
                  @select="((item)=>{handleSelect_3_3(item, index)})"
                  :disabled="form.payAward.disable.discount"
                  :fetch-suggestions="querySearchAsyncMoney"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.termDescription }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(i.discountExplain)' :title='i.discountExplain' class="el-icon-view"></i>
              </el-col>
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="discountChange('payAward')" :disabled="form.payAward.disable.discount" type="number" :min='1' v-model="i.amount">
                  <template slot="suffix">{{i.goodsUnit}}</template>
                </el-input>
              </el-col>

              <el-col :span="1.5">
                <el-button size="mini"  @click.prevent="removeDiscount(i, 'payAward')">删除</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button type="primary"  @click="addDiscount(form.payAward.discount)">添加</el-button>
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
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.FrentAward.balance"
                    @blur="RegBchange(form.FrentAward.balance, 'balance', form.FrentAward, 'FrentAward')"
                    @select="handleSelect_4_1"
                    :disabled="form.FrentAward.disable.balance"
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
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.FrentAward.balanceNum, 'balance', form.FrentAward, 'FrentAward')" :disabled="form.FrentAward.disable.balance" type="number" :min='1' v-model="form.FrentAward.balanceNum">
                    <template slot="suffix">{{form.FrentAward.balanceGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="其他奖励">
              <el-row :gutter="10">
                <el-col :span="9">
                  <el-autocomplete
                    v-model="form.FrentAward.other"
                    @blur="RegBchange(form.FrentAward.other, 'other', form.FrentAward, 'FrentAward')"
                    @select="handleSelect_4_2"
                    :disabled="form.FrentAward.disable.other"
                    :fetch-suggestions="querySearchAsync2"
                    size="mini"
                  >
                    <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                      <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                      <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.description }}</span>
                    </template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="1.5">
                  <i style="font-size: 1.6rem" @click='seeDetile(form.FrentAward.otherExplain)' :title='form.FrentAward.otherExplain' class="el-icon-view"></i>
                </el-col>
                <el-col :span="1.5">
                  <span class="demonstration">数量</span>
                </el-col>
                <el-col :span="4">
                  <el-input @change="RegBchange(form.FrentAward.otherNum, 'other', form.FrentAward, 'FrentAward')" :disabled="form.FrentAward.disable.other" type="number" :min='1' v-model="form.FrentAward.otherNum">
                    <template slot="suffix">{{form.FrentAward.otherGoodsUnit}}</template>
                  </el-input>
                </el-col>
              </el-row>
          </el-form-item>
          <el-form-item v-for="(i, index) in form.FrentAward.discount" label="优惠券奖励">
            <el-row :gutter="10">
              <el-col :span="9">
                <el-autocomplete
                  v-model='i.price'
                  @blur="discountChange('FrentAward')"
                  @select="((item)=>{handleSelect_4_3(item, index)})"
                  :disabled="form.FrentAward.disable.discount"
                  :fetch-suggestions="querySearchAsyncMoney"
                  size="mini"
                >
                  <template style="line-height: normal;padding: 7px" slot-scope="{ item }">
                    <div class="name" style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
                    <span class="addr" style="font-size: 12px; color: #b4b4b4;">{{ item.termDescription }}</span>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="1.5">
                <i style="font-size: 1.6rem" @click='seeDetile(i.discountExplain)' :title='i.discountExplain' class="el-icon-view"></i>
              </el-col>
              <el-col :span="1.5">
                <span class="demonstration">数量</span>
              </el-col>
              <el-col :span="4">
                <el-input @change="discountChange('FrentAward')" :disabled="form.FrentAward.disable.discount" type="number" :min='1' v-model="i.amount">
                  <template slot="suffix">{{i.goodsUnit}}</template>
                </el-input>
              </el-col>

              <el-col :span="1.5">
                <el-button size="mini" @click.prevent="removeDiscount(i, 'FrentAward')">删除</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button type="primary" @click="addDiscount(form.FrentAward.discount)">添加</el-button>
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
        couponList: [],
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
            balanceGoodsUnit: '',
            otherGoodsUnit: '',
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
            balanceGoodsUnit: '',
            otherGoodsUnit: '',
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
            balanceGoodsUnit: '',
            otherGoodsUnit: '',
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
            balanceGoodsUnit: '',
            otherGoodsUnit: '',
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
        userPrizeVisible: false
      };
    },
    created () {
      // TODO 活动ID
      this.getCouponList();
      this.getBalanceList();
      this.getGoodsList();
    },
    props: ['loading'],
    filters: {
      formatRegAward (ruler) {
        if (ruler.activityId || ruler.discount[0].activityId) {
          return '';
        } else {
          return '（未配置）';
        }
      }
    },
    methods: {
      getCouponList () {
        this.util.SendAjax(this, '', 'couponCrmApi/getList').then((res) => {
          this.couponList = [];
          for (let i = 0; i < res.data.length; i++) {
            let obj = {};
            obj.value = res.data[i].prizeCouponName;
            obj.description = res.data[i].description;
            obj.termDescription = res.data[i].termDescription;
            obj.goodsId = res.data[i].prizeCouponId;
            this.couponList.push(obj);
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
      // 获取设置用户奖励详细信息
      getDetail (id) {
        // console.log(id);
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
                otherGoodsUnit: '',
                balanceGoodsUnit: '',
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
                otherGoodsUnit: '',
                balanceGoodsUnit: '',
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
                otherGoodsUnit: '',
                balanceGoodsUnit: '',
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
                otherGoodsUnit: '',
                balanceGoodsUnit: '',
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
          if (data.rule1.ifBanlance) {
            this.form.regAward.balance = data.rule1.activityRuleS[0].prizeName;
            this.form.regAward.balanceNum = data.rule1.activityRuleS[0].goodsNum;
            this.form.regAward.balanceExplain = data.rule1.activityRuleS[0].description;
            this.form.regAward.balanceGoodsId = data.rule1.activityRuleS[0].goodsId;
            this.form.regAward.balanceGoodsUnit = data.rule1.activityRuleS[0].goodsUnit;
            this.form.regAward.activityId = data.rule1.activityRuleS[0].activityId;
          }
          if (data.rule1.ifGoods) {
            this.form.regAward.other = data.rule1.activityRuleS[0].prizeName;
            this.form.regAward.otherNum = data.rule1.activityRuleS[0].goodsNum;
            this.form.regAward.otherExplain = data.rule1.activityRuleS[0].description;
            this.form.regAward.otherGoodsId = data.rule1.activityRuleS[0].goodsId;
            this.form.regAward.otherGoodsUnit = data.rule1.activityRuleS[0].goodsUnit;
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
          if (data.rule2.ifBanlance) {
            this.form.realAward.balance = data.rule2.activityRuleS[0].prizeName;
            this.form.realAward.balanceNum = data.rule2.activityRuleS[0].goodsNum;
            this.form.realAward.balanceExplain = data.rule2.activityRuleS[0].description;
            this.form.realAward.balanceGoodsId = data.rule2.activityRuleS[0].goodsId;
            this.form.realAward.balanceGoodsUnit = data.rule2.activityRuleS[0].goodsUnit;
            this.form.realAward.activityId = data.rule2.activityRuleS[0].activityId;
          }
          if (data.rule2.ifGoods) {
            this.form.realAward.other = data.rule2.activityRuleS[0].prizeName;
            this.form.realAward.otherNum = data.rule2.activityRuleS[0].goodsNum;
            this.form.realAward.otherExplain = data.rule2.activityRuleS[0].description;
            this.form.realAward.otherGoodsId = data.rule2.activityRuleS[0].goodsId;
            this.form.realAward.otherGoodsUnit = data.rule2.activityRuleS[0].goodsUnit;
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
          if (data.rule3.ifBanlance) {
            this.form.payAward.balance = data.rule3.activityRuleS[0].prizeName;
            this.form.payAward.balanceNum = data.rule3.activityRuleS[0].goodsNum;
            this.form.payAward.balanceExplain = data.rule3.activityRuleS[0].description;
            this.form.payAward.balanceGoodsId = data.rule3.activityRuleS[0].goodsId;
            this.form.payAward.balanceGoodsUnit = data.rule3.activityRuleS[0].goodsUnit;
            this.form.payAward.activityId = data.rule3.activityRuleS[0].activityId;
          }
          if (data.rule3.ifGoods) {
            this.form.payAward.other = data.rule3.activityRuleS[0].prizeName;
            this.form.payAward.otherNum = data.rule3.activityRuleS[0].goodsNum;
            this.form.payAward.otherExplain = data.rule3.activityRuleS[0].description;
            this.form.payAward.otherGoodsId = data.rule3.activityRuleS[0].goodsId;
            this.form.payAward.otherGoodsUnit = data.rule3.activityRuleS[0].goodsUnit;
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
          if (data.rule4.ifBanlance) {
            this.form.FrentAward.balance = data.rule4.activityRuleS[0].prizeName;
            this.form.FrentAward.balanceNum = data.rule4.activityRuleS[0].goodsNum;
            this.form.FrentAward.balanceExplain = data.rule4.activityRuleS[0].description;
            this.form.FrentAward.balanceGoodsId = data.rule4.activityRuleS[0].goodsId;
            this.form.FrentAward.balanceGoodsUnit = data.rule4.activityRuleS[0].goodsUnit;
            this.form.FrentAward.activityId = data.rule4.activityRuleS[0].activityId;
          }
          if (data.rule4.ifGoods) {
            this.form.FrentAward.other = data.rule4.activityRuleS[0].prizeName;
            this.form.FrentAward.otherNum = data.rule4.activityRuleS[0].goodsNum;
            this.form.FrentAward.otherExplain = data.rule4.activityRuleS[0].description;
            this.form.FrentAward.otherGoodsId = data.rule4.activityRuleS[0].goodsId;
            this.form.FrentAward.otherGoodsUnit = data.rule4.activityRuleS[0].goodsUnit;
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
      // 余额奖励下拉选择
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
      // 其他奖励下拉选择
      handleSelect_1_2 (item) {
        this.form.regAward.otherExplain = item.description;
        this.form.regAward.otherGoodsId = item.goodsId;
        this.handleChange('regAward', 'other');
      },
      handleSelect_2_2 (item) {
        this.form.realAward.otherExplain = item.description;
        this.form.realAward.otherGoodsId = item.goodsId;
        this.handleChange('realAward', 'other');
      },
      handleSelect_3_2 (item) {
        this.form.payAward.otherExplain = item.description;
        this.form.payAward.otherGoodsId = item.goodsId;
        this.handleChange('payAward', 'other');
      },
      handleSelect_4_2 (item) {
        this.form.FrentAward.otherExplain = item.description;
        this.form.FrentAward.otherGoodsId = item.goodsId;
        this.handleChange('FrentAward', 'other');
      },
      // 优惠券奖励下拉选择
      handleSelect_1_3 (item, index) {
        this.form.regAward.discount[index].discountExplain = item.description;
        this.form.regAward.discount[index].discountGoodsId = item.goodsId;
        this.discountChange('regAward');
      },
      handleSelect_2_3 (item, index) {
        this.form.realAward.discount[index].discountExplain = item.description;
        this.form.realAward.discount[index].discountGoodsId = item.goodsId;
        this.discountChange('realAward');
      },
      handleSelect_3_3 (item, index) {
        this.form.payAward.discount[index].discountExplain = item.description;
        this.form.payAward.discount[index].discountGoodsId = item.goodsId;
        this.discountChange('payAward');
      },
      handleSelect_4_3 (item, index) {
        this.form.FrentAward.discount[index].discountExplain = item.description;
        this.form.FrentAward.discount[index].discountGoodsId = item.goodsId;
        this.discountChange('FrentAward');
      },
      // 获取余额奖励列表
      querySearchAsync1(queryString, cb) {
        var restaurants = this.balanceList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      },
      // 获取其他奖励列表
      querySearchAsync2(queryString, cb) {
        var restaurants = this.otherList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      // 获取代金券列表
      querySearchAsyncMoney(queryString, cb) {
        var restaurants = this.couponList;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
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
            // TODO
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
        // this.userPrizeVisible = false;
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
            awardType = 1;
            goodsNum[0] = this.form.regAward.balanceNum;
            goodsId[0] = this.form.regAward.balanceGoodsId;
          }
          if (this.form.regAward.disable.other === false) {
            awardType = 3;
            goodsNum[0] = this.form.regAward.otherNum;
            goodsId[0] = this.form.regAward.otherGoodsId;
          }
          if (this.form.regAward.disable.discount === false) {
            awardType = 2;
            for (let i = 0; i < this.form.regAward.discount.length; i++) {
              goodsNum[i] = this.form.regAward.discount[i].amount;
              goodsId[i] = this.form.regAward.discount[i].discountGoodsId;
            }
          }
        } else if (type === 2) {
          activityId = this.activeId.real;
          title = '实名奖励';
          objects = '1';
          if (this.form.realAward.disable.balance === false) {
            awardType = 1;
            goodsNum[0] = this.form.realAward.balanceNum;
            goodsId[0] = this.form.realAward.balanceGoodsId;
          }
          if (this.form.realAward.disable.other === false) {
            awardType = 3;
            goodsNum[0] = this.form.realAward.otherNum;
            goodsId[0] = this.form.realAward.otherGoodsId;
          }
          if (this.form.realAward.disable.discount === false) {
            awardType = 2;
            for (let i = 0; i < this.form.realAward.discount.length; i++) {
              goodsNum[i] = this.form.realAward.discount[i].amount;
              goodsId[i] = this.form.realAward.discount[i].discountGoodsId;
            }
          }
        } else if (type === 3) {
          activityId = this.activeId.pay;
          title = '押金奖励';
          objects = '1';
          if (this.form.payAward.disable.balance === false) {
            awardType = 1;
            goodsNum[0] = this.form.payAward.balanceNum;
            goodsId[0] = this.form.payAward.balanceGoodsId;
          }
          if (this.form.payAward.disable.other === false) {
            awardType = 3;
            goodsNum[0] = this.form.payAward.otherNum;
            goodsId[0] = this.form.payAward.otherGoodsId;
          }
          if (this.form.payAward.disable.discount === false) {
            awardType = 2;
            for (let i = 0; i < this.form.payAward.discount.length; i++) {
              goodsNum[i] = this.form.payAward.discount[i].amount;
              goodsId[i] = this.form.payAward.discount[i].discountGoodsId;
            }
          }
        } else if (type === 4) {
          activityId = this.activeId.Frent;
          title = '首租奖励';
          objects = '1';
          if (this.form.FrentAward.disable.balance === false) {
            awardType = 1;
            goodsNum[0] = this.form.FrentAward.balanceNum;
            goodsId[0] = this.form.FrentAward.balanceGoodsId;
          }
          if (this.form.FrentAward.disable.other === false) {
            awardType = 3;
            goodsNum[0] = this.form.FrentAward.otherNum;
            goodsId[0] = this.form.FrentAward.otherGoodsId;
          }
          if (this.form.FrentAward.disable.discount === false) {
            awardType = 2;
            for (let i = 0; i < this.form.FrentAward.discount.length; i++) {
              goodsNum[i] = this.form.FrentAward.discount[i].amount;
              goodsId[i] = this.form.FrentAward.discount[i].discountGoodsId;
            }
          }
        }
        let list = [];
        if (awardType === 2 && (goodsNum[0] === '' || goodsNum[0] === undefined)) {
          list = [{
            goodsId: ''
          }];
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
        if (list !== [] && list[0].goodsId) {
            let post1 = JSON.stringify(post);
            this.util.SendAjax(this, post1, 'activityCrmApi/updateActivityRule').then((res) => {
              // console.log(post);
              // console.log(post.activityT);
              // TODO
              this.getDetail(post.activityT.parentActivityId);
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
            });
        } else {
          this.$message({
            type: 'warning',
            message: '至少选择一种奖励及数量'
          });
        }
      },
      changeLoading () {
        this.$emit('loadingChange', 1);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-input--mini .el-input__inner {padding-left: 30px!important;}
  .el-input__inner {
    padding: 0 10px !important;
  }

  .el-autocomplete {
    width: 100% !important;
  }

</style>
