<template>
  <div class="test">
    <!--<weuiUEditor :config="editorConfig" @on-editor-ready="editorReady" ref="editor"></weuiUEditor>-->
    <a href="/test">到 lin1</a>
    <div :id="id"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../static/ueditor/ueditor.config.js';
  import '../../static/ueditor/ueditor.all.js';
  import '../../static/ueditor/lang/zh-cn/zh-cn.js';

  export default{
    data() {
      return {
        id: 'ueditorId' + new Date().getTime() + Math.random(),
        editor: null,
        editorConfig: {
          toolbars: []
        }
      };
    },
    components: {
//      weuiUEditor
    },
    created() {
    },
    destroyed() {
//      this.editor.destroy();
    },
    mounted() {
      this.editorReady();
    },
    methods: {
      editorReady() {
        this.$nextTick(() => {
          window.UE.getEditor(this.id);
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .test {
  }
</style>
