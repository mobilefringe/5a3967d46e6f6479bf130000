<template>
	<div class="page_container events_container" v-if="dataLoaded" id="sustainability_container">
	    <div class="">
	        <img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/jpeg/1529091914686/sustainability-banner.jpg" class="" alt="">
	    </div>
		<div class="promo_container" v-if="events.length > 0">
		    
			<div class="row promo_dets is-table-row" v-for="promo in events">
				<div class="col-sm-7" >
					<div class="promo_div_image">
						<img :src="promo.image_url" :alt="promo.name"/>
					</div>
				</div>
				<div class="col-sm-5 promo_div_dets text-left">
					<p class="promo_div_name">{{promo.name}}</p>
					<p class="promo_div_date">{{promo.start_date | moment("MMM D, YYYY", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<div class="promo_feature_share row is-table-row">
    					<span class="feature_read_more col-sm-8">
    						<router-link :to="'/sustainability_and_wellness_program/'+promo.slug" class="mobile_readmore" >
    							<p class="feature-readmore" :aria="promo.name">View Event Details<i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
    						</router-link>
    					</span>
    					<div class="text-right  col-sm-4" v-if="promo">
        					<social-sharing :url="shareURL(promo.slug)" :title="promo.title" :description="promo.body" :quote="_.truncate(promo.description, {'length': 99})" twitter-user="EastgateSquare" :media="promo.image_url" inline-template >
                            <div class="blog-social-share">
                                <div class="social_share">
                                    <network network="facebook">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1511797683914/facebook.png" class="social_icons" alt="">
                                </network>
                                <network network="twitter">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1511797704155/twitter.png" class="social_icons" alt="">
                                </network>
                                </div>
                            </div>
                        </social-sharing>
    					</div>
    					
					</div>
				</div>
			</div>
		</div>
		<div class="promo_container text-left" v-else>
		    <p style="padding:20px"> Sorry, there are no events available at the moment.</p>
		</div>
	</div>
</template>

<style>
    
    
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-lazy-load"], function(Vue, Vuex, moment, tz, VueMoment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("sustainabilty-component", {
            template: template, // the variable template will be injected
            data () {
              return {
                  dataLoaded: false
              }  
            },
            created () {
                this.$store.dispatch("getData", "promotions").then(response => {
                   this.dataLoaded = true;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ path: '/'});
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedPromos'
                ]),
                events() {
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.processedPromos, function(value, key) {
                        value.description_short = _.truncate(value.description, {
                            'length': 70
                        });
                        if (value.store != null && value.store != undefined && _.includes(value.store.image_url, 'missing')) {
                            value.store.image_url = vm.property.default_logo_url;
                        }
                        if (_.includes(value.image_url, 'missing')) {
                            value.image_url = vm.property.default_logo_url;
                        }
                            
                        if(value.is_special_promo) {
                            temp_promo.push(value);
                        }
                    });
                    return _.sortBy(temp_promo, [function(o) { return o.start_date; }]).reverse();
                }
            },
            methods: {
                shareURL(slug){
                    var share_url = "https://eastgatesquare.ca/sustainability_and_wellness_program/" + slug;
                    return share_url;
                }
            }
        });
    });
</script>