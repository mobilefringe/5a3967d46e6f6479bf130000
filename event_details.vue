<template>
	<div class="event_dets_container page_container" v-if="currentEvent">
		<div class="row">
			<div class="col-sm-4 event_logo_container">
				<div>
					<img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1513713887462/ES_logo_Colour (1).png"/>
				</div>
			</div>
			<div class="col-sm-8 event_image_container text-left">
				<!--<img src="http://placehold.it/620x300"/>-->
				<img :src="currentEvent.image_url"/>
			</div>
		</div>
		<div class="row is-table-row" style="margin-left:0;">
			<div class="col-sm-4 event_details_container text-left">
				<div>
					<h1>{{currentEvent.name}}</h1>
					<!--<p>{{currentEvent.category_name}}</p>-->
					<!--<p>{{currentEvent.phone}}</p>-->
					<p class="event_div_date">{{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
				</div>
			</div>
			<div class="col-sm-8 event_desc_container">
				<div class="text-left event_description">
					<p>{{currentEvent.description}}</p>
				</div>
			</div>
		</div>
		<!--<div class="event_promo_container" v-if="currentEvent && currentEvent.total_published_promos > 0">-->
		<!--    <div class="promo_container_title text-left all_caps"> Sales & Promotions</div>-->
		<!--    <div class="row event_promo_dets text-left" v-for="promo in promotions">-->
		<!--        <div class="col-sm-7" >-->
		<!--        <div class="promo_div_image">-->
		<!--            <img :src="promo.image_url" alt=""/>-->
		<!--        </div>-->
		<!--        </div>-->
		<!--        <div class="col-sm-5 promo_div_dets">-->
		<!--            <p class="promo_div_name">{{promo.name}}</p>-->
		<!--            <p class="promo_div_event_name">{{currentEvent.name | uppercase}}</p>-->
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
		<div class="promo_main_header sub_title" v-if="storePromos.length > 0 && property" style="border-top: 1px solid #000;">
               OTHER {{property.name | uppercase }} EVENTS
        </div>
        <div id="promos_container" v-if="storePromos">
            <div class="col-md-6 col-sm-6 no_padding" v-for="promo in storePromos" :data-cat="promo.cat_list">
                <div class="promo_item cats_row is-table-row">
                    <div class="col-md-5 col-xs-4 no_padding">
                        <img class="promo_event_image" :src="promo.image_url" :alt="promo.name" />
                    </div>
                    <div class="col-md-7 padding_tb_20">
                        <router-link :to="'/events/'+promo.slug" class="">
                            <h2 class="promo_list_name">{{promo.name}}</h2>
                        </router-link>
                        <p>
                            <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                        </p>
                        <div class="promo_list_desc hidden_phone">{{promo.description_short }}</div>
                        <div class="text_center position_relative hidden_phone">
                            <router-link :to="'/events/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<style>
    .row{
        margin-left:inherit;
    }
    /*.event_dets_container .row.is-table-row [class*="col-"] {*/
    /*    padding-top: inherit;*/
    /*    padding-bottom: inherit;*/
    /*    padding-left: 0;*/
    /*    padding-right: 0;*/
    /*}*/
    
    .event_logo_container,
    .event_image_container,
    .event_details_container,
    .event_desc_container{
        padding: 20px 10px;
    }
    .event_image_container img{
        max-height: 300px;
    }
    .event_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    .event_details_container h1{
        padding: 0;
    }
    .event_div_date{
        font-size: 16px;
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