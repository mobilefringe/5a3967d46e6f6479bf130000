<template>
    <div class="row page_container">
        <div class="banner_div">
            <div class="main_banner">
                <div  class="prev"></div>
                <slick ref="slick" :options="slickOptions">
                    <div class="" v-for="banner in banners">
                       <img src="http://placehold.it/700x460" class="" alt=""><!--<img :src="banner.image_url" class="" alt="">-->
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
                        <img class="top_image" src='http://placehold.it/220x220'/><!--<img class="top_image" :src='feature.image_url'/>-->
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
                        <img src="http://placehold.it/300x625" class="feature-image" /><!--<img :src="item.image_url" class="feature-image" />-->
                        <p class="feature-html">{{item.html}}</p>
                        <p class="feature-desc">{{item.short_description}}</p>
                        <span class="feature_read_more"><router-link :to="item.url" class="mobile_readmore" ><p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p></router-link></span>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vue!today_hours", "vue!search-component", 'vue!vue-slick'], function(Vue, TodayHoursComponent, SearchComponent, slick) {
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
                    }
                }
            },
            computed: {
                property(){
                  return this.$store.getters.getProperty;
                },
                processedStores() {
                  return this.$store.getters.processedStores;
                },
                banners () {
                    console.log(_.orderBy(this.$store.state.results.banners, ['position'], ['asc']));
                    return _.orderBy(this.$store.state.results.banners, ['position'], ['asc']);
                    // banners: ['http://placehold.it/700x460','http://placehold.it/700x460','http://placehold.it/700x460']
                },
                banner_features () {
                   return  _.slice(this.$store.state.results.feature_items, 0, 2);
                },
                feature_items () {
                    console.log(this.$store.state.results.feature_items);
                    // return _.slice(this.$store.state.results.feature_items, 2,this.$store.state.results.feature_items.length );
                    new_features = _.slice(this.$store.state.results.feature_items, 2,this.$store.state.results.feature_items.length );
                    new_features.map(feature => {
                        feature.short_description = _.truncate(feature.description,250);
                    });
                    var temp_val = {};
                    temp_val.name = "Temp Feature";
                    temp_val.description = "Temp Feature description";
                    temp_val.url = "/promotions";
                    new_features.push(temp_val, temp_val);
                    return new_features;
                }
            },
            methods: {
                onOptionSelect(option) {
                  console.log('Selected option:', option)
                }
            }
        })
    })
</script>