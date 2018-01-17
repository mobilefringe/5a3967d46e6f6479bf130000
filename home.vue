<template>
	<div class="row page_container" v-if="dataLoaded">
		<div class="banner_div">
			<div class="main_banner">
				<div  class="prev"></div>
				<slick ref="slick" :options="slickOptions">
					<div class="" v-for="banner in banners">
						<img :src="banner.image_url" class="" alt="">
						<div class="banner_text" v-if="banner.description">
							<p class="banner-description">{{banner.description}}</p>
							<router-link :to="banner.url">
								<div class="banner_see_more">  See All <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></div>
							</router-link>
						</div>
					</div>
				</slick>
				<div class="next"></div>
			</div>
			<div class="top_two hidden-phone">
				<div class="banner_features"  v-for="feature in banner_features">
					<router-link :to="feature.url">
						<img class="top_image" :src='feature.image_url'/>
						<div class="feature_overlay">{{feature.name}}</div>
					</router-link>
				</div>
			</div>
		</div>
		<div style="border-top:4px double #aea99e">
			<div class="feature-div" style="height:580px">
				<span>
					<div class="feature-box" v-for="item in feature_items">
						<p class="feature-title">{{item.name}}</p>
						<img :src="item.image_url" class="feature-image" />
						<p class="feature-html">{{item.html}}</p>
						<p class="feature-desc">{{item.short_description}}</p>
						<span class="feature_read_more">
							<router-link :to="item.url" class="mobile_readmore" >
								<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
							</router-link>
						</span>
					</div>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", "vue!today_hours", "vue!search-component", 'vue!vue-slick'], function(Vue, Vuex, TodayHoursComponent, SearchComponent, slick) {
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    suggestionAttribute: 'name',
                    search: '',
                    slickOptions: {
                        slidesToShow: 1,
                        dots : true,
                        arrows:true,
                        prevArrow: '.prev',
                        nextArrow: '.next',
                        autoplay: false
                        // Any other options that can be got from plugin documentation
                    },
                    dataLoaded: false
                }
            },
            created () {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores'
                ]),
                banners () {
                    // console.log(_.orderBy(this.$store.state.banners, ['position'], ['asc']));
                    //  return _.orderBy(this.$store.state.banners, ['position'], ['asc']);
                    banners = _.orderBy(this.$store.state.banners, ['position'], ['asc']);
                    temp_banners = ["//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038406000/  HPHERO 2018 a -1.jpg", "//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038406000/  HPHERO 2018 b -1.jpg", "//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038405000/  HPHERO 2018 c -1.jpg", "//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038407000/  HPHERO 2018 d .jpg"];
                    var i  = 0;
                    banners.map(banner => {
                        banner.image_url = temp_banners[i];
                        i ++;
                    });
                    console.log(banners);
                    return banners;
                },
                banner_features () {
                    // return  _.slice(this.$store.state.feature_items, 0, 2);
                    temp_features = _.slice(this.$store.state.feature_items, 0, 2);
                    temp_images = ["//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038407000/Find your Store.jpg","//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038405000/Shopping Hours-1.jpg"];
                    var i  = 0;
                    temp_features.map(feature => {
                        feature.image_url = temp_images[i];
                        i ++;
                    });
                    return temp_features ;
                },
                feature_items () {
                    console.log(this.$store.state.feature_items);
                    // return _.slice(this.$store.state.results.feature_items, 2,this.$store.state.results.feature_items.length );
                    new_features = _.slice(this.$store.state.feature_items, 2,this.$store.state.feature_items.length );
                    
                    var temp_val = {};
                    temp_val.name = "Temp Feature";
                    temp_val.description = "Temp Feature description. Lorem ipsum dolor sit amet, consectetur adipiscing elit";
                    temp_val.url = "/promotions";
                    new_features.push(temp_val, temp_val);
                    
                    temp_images = ["//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038403000/ Gift Card Home Page.jpg","//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038406000/Customer Service 1-1.jpg","//codecloud.cdn.speedyrails.net/sites/5a3967d46e6f6479bf130000/image/jpeg/1516038407000/ Hours Home Page-1.jpg"];
                    var i  = 0;
                    
                    new_features.map(feature => {
                        feature.short_description = _.truncate(feature.description,{'length': 50});
                        feature.image_url = temp_images[i];
                        i ++;
                    });
                    return new_features;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "banners"), this.$store.dispatch("getData", "feature_items"), this.$store.dispatch("getData", "promotions")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                onOptionSelect(option) {
                  console.log('Selected option:', option)
                }
            }
        })
    })
</script>