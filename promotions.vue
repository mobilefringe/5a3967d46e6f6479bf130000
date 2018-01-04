<template>
	<div class="page_container promotions_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="date_bar">
		    <span @click="beforeDate"> <i class="fa fa-chevron-left"></i></span>
		    <span class="current_date">
		        {{selectedDate}}
		    </span>
		    <span @click="afterDate"> <i class="fa fa-chevron-right"></i></span>
		</div>
		<div class="all_dates text-center">
		    <span v-for="n in daysInMonth" :id="'date_'+n" @click="newDate(n)">{{n}}</span>
		</div>
		<div class="promo_container" v-if="processedPromos.length > 0">
			<div class="row promo_dets text-left" v-for="promo in processedPromos">
				<div class="col-sm-7" >
					<div class="promo_div_image">
						<img :src="promo.image_url" alt=""/>
					</div>
				</div>
				<div class="col-sm-5 promo_div_dets">
					<p class="promo_div_name">{{promo.name}}</p>
					<p class="promo_div_store_name">{{promo.store.name | uppercase}}</p>
					<p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<div class="row is-table-row">
    					<span class="feature_read_more col-sm-6">
    						<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >
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
		    <p> Sorry, No sales or promotions available for this day. </p>
		</div>
	</div>
</template>

<style>
    .promotions_container .row{
        margin-left:inherit;
    }
    .date_bar{
        /* Today: */
        background: #D3D3D3;
        height: 40px;
        line-height: 40px;
        margin: auto;
        text-align: center;
    }
    .date_bar .fa{
        cursor: pointer;
    }
    .current_date{
        color: #636363;
        padding: 0 10px;
    }
    .all_dates {
        border-bottom: 1px solid #aea99e;
    }
    .all_dates span {
        font-size: 16px;
        color: #000000;
        letter-spacing: 1.5px;
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
    }
     .all_dates [class*="date_"]:focus, [class*="date_"]:hover { 
        background-color: #D3D3D3;
    }
    .all_dates span.active { 
        background-color: #bababa;
    }
    .promo_dets {
        border-bottom: 1px solid #aea99e;
    }
    .row.is-table-row {
        margin: 0;
    }
    .row.is-table-row [class*="col-"] {
        padding:0;
    }
    .feature_read_more {
        width : auto;
    }
    .social_share network {
        display:inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .social_share .social_icons{
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    selectedDate: null,
                    processedPromos:[]
                }
            },
            created() {
                this.selectedDate = moment().tz(this.timezone).format('MMM D, YYYY');
                console.log(this.selectedDate);
                var date = moment(this.selectedDate).date();
                console.log("date is", date);
                // $("#date_"+ date).addClass('active');
                // $("#date_29").addClass('active');
            },
            watch: {
                selectedDate: function() {
                    
                    //sort promos
                    selected = moment(this.selectedDate).format('MM DD YYYY');
                    var vm = this;
                    vm.processedPromos = _.filter(vm.promotions, function(val){
                        start_date = moment(val.start_date).tz(vm.timezone).format('MM DD YYYY');
                        end_date = moment(val.end_date).tz(vm.timezone).format('MM DD YYYY');
                        return moment(selected).isBetween(start_date,end_date, null, '[]');
                    });
                    console.log(this.processedPromos);
                    
                    //change active class 
                    old_date = moment(this.selectedDate).date();
                    $(".all_dates span").removeClass('active');
                    $("#date_"+old_date).addClass('active');
                }
            },
            computed: {
                promotions() {
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.$store.getters.processedPromos, function(value, key) {
                        // var current_promo = vm.findPromoById(value);
                        value.description_short = _.truncate(value.description, {
                            'length': 70
                        });
                        temp_promo.push(value);
                    });
                    _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                    return temp_promo;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                daysInMonth() {
                    var days = moment(this.selectedDate).daysInMonth();
                    return days;
                }
            },
            methods: {
                beforeDate() {
                    console.log(this.selectedDate);
                    selectedDate = this.selectedDate;
                    selectedDate = moment(selectedDate).subtract(1, 'days');
                    this.selectedDate = moment(selectedDate).tz(this.timezone).format('MMM D, YYYY');
                    console.log(this.selectedDate);
                },
                afterDate() {
                    console.log(this.selectedDate);
                    selectedDate = this.selectedDate;
                    selectedDate = moment(selectedDate).add(1, 'days');
                    this.selectedDate = moment(selectedDate).tz(this.timezone).format('MMM D, YYYY');
                    console.log(this.selectedDate);
                },
                newDate (val) {
                    old_date = moment(this.selectedDate).date();
                    month = moment(this.selectedDate).month();
                    year = moment(this.selectedDate).year();
                    this.selectedDate = moment([year, month, val]).format('MMM D, YYYY');
                },
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    // console.log(window.location.host, "\n http://"+ window.location.host);
                    var share_url = "http://eastgatesquare.ca/promotions/" + slug;
                    return share_url;
                },
                toggle: function (clicked) {
                    clicked = !clicked
                }
            }
        });
    });
</script>