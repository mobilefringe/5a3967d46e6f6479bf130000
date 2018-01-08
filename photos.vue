<!--<a :href="sectionThree.image_url" :data-lightbox="sectionThree.name">-->
<!--                    		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>-->
<!--                		        </a>-->

<template>
    <div>
        
    </div>
</template>

<script>
  define(["Vue", "vue-meta"], function(Vue, Meta) {
    Vue.use(Meta);
    return Vue.component("default-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          meta: {
            meta_title: "",
            meta_description: "",
            meta_keywords: ""
          }
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.meta = vm.findMetaDataByPath(to.path);
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.meta = this.findMetaDataByPath(to.path);
        next();
      },
      computed: {
        findMetaDataByPath () {
          return this.$store.getters.findMetaDataByPath;
        }
      },
      metaInfo () {
        return {
          title: this.meta.meta_title,
          meta: [
            {name: 'description', content: this.meta.meta_description},
            {name: 'keywords', content: this.meta.meta_keywords}
          ]
        }
      }
    });
  });
</script>