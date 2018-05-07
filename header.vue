<template>
    <div>
        <div class="header-container hidden-phone " id="top" >
    		<div class="header page_container">
    			<div class="col-sm-6 text_left no_padding">
    				<router-link to="/" exact>
    					<img class="site-logo" src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1516652184126/ES_logo_red.png" alt="Eastgate Square">
    				</router-link>
    				<span class="pull-right show_phone">
    					<router-link style="background-color:transparent;" to="/newsletter" ><img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1511797731769/newsletter.png" class="mobile_newsletter_btn"></router-link>
    					<img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1455905827000/icon_menu.png" class="open_menu show_phone" alt="Mobile Menu"  id="open_menu"  @click="show_mobile_menu = !show_mobile_menu">
    				</span>
    			</div>
    			<div class="col-sm-6 hidden_phone">
    				<div class="social-div social_icons">
    					<router-link to="/contact_us" style="font-size:12px; margin-right:10px; color:#999999;display: inline-block;height: 30px;line-height: 30px;">CONTACT US</router-link>
    					<a href="http://www.facebook.com/eastgatesquaremall" target="_blank" class="social_link_icon social_fb" alt="Eastgate Facebook"></a>
    					<a href="http://www.twitter.com/EastgateSquare" target="_blank" class="social_link_icon social_twitter"></a>
    				</div>
    				<div class="newsletter-div">
    					<div class="newsletter_box" style="margin-bottom:5px">
    						<!--<form style="margin:0" action="//mobilefringe.createsend.com/t/d/s/irudui/" method="post">-->
    						<div class="input_box">
    							<input class="sub_input_text" id="fieldEmail" name="cm-irudui-irudui" type="email" v-model="newsletter_email" required placeholder="ENTER YOUR EMAIL TO SUBSCRIBE" />
    							<router-link style="background-color:transparent;" :to="'/newsletter?email='+ newsletter_email" ><img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1511797731769/newsletter.png" alt="Newsletter signup icon"></router-link>
    						</div>
    						<!--</form>-->
    					</div>
    					<div id="search-form" class="search-form">
    						<div class="input_box">
    							<search-component :list="processedStores" placeholder="SEARCH" :suggestion-attribute="suggestionAttribute" v-model="search_result" @select="onOptionSelect" class="text-left">
    								<template slot="item" scope="option" class="manual">
    									<article class="media">
    										<p>
    											<strong>{{ option.data.name }}</strong>
    										</p>
    									</article>
    								</template>
    							</search-component>
    							<img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1514998294110/search_icon.png" id="search_icon" alt="search icon"> 
    						</div>
    						<div class="input submit"></div>
    					</div>
    				</div>
    			</div>
    			<transition name="custom-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
    				<div class="mobile_menu_container" v-show="show_mobile_menu">
    					<div class="opened_mobile_menu" >
    						<div class="text-left" style="padding-bottom: 20px;border-bottom: 1px solid #fff;">
    							<img src="//codecloud.cdn.speedyrails.net/sites/5af082f76e6f6450e9040000/image/png/1513713349903/ES_logo_2.png"  alt="Eastgate Square Mobile Logo">
    							<img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1513274154350/close_menu_icon.png" class="pull-right" style="margin-top: 10px;" id="close_menu" @click="show_mobile_menu = !show_mobile_menu" alt="Close Mobile Menu">
    						</div>
    						<ul>
    							<li v-for="item in menu_items">
    								<router-link :to="item.href" :id="item.id" class="all_caps">{{item.name}} </router-link>
    								<div v-for="sub_menu in item.sub_menu" class="sub_menu_item">
    									<router-link :to="sub_menu.href" :id="sub_menu.id" exact>{{sub_menu.name}} </router-link>
    								</div>
    							</li>
    						</ul>
    						<div class="tel_num" v-if="property">
    							<a :href="'tel:'+property.contact_phone">{{property.contact_phone}}</a>
    						</div>
    						<div class="m_menu_today_hour" v-if="getTodayHours">
    							Open Today: {{getTodayHours.open_time | moment("h:mma", timezone)}} - {{getTodayHours.close_time | moment("h:mma", timezone)}}
    						</div>
    						<div class="social_icons_menu show_phone text-center">
    							<!--<p>Follow us on</p>-->
    							<a href="https://www.facebook.com/eastgatesquaremall/" target="_blank">
    							<img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512590798000/fb.png" class="" alt="Eastgate Facebook">
    							</a>
    							<a href="https://twitter.com/EastgateSquare" target="_blank">
    							<img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512590798000/twt.png" class="" alt="Eastgate Twitter">
    							</a>
    						</div>
    					</div>
    				</div>
    			</transition>
    		</div>
    	</div>
    	<div class="menu-container hidden-phone ">
    		<div class="menu-div page_container">
    			<div v-for="item in menu_items" :class="item.parent_class_list" style="display: inline-block;padding: 0 20px;">
    				<router-link :to="item.href" class="all_caps menu_link"  :id="item.name.id" exact v-if="item.sub_menu == undefined">
    					{{item.name}}
    				</router-link>
    				<div v-else class="all_caps dropdown">
    					<div class="menu_link" :id="item.name.id" @click="toggleSubMenu(item.id); item.show_sub_menu = !item.show_sub_menu">{{item.name}} </div>
    					<transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    						<div class="dropdown-menu" v-if="item.sub_menu" v-show="item.show_sub_menu">
    							<router-link tag="li" class="dropdown-item" v-for="sub_menu in item.sub_menu" :to="sub_menu.href">{{sub_menu.name}}</router-link>
    						</div>
    					</transition>
    				</div>
    			</div>
    		</div>
    	</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", 'json!menu_items.json'], function (Vue, Vuex, MenuItems) {
        return Vue.component("header-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    dataLoaded: false,
                    show_mobile_menu: false,
                    search_result : null,
                    suggestionAttribute: 'name',
                    newsletter_email: "",
                    menu_items: MenuItems,
                }
            },
            watch: {
                $route: function() {
                    // hide dropdown when route changes
                    _.forEach(this.menu_items, function(value, key) {
                        value.show_sub_menu = false;
                    });
                    this.show_mobile_menu = false; //close menu when navigating to new page
                },
                show_mobile_menu: function() {
                    if(this.show_mobile_menu === true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_mobile_menu === false) {
                        document.body.classList.remove("no-scroll");
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getTodayHours',
                    'processedStores'
                ])
            },
            methods : {
                onOptionSelect(option) {
                    this.search_result = "";
                    this.$nextTick(function() {
                        this.search_result = "";
                    });
                    this.$router.push("/stores/"+option.slug);
                    
                },
                toggleSubMenu (id) {
                   this.menu_items.map(menu => {
                        if(menu.id !== id) {
                            menu.show_sub_menu = false;
                        }
                    });
                },
            }
        });
    });
</script>