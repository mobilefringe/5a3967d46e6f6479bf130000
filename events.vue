<template>
	<div class="page_container events_container" v-if="dataLoaded" id="events_container">
		<div class="promo_container" v-if="events.length > 0">
			<div class="row promo_dets is-table-row" v-for="promo in events">
				<div class="col-sm-7" >
					<div class="promo_div_image" v-lazy-container="{ selector: 'img' }">
						<img :data-src="promo.image_url"  data-loading='//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1521035009104/Screen Shot 2018-03-14 at 9.43.24 AM.png' alt=""/>
					</div>
				</div>
				<div class="col-sm-5 promo_div_dets text-left">
					<p class="promo_div_name">{{promo.name}}</p>
					<p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<div class="promo_feature_share row is-table-row">
    					<span class="feature_read_more col-sm-8">
    						<router-link :to="'/events/'+promo.slug" class="mobile_readmore" >
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
		<div class="promo_container" v-else>
		    <p style="padding:20px"> Sorry, no events are currently available.</p>
		</div>
	</div>
</template>


<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-lazy-load"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueLazyload) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data () {
              return {
                  dataLoaded: false
              }  
            },
            created () {
                this.$store.dispatch("getData", "events").then(response => {
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
                    'processedEvents'
                ]),
                events() {
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.processedEvents, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone);
                        if (today >= webDate) {
                            value.description_short = _.truncate(value.description, {
                                'length': 70
                            });
                            if (value.store != null && value.store != undefined && _.includes(value.store.image_url, 'missing')) {
                                value.store.image_url = vm.property.default_logo_url;
                            }
                            if (_.includes(value.image_url, 'missing')) {
                                value.image_url = vm.property.default_logo_url;
                            }
                            temp_promo.push(value);
                        }
                    });
                    return _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                }
            },
            methods: {
                shareURL(slug){
                    var share_url = "https://eastgatesquare.ca/events/" + slug;
                    return share_url;
                }
            }
        });
    });
</script>