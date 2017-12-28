<template>
	<div class="container">
		<!-- for some reason if you do not put an outer container div this component template will not render -->
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
	</div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            computed: {
                promotions() {
                    return this.$store.getters.processedPromos;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            }
        });
    });
</script>