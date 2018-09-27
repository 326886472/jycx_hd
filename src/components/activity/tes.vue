<template>
  <div>
    <vue-qr :config="config" ></vue-qr>
  </div>
</template>
<script>
  import VueQr from 'vue-qart';
  export default {
    data () {
      return {
        config: {
          value: 'https://www.baidu.com',
          imagePath: require('../../../src/assets/logo.jpg'),
          filter: 'color'
        }
      };
    },
    methods: {
      down() {
        const myCanvas = this.$refs.qart.children[0];
        const type = 'image/png';
        let image = myCanvas.toDataURL(type).replace(type, 'image/octet-stream');
        window.location.href = image;
      }
    },
    components: {
      VueQr
    }
  };
</script>
