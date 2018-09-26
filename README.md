#后台项目说明

> active-admin

```src目录为开发目录```

## 开发工具

```js

import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

```

Example

```js

// From some method in one of your Vue components
this.$cookie.set('test', 'Hello world!', 1);
// This will set a cookie with the name 'test' and the value 'Hello world!' that expires in one day

// To get the value of a cookie use
this.$cookie.get('test');

// To delete a cookie use
this.$cookie.delete('test');

```
Advanced examples

```js

// Setting the cookie Domain
this.$cookie.set('test', 'Random value', {expires: 1, domain: 'localhost'});

// As this cookie is set with a domain then if you wish to delete it you have to provide the domain when calling delete
this.$cookie.delete('test', {domain: 'localhost'});

// Customizing expires
var date = new Date;
date.setDate(date.getDate() + 21);

this.$cookie.set('dateObject', 'A date object', { expires: date });
this.$cookie.set('dateString', 'A parsable date string', { expires: date.toGMTString() });
this.$cookie.set('integer', 'Seven days later', { expires: 7 });
this.$cookie.set('stringSuffixY', 'One year later', { expires: '1Y' });
this.$cookie.set('stringSuffixM', 'One month later', { expires: '1M' });
this.$cookie.set('stringSuffixD', 'One day later', { expires: '1D' });
this.$cookie.set('stringSuffixh', 'One hour later', { expires: '1h' });
this.$cookie.set('stringSuffixm', 'Ten minutes later', { expires: '10m' });
this.$cookie.set('stringSuffixs', 'Thirty seconds later', { expires: '30s' });

```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 多图上传组件说明
``` bash
html: {
  <up-img @upload="handleUpload" :parentImg="upImgData"></up-img>
}

js: {
  import upImg from '../common/upSingleImg';

  data: {
    upImgData: {
          img: '',
          tempImg: ''
        }
  },
  methods: {
    handleUpload(file) {
    this.form.c_icon = file;
    },
    clickCreate() {
    this.upImgData.img = '';
    this.upImgData.tempImg = '';
    },
    clickEdit(icon) {
    this.form.upImgData.tempImg = this.config.imgUrl + icon;
    }
  }
}

说明: {
  handleUpload(filename)  上传事件完成后的回调函数, filename 就是返回的文件对象

  upImgData: {
    提供子组件需要的文件对象和文件缩略图属性

    img  文件对象
    tempImg  文件缩略图
  }
}
```
# jycx_hd
