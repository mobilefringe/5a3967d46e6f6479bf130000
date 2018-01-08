<template>
    <div class="page_container" id="thank_you_container">
    <div class="row">
        <img src="http://placehold.it/700x300" class="" alt="">
    </div>
        <div class="row">
            Your subscription has been confirmed. You've been added to our list and will hear from us soon.
        </div>
    </div>
</template>
<style>
    #thank_you_container {
        padding: 20px;
    }
</style>
<script>
  define(["Vue"], function(Vue) {
    return Vue.component("thank-you-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            title: "title"
        }
      }
    //   beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //       // access to component instance via `vm`
    //       vm.meta = vm.findMetaDataByPath(to.path);
    //     })
    //   },
    //   beforeRouteUpdate (to, from, next) {
    //     this.meta = this.findMetaDataByPath(to.path);
    //     next();
    //   },
    //   computed: {
    //     findMetaDataByPath () {
    //       return this.$store.getters.findMetaDataByPath;
    //     }
    //   },
    //   metaInfo () {
    //     return {
    //       title: this.meta.meta_title,
    //       meta: [
    //         {name: 'description', content: this.meta.meta_description},
    //         {name: 'keywords', content: this.meta.meta_keywords}
    //       ]
    //     }
    //   }
    });
  });
</script>