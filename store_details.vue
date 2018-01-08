<template>
	<div class="page_container store_dets_container" v-if="currentStore" id="store_dets_container">
		<div class="row">
			<div class="col-sm-4 store_logo_container">
				<div>
					<img :src="currentStore.store_front_url_abs"/>
				</div>
			</div>
			<div class="col-sm-8 store_map_container">
				<!--<img src="http://placehold.it/620x300"/>-->
				<!--<div class="main-map">-->
					<div id="mapsvg_store_detail">
						<png-map v-bind:png-map-url="getPNGurl" v-bind:initial-position="'150 150'"></png-map>
						 <!--v-bind:zoom-max="300" v-bind:initial-zoom="50" v-bind:zoom-min="50" v-bind:zoom-out-to-fit="'YES'" -->
					</div>
				<!--</div>-->
			</div>
		</div>
		<div class="row is-table-row">
			<div class="col-sm-4 store_details_container">
				<div>
					<h1>{{currentStore.name}}</h1>
					<p>{{currentStore.category_name}}</p>
					<p>{{currentStore.phone}}</p>
					<a v-bind:href="currentStore.website">Visit Store Site</a>
				</div>
			</div>
			<div class="col-sm-8 store_desc_container">
				<div class="text-left store_description">
					<p>{{currentStore.description}}</p>
				</div>
			</div>
		</div>
		<div class="store_promo_container" v-if="currentStore && currentStore.total_published_promos > 0">
		    <div class="promo_container_title text-left all_caps"> Sales & Promotions</div>
		    <div class="row store_promo_dets text-left" v-for="promo in promotions">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img :src="promo.image_url" alt=""/>
		        </div>
		        </div>
		        <div class="col-sm-5 promo_div_dets">
		            <p class="promo_div_name">{{promo.name}}</p>
		            <p class="promo_div_store_name">{{currentStore.name | uppercase}}</p>
		            <p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
		            
						<p class="promo_div_description">{{promo.description_short}}</p>
						<span class="feature_read_more">
							<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >
								<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
							</router-link>
						</span>
		        </div>
		    </div>
		</div>
		<div class="store_promo_container" v-if="currentStore && currentStore.total_published_jobs > 0">
		    <div class="promo_container_title text-left all_caps"> Careers</div>
		    <div class="row store_promo_dets text-left" v-for="promo in jobs">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img :src="currentStore.store_front_url_abs" alt=""/>
		        </div>
		        </div>
		        <div class="col-sm-5 promo_div_dets">
		            <p class="promo_div_name">{{promo.name}}</p>
		            <p class="promo_div_store_name">{{currentStore.name | uppercase}}</p>
		            <p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
		            
						<p class="promo_div_description">{{promo.description_short}}</p>
						<span class="feature_read_more">
							<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >
								<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
							</router-link>
						</span>
		        </div>
		    </div>
		</div>
	</div>
</template>
<style>
    .store_dets_container .row{
        margin-left:inherit;
    }
    .store_logo_container,
    .store_map_container,
    .store_details_container,
    .store_desc_container{
        padding: 20px 10px;
    }
    
    .store_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    .promo_container_title{
        border-top:1px solid #aea99e;
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
    #store_dets_container .map {
        height: 300px;
        overflow:hidden;
    }
</style>
<script>
    define(['Vue','moment', "jquery", "smooth-zoom", "vue!png-map"], function(Vue, moment, $, smoothZoom, PNGMapComponent) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentStore: null,
                    promotions : [],
                    jobs:[]
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
                        vm.addLandmark(this.currentStore);
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
                    console.log("jobs", this.jobs);
                    
                    setTimeout(function() {
                        console.log(this);
                        vm.addLandmark(this.currentStore);
                    }, 500);
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
                getPNGurl () {
                    return "https://www.mallmaverick.com" + this.property.map_url;
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
                addLandmark(store) {
                    // this.svgMapRef.hideMarkers();
                    console.log("Adding Marker for" ,store);
                    this.svgMapRef.addMarker(store);
                    // this.svgMapRef.setViewBox(store);
                    // (store_x_coordinate, store_y_coordinate, pin_id, store_name) {
                },
            }
        });
    });
</script>