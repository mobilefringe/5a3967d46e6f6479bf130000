<template>
  <div class="page_container" v-if="currentStore">
    <div class="row" style="margin-left: inherit;">
        <div class="col-md-4">
          <div>
            <img :src="currentStore.store_front_url_abs"  style="width:300px;height:300px"/>
          </div>
    </div>
    <div class="col-md-8">
        <img src="http://placehold.it/620x300"/>
    </div>
    </div>
    <div class="row">
        <div class="col-md-4">
      <div>
        <h1>{{currentStore.name}}</h1>
        <p>{{currentStore.category_name}}</p>
        <p>{{currentStore.phone}}</p>
        <a v-bind:href="currentStore.website">Visit Store Site</a>
      </div>
    </div>
    <div class="col-md-8">
      <div class="text-left store_description">
        <p>{{currentStore.description}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
    define(["Vue"], function(Vue) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    currentStore: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    console.log(vm.currentStore);
                    if (vm.currentStore === null || vm.currentStore === undefined) {
                        vm.$router.replace({
                            name: '404'
                        });
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.currentStore = this.findStoreBySlug(to.params.id);
                console.log(this.currentStore);
                if (this.currentStore === null || this.currentStore === undefined) {
                    this.$router.replace({
                        name: '404'
                    });
                }
            },
            computed: {
                findStoreBySlug() {
                    return this.$store.getters.findStoreBySlug;
                }
            }
        });
    });
</script>