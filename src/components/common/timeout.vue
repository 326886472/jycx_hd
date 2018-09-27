<template>
  <span class="">{{ timeout }}</span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      time: {
        type: Number,
        default: 10
      },
      url: {
        type: String,
        default: '/'
      }
    },
    data() {
      return {
        timeout: this.time,
        urls: this.url,
        interval: null
      };
    },
    created() {
      this.toIndex();
      this.clearIntervals();
    },
    methods: {
      toIndex() {
        this.interval = setInterval(() => {
          this.timeout--;
          if (this.timeout <= 0) {
            clearInterval(this.interval);
            if (this.urls === '-1') {
              this.$router.go(-1);
            } else {
              this.$router.replace(this.urls);
            }
          }
        }, 1000);
      },
      clearIntervals() {
        this.$router.beforeEach((to, from, next) => {
          clearInterval(this.interval);
          next();
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
