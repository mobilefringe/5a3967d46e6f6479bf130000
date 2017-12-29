<template>
	<div class="page_container" v-if="currentEvent">
		<div class="row">
			<div class="col-sm-4 store_logo_container">
				<div>
					<img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1513713887462/ES_logo_Colour (1).png"/>
				</div>
			</div>
			<div class="col-sm-8 store_map_container text-left">
				<!--<img src="http://placehold.it/620x300"/>-->
				<img :src="currentEvent.image_url"/>
			</div>
		</div>
		<div class="row is-table-row">
			<div class="col-sm-4 store_details_container text-left">
				<div>
					<h1>{{currentEvent.name}}</h1>
					<!--<p>{{currentEvent.category_name}}</p>-->
					<!--<p>{{currentEvent.phone}}</p>-->
					<p class="">{{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
				</div>
			</div>
			<div class="col-sm-8 store_desc_container">
				<div class="text-left store_description">
					<p>{{currentEvent.description}}</p>
				</div>
			</div>
		</div>
		<!--<div class="store_promo_container" v-if="currentEvent && currentEvent.total_published_promos > 0">-->
		<!--    <div class="promo_container_title text-left all_caps"> Sales & Promotions</div>-->
		<!--    <div class="row store_promo_dets text-left" v-for="promo in promotions">-->
		<!--        <div class="col-sm-7" >-->
		<!--        <div class="promo_div_image">-->
		<!--            <img :src="promo.image_url" alt=""/>-->
		<!--        </div>-->
		<!--        </div>-->
		<!--        <div class="col-sm-5 promo_div_dets">-->
		<!--            <p class="promo_div_name">{{promo.name}}</p>-->
		<!--            <p class="promo_div_store_name">{{currentEvent.name | uppercase}}</p>-->
		<!--            <p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>-->
		            
		<!--				<p class="promo_div_description">{{promo.description_short}}</p>-->
		<!--				<span class="feature_read_more">-->
		<!--					<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >-->
		<!--						<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>-->
		<!--					</router-link>-->
		<!--				</span>-->
		<!--        </div>-->
		<!--    </div>-->
		<!--</div>-->
		<!--<div class="store_promo_container" v-if="currentEvent && currentEvent.total_published_jobs > 0">-->
		<!--    <div class="promo_container_title text-left all_caps"> Careers</div>-->
		<!--    <div class="row store_promo_dets text-left" v-for="promo in jobs">-->
		<!--        <div class="col-sm-7" >-->
		<!--        <div class="promo_div_image">-->
		<!--            <img :src="currentEvent.store_front_url_abs" alt=""/>-->
		<!--        </div>-->
		<!--        </div>-->
		<!--        <div class="col-sm-5 promo_div_dets">-->
		<!--            <p class="promo_div_name">{{promo.name}}</p>-->
		<!--            <p class="promo_div_store_name">{{currentEvent.name | uppercase}}</p>-->
		<!--            <p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>-->
		            
		<!--				<p class="promo_div_description">{{promo.description_short}}</p>-->
		<!--				<span class="feature_read_more">-->
		<!--					<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >-->
		<!--						<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>-->
		<!--					</router-link>-->
		<!--				</span>-->
		<!--        </div>-->
		<!--    </div>-->
		<!--</div>-->
	</div>
</template>
<style>
    .row{
        margin-left:inherit;
    }
    .store_logo_container,
    .store_map_container,
    .store_details_container,
    .store_desc_container{
        padding: 20px 10px;
    }
    .store_map_container img{
        max-height: 300px;
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
</style>
<script>
    define(['Vue','moment'], function(Vue, moment) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentEvent: null,
                    storePromos : null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    console.log(vm.currentEvent);
                    if (vm.currentEvent === null || vm.currentEvent === undefined) {
                        vm.$router.replace({
                            name: '404'
                        });
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                console.log(this.currentEvent);
                if (this.currentEvent === null || this.currentEvent === undefined) {
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
                currentEvent: function() {
                    var vm = this;
            var temp_promo = [];
            var current_id =_.toNumber(this.currentEvent.id);
            console.log(current_id);
            _.forEach(this.allEvents, function(value, key) {
                console.log(value)
                if(_.toNumber(value.id) != current_id){
                    var current_promo = vm.findEventById(value.id);
                    current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                    temp_promo.push(current_promo);
                }
            });
            this.storePromos = temp_promo;
            console.log("promos",this.storePromos);
                }
            },
            computed: {
                findEventBySlug() {
                    return this.$store.getters.findEventBySlug;
                },
                findPromoById() {
                    return this.$store.getters.findEventById;
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
                    console.log(this.currentEvent);
                    console.log(this.currentEvent.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentEvent, '//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentEvent)
                }
            }
        });
    });
</script>