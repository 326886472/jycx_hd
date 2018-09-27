<template>
  <div class="my-editor">
    <textarea id="myEditor" name="content" type="text/plain"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  import UE from 'UE';
  export default{
    data() {
      return {
        ue: null
      };
    },
    mounted() {
      this.ue = UE.getEditor('myEditor');
    },
    destroyed() {
      this.ue.destroy();
    },
    methods: {
      setContent(content) {
        this.ue.setContent(this.util.charToHtml(content));
      },
      getDesc() {
        return this.ue.getContentTxt().substr(0, 100);
      },
      getContent() {
        return this.ue.getContent();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .my-editor {
  }
</style>
