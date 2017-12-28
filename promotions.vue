<template>
	<div class="container"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="date_bar">
		<span @click="beforeDate"> <i class="fa fa-chevron-left"></i></span>
		    
		    <span class="current_date">
		        {{selectedDate}}
		    </span>
		    <span> <i class="fa fa-chevron-right"></i></span>
		</div>
		<div class="promo_container" v-if="promotions">
			<div class="row promo_dets text-left" v-for="promo in promotions">
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
    .date_bar{
        /* Today: */
        background: #D3D3D3;
        height:40px;
        line-height:40px;
        margin:auto;
        text-align:center;
    }
    .current_date{
        color:#636363;
    }
</style>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    daysInMonths : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    selectedDate: null
                }
            },
            mounted () {
                this.selectedDate = moment().tz(this.timezone).format('MMM D, YYYY');
                console.log(this.selectedDate)
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
                    return temp_promo;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            }
        });
    });
</script>