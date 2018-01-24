<template>
    <div id="pages_container" v-if="currentPage">
        <div class="page_header all_caps double_border_bottom">
			<div class="page_container text_left" v-html="currentPage.title"> </div>
		</div>
         <div class="page_container">
            <!--<div class="page_title text-left all_caps" v-html="currentPage.title"> </div>-->
            <div class="row padding_30" >
                <div class="page_body description_text text_left" v-html="currentPage.body">
                    
                </div>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
</template>
<style>
    .page_title {
        /*border-top:1px solid #aea99e;*/
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
    #pages_container img{
        width: 100%;
        height: auto;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            props:['id'],
            // beforeRouteEnter(to, from, next) {
            //     next(vm => {
            //         // access to component instance via `vm`
            //         vm.$store.dispatch('LOAD_PAGE_DATA', {
            //             url: vm.property.mm_host + "/pages/" + to.params.id + ".json"
            //         }).then(response => {

            //             vm.currentPage = response.data;
            //             console.log(vm.currentPage);
            //         }, error => {
            //             console.error("Could not retrieve data from server. Please check internet connection and try again.");
            //             vm.$router.replace({
            //                 name: '404'
            //             });
            //         });
            //     })
            // },
            // beforeRouteUpdate(to, from, next) {
            //     this.$store.dispatch('LOAD_PAGE_DATA', {
            //         url: this.property.mm_host + "/pages/" + to.params.id + ".json"
            //     }).then(response => {
            //         // this.dataLoaded = true;
            //         this.currentPage = response.data;
            //         console.log(this.currentPage);
            //     }, error => {
            //         console.error("Could not retrieve data from server. Please check internet connection and try again.");
            //         this.$router.replace({
            //             name: '404'
            //         });
            //     });
            // },
            created(){
               this.updateCurrentPage(this.id);
            },
            watch: {
                $route : function () {
                    console.log("$route",this.$route);
                    this.updateCurrentPage(this.$route.params.id);
                }  
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                ])
            },
            methods: {
                updateCurrentPage (id) {
                    this.$store.dispatch('LOAD_PAGE_DATA', {
                        url: this.property.mm_host + "/pages/" + id + ".json"
                    }).then(response => {
                        // this.dataLoaded = true;
                        this.currentPage = response.data;
                        console.log(this.currentPage);
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        this.$router.replace({
                            name: '404'
                        });
                    });
                },
            }
        });
    });
</script>