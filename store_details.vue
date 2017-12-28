<template>
	<div class="page_container" v-if="currentStore">
		<div class="row" style="margin-left: inherit;">
			<div class="col-md-4 store_logo_container">
				<div>
					<img :src="currentStore.store_front_url_abs"  style="width:300px;height:300px"/>
				</div>
			</div>
			<div class="col-md-8 store_map_container">
				<img src="http://placehold.it/620x300"/>
			</div>
		</div>
		<div class="row is-table-row">
			<div class="col-md-4">
				<div>
					<h1>{{currentStore.name}}</h1>
					<p>{{currentStore.category_name}}</p>
					<p>{{currentStore.phone}}</p>
					<a v-bind:href="currentStore.website">Visit Store Site</a>
				</div>
			</div>
			<div class="col-md-8 store_desc_container">
				<div class="text-left store_description">
					<p>{{currentStore.description}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
    .store_logo_container,
    .store_map_container,
    .store_details_container,
    .store_desc_container{
        padding: 20px 10px;
    }
</style>
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
            watch: {
                map: function() {
                    var vm = this;
                    setTimeout(function() {
                        console.log(this);
                        vm.dropPin();
                    }, 500);
                },
                currentStore: function() {
                    console.log("currentStore promo", this.currentStore);
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        // console.log(vm.findPromoById(value));
                        var current_promo = vm.findPromoById(value);
                        current_promo.description_short = _.truncate(current_promo.description, {
                            'length': 70
                        });
                        temp_promo.push(current_promo);
                    });
                    _.forEach(this.currentStore.jobs, function(value, key) {
                        var current_job = vm.findJobById(value);
                        current_job.description_short = _.truncate(current_job.description, {
                            'length': 70
                        });
                        temp_job.push(current_job);

                    })
                    this.promotions = temp_promo;
                    this.jobs = temp_job;
                    console.log("promos", this.promotions);
                }
            },
            computed: {
                findStoreBySlug() {
                    return this.$store.getters.findStoreBySlug;
                },
                findPromoById() {
                    return this.$store.getters.findPromoById;
                },
                findJobById() {
                    return this.$store.getters.findJobById;
                },
                property() {
                    return this.$store.getters.getProperty;
                },
                getSVGurl() {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) {
                        return (o.$el.className == "svg-map")
                    })[0];
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                updateSVGMap(map) {
                    this.map = map;
                    console.log("this", this);
                },
                dropPin() {
                    console.log(this.currentStore);
                    console.log(this.currentStore.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentStore, '//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentStore)
                }
            }
        });
    });
</script>