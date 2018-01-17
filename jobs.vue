<template>
	<div class="page_container jobs_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<!--<div class="date_bar">-->
		<!--    <span @click="beforeDate"> <i class="fa fa-chevron-left"></i></span>-->
		<!--    <span class="current_date">-->
		<!--        {{selectedDate}}-->
		<!--    </span>-->
		<!--    <span @click="afterDate"> <i class="fa fa-chevron-right"></i></span>-->
		<!--</div>-->
		<!--<div class="all_dates text-center">-->
		<!--    <span v-for="n in daysInMonth" :id="'date_'+n" @click="newDate(n)">{{n}}</span>-->
		<!--</div>-->
		<div class="promo_container" v-if="jobs.length > 0">
			<div class="row promo_dets is-table-row" v-for="promo in jobs">
				<div class="col-sm-7" >
					<div class="promo_div_image">
						<img :src="promo.store.store_front_url_abs" alt=""/>
					</div>
				</div>
				<div class="col-sm-5 promo_div_dets text-left">
					<p class="promo_div_name">{{promo.name}}</p>
					<!--<p class="promo_div_store_name">{{property.name | uppercase}}</p>-->
					<p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<div class="row is-table-row">
    					<span class="feature_read_more col-sm-6">
    						<router-link :to="'/jobs/'+promo.slug" class="mobile_readmore" >
    							<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
    						</router-link>
    					</span>
    					<div class="text-right  col-sm-6" v-if="promo">
        					<social-sharing :url="shareURL(promo.slug)" :title="promo.title" :description="promo.body" :quote="truncate(promo.description)" twitter-user="EastgateSquare" :media="promo.image_url" inline-template >
                            <div class="blog-social-share">
                                <div class="social_share">
                                    <network network="facebook">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1511797683914/facebook.png" class="social_icons" alt="">
                                </network>
                                <network network="twitter">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1511797704155/twitter.png" class="social_icons" alt="">
                                </network>
                                </div>
                            </div>
                        </social-sharing>
         <!--                   <network network="facebook">-->
         <!--                       <img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1511797683914/facebook.png" class="social_icons" alt="">-->
         <!--                   </network>-->
         <!--                   <network network="twitter">-->
         <!--                       <img src="//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/png/1511797704155/twitter.png" class="social_icons" alt="">-->
         <!--                   </network>-->
    					</div>
    					
					</div>
				</div>
			</div>
		</div>
		<div class="promo_container" v-else>
		    <p style="padding:20px">  Sorry, No sales or jobs available for this day. </p>
		</div>
	</div>
</template>

<style>
    .jobs_container .row{
        margin-left:inherit;
    }
    .jobs_container .date_bar{
        /* Today: */
        background: #D3D3D3;
        height: 40px;
        line-height: 40px;
        margin: auto;
        text-align: center;
    }
    .jobs_container .date_bar .fa{
        cursor: pointer;
    }
    .jobs_container .current_date{
        color: #636363;
        padding: 0 10px;
    }
    .jobs_container .all_dates {
        border-bottom: 1px solid #aea99e;
    }
    .jobs_container .all_dates span {
        font-size: 16px;
        color: #000000;
        letter-spacing: 1.5px;
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
    }
    .jobs_container .all_dates [class*="date_"]:focus, [class*="date_"]:hover { 
        background-color: #D3D3D3;
    }
    .jobs_container .all_dates span.active { 
        background-color: #bababa;
    }
    .jobs_container .promo_dets {
        border-bottom: 1px solid #aea99e;
    }
    .jobs_container .row.is-table-row {
        margin: 0;
    }
    .jobs_container .row.is-table-row [class*="col-"] {
        padding:0;
    }
    .jobs_container .feature_read_more {
        width : auto;
    }
    .jobs_container .social_share network {
        display:inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .jobs_container .social_share .social_icons{
        width : 24px;
        height : 24px;
        display:inline;
        margin: 0 2px;
    }
    /*@media (min-width: 769px){ */
    /*    .all_dates span {*/
    /*        font-size:12px;*/
    /*        padding: 0px 4px;*/
    /*    }*/
        
    /*}*/
    /*@media (min-width: 992px){ */
    /*    .all_dates span {*/
    /*        font-size:16px;*/
    /*        padding: 0px 5px;*/
    /*    }*/
        
    /*}*/
    
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue,Vuex, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("jobs-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    // selectedDate: null,
                    filteredJobs:[]
                }
            },
            created () {
                this.$store.dispatch("getData", "events").then(response => {
                    // console.log(response);
                   this.dataLoaded = true;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedJobs'
                ]),
                jobs() {
                    var vm = this;
                    this.processedJobs.map(job => {
                        job.short_description = _.truncate(job.description,{'length': 70});
                    });
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.processedJobs, function(value, key) {
                        // var current_promo = vm.findPromoById(value);
                        value.description_short = _.truncate(value.description, {
                            'length': 70
                        });
                        temp_promo.push(value);
                    });
                    _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                    console.log(temp_promo);
                    return temp_promo;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
                // ,
                // daysInMonth() {
                //     var days = moment(this.selectedDate).daysInMonth();
                //     return days;
                // }
            },
            methods: {
                // beforeDate() {
                //     console.log(this.selectedDate);
                //     selectedDate = this.selectedDate;
                //     selectedDate = moment(selectedDate).subtract(1, 'days');
                //     this.selectedDate = moment(selectedDate).tz(this.timezone).format('MMM D, YYYY');
                //     console.log(this.selectedDate);
                // },
                // afterDate() {
                //     console.log(this.selectedDate);
                //     selectedDate = this.selectedDate;
                //     selectedDate = moment(selectedDate).add(1, 'days');
                //     this.selectedDate = moment(selectedDate).tz(this.timezone).format('MMM D, YYYY');
                //     console.log(this.selectedDate);
                // },
                // newDate (val) {
                //     old_date = moment(this.selectedDate).date();
                //     month = moment(this.selectedDate).month();
                //     year = moment(this.selectedDate).year();
                //     this.selectedDate = moment([year, month, val]).format('MMM D, YYYY');
                // },
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    // console.log(window.location.host, "\n http://"+ window.location.host);
                    var share_url = "http://eastgatesquare.ca/jobs/" + slug;
                    return share_url;
                }
                // ,
                // toggle: function (clicked) {
                //     clicked = !clicked
                // }
            }
        });
    });
</script>