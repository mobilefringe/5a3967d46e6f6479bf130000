<template>
	<div class="container"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="date_bar">
		    <span @click="beforeDate"> <i class="fa fa-chevron-left"></i></span>
		    <span class="current_date">
		        {{selectedDate}}
		    </span>
		    <span @click="afterDate"> <i class="fa fa-chevron-right"></i></span>
		</div>
		<div class="all_dates text-center">
		    <span v-for="n in daysInMonth" @click="newDate(n)">{{n}}</span>
		</div>
		<hr/>
		<div class="promo_container" v-if="processedPromos">
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
    .all_dates span {
        font-size: 16px;
        color: #000000;
        letter-spacing: 1.5px;
        height:30px;
        line-height:30px;
        padding: 0 5px;
    }
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
            mounted() {
                this.selectedDate = moment().tz(this.timezone).format('MMM D, YYYY');
                console.log(this.selectedDate);
            },
            watch: {
                selectedDate: function() {
                    // console.log(this.daysInMonth);
                    console.log(this.promotions);
                    selected = moment(this.selectedDate).tz(this.timezone).format('MMM D, YYYY');
                    var vm = this;
                    vm.processedPromos = _.filter(vm.promotions, function(val){
                        // console.log(val);
                        start_date = moment(val.start_date).tz(vm.timezone).format('MMM D, YYYY');
                        end_date = moment(val.end_date).tz(vm.timezone).format('MMM D, YYYY');
                        console.log(vm.selectedDate, start_date, end_date);
                        console.log((vm.selectedDate >= start_date), vm.selectedDate <= end_date, (vm.selectedDate >= start_date && vm.selectedDate <= end_date));
                        // if(this.selectedDate >= start_date && this.selectedDate <= end_date) return true;
                        return (vm.selectedDate >= start_date) && (vm.selectedDate <= end_date);
                    });
                    console.log(this.processedPromos);
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
                    date = moment(this.selectedDate).date();
                    month = moment(this.selectedDate).month();
                    year = moment(this.selectedDate).year();
                    this.selectedDate = moment([year, month, val]).format('MMM D, YYYY');
                }
            }
        });
    });
</script>