/**
 * Created by sleep on 16/12/29.
 */
import Vue from 'vue';

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export default {
  getLoadIngPack: {
    pngQuadrate: '/static/loadIngPack/44-44.png', // 正方形loading
    pngRectangleBiger: '/static/loadIngPack/1920-620.png', // 长方形
    pngRectangle: '/static/loadIngPack/296-205.png'  // 有点长的长方形
  },
  Log: console.log.bind(console),
  logj(res) {
    this.Log(JSON.stringify(res));
  },
  sendAjax(_this, post, url) {
    _this.loading = true;
    let p = new Promise((resolve, reject) => {
      _this.$http.post(Vue.prototype.config.baseUrl + url, post).then(res => {
        // _this.loading = false;
        if (res.data.return_code === 0) {
          resolve(res.data);
          _this.loading = false;
        } else {
          _this.loading = false;
          _this.$message.error(res.data.return_msg);
        }
      }, err => {
        reject(err);
        _this.loading = false;
        _this.$message.error('网络超时');
      });
    });
    return p;
  },
  SendAjax(_this, post, url) {
      _this.loading = true;
    let p = new Promise((resolve, reject) => {
      _this.$http.post(Vue.prototype.config.activeUrl + url, post).then(res => {
        // _this.loading = false;
        if (res.data.code === 0) {
          resolve(res.data);
          _this.loading = false;
        } else {
          _this.loading = false;
          _this.$message.error(res.data.message);
        }
      }, err => {
        reject(err);
          _this.loading = false;
          _this.$message.error('网络超时');
      });
    });
    return p;
  },
  // sendAjax(_this, post, formData) {
  //   _this.loading = true;
  //
  //   let p = new Promise((resolve, reject) => {
  //     if (formData) {
  //       post = this._formData(post);
  //     }
  //     _this.$http.post(Vue.prototype.config.api, post).then(res => {
  //       switch (res.data.code) {
  //         case 1:
  //           resolve(res.data);
  //           break;
  //         case -6:
  //         case -14:
  //           _this.$cookie.delete('adminToken');
  //           _this.$cookie.delete('adminUsername');
  //           _this.$router.replace('/login');
  //           _this.$nextTick(() => {
  //             _this.$message.error(res.data.message);
  //           });
  //           break;
  //         default:
  //           _this.$message.error(res.data.message);
  //           break;
  //       }
  //
  //       // _this.loading = false;
  //       if (res.data.code !== 1) {
  //         _this.loading = false;
  //       }
  //     }, err => {
  //       reject(err);
  //       _this.loading = false;
  //       _this.$message.error('网络超时');
  //     });
  //   });
  //   return p;
  // },
  isMobile (number, _this) {
    if (number && /^1(3\d|47|(5[0-3|5-9])|(7[0|7|8])|(8[0-3|5-9]))-?\d{4}-?\d{4}$/.test(number)) {
      if (number.length > 11 || number.length < 11) {
        _this.$message({
          message: '请输入11位手机号码',
          type: 'warning'
        });
        return;
      }
      return true;
    } else {
      _this.$message({
        message: '请输入正确的手机号码',
        type: 'warning'
      });
      return;
    }
  },
  sendAjaxFront(_this, post, formData) {
    _this.loading = true;

    let p = new Promise((resolve, reject) => {
      if (formData) {
        post = this._formData(post);
      }
      _this.$http.post(Vue.prototype.config.frontApi, post).then(res => {
        _this.loading = false;
        if (res.data.code !== 1) {
          /* _this.$cookie.delete('adminToken');
           _this.$cookie.delete('adminUsername'); */
          _this.$router.replace('/login');
          _this.$nextTick(() => {
            _this.$message.error(res.data.message);
          });
        } else {
          resolve(res.data);
        }
      }, err => {
        reject(err);
        _this.loading = false;
        _this.$message.error('网络超时');
      });
    });
    return p;
  },
  _formData(post) {
    /* global FormData:true */
    /* eslint no-undef: "error" */
    let imgData = new FormData();
    for (let i in post) {
      imgData.append(i, post[i]);
    }
    return imgData;
  },
  formatDate(date, fmt) {
    if (typeof date === 'string') {
      if (date === '') {
        return false;
      } else {
        date = new Date(date);
        if (isNaN(date.getTime())) {
          return false;
        }
      }
    }
    if ((typeof date === 'object') && date instanceof Date) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
      }
      return fmt;
    } else {
      return false;
    }
  },
  charToHtml(str) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&apos;/g, "'");
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&#039;/g, ' ');
    return str;
  },
  formatImg(option) {
    if (option) {
      option = option.split(',')[0];
      if (option.indexOf('http') !== 0) {
        option = Vue.prototype.config.baseUrl + option;
      }
    }
    return option;
  },
  inArray(array, item) {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  },
  trim(str) {
    if (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    } else {
      return '';
    }
  },
  subStr(text, length) {
    if (text && text.length > length) {
      return text.substr(0, length - 2) + '...';
    } else {
      return text;
    }
  }
};
