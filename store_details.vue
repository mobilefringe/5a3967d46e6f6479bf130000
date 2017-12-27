<template>
  <div class="row page_container" v-if="currentStore">
    <div class="col-md-4">
      <div>
        <h1>{{currentStore.name}}</h1>
        <p>{{currentStore.category_name}}</p>
        <p>{{currentStore.phone}}</p>
        <a v-bind:href="currentStore.website">{{currentStore.website}}</a>
      </div>
    </div>
    <div class="col-md-8">
      <div>
        <p>{{currentStore.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          console.log(vm.currentStore );
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        console.log(this.currentStore );
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        }
      }
    });
  });
</script>



<!--<script type="text/javascript" src="/javascripts/gallery/slimbox/slimbox2.js"></script>-->
<!--<link rel="stylesheet" href="/javascripts/gallery/slimbox/slimbox2.css" type="text/css" media="screen" />-->
<!--<style>-->
<!--    .feature-div{-->
<!--        min-height:0;-->
<!--    }-->
<!--</style>-->
<!--<script>    -->
<!--        $("#stores_link").css("color","black");-->
<!--        $("#centremap").css("color","#231f20");-->
<!--</script>-->
<!--<div class="menu-container">-->
<!--    <div class="menu-div">-->
<!--        <div class="menu_item">-->
<!--        <a href="/stores" class="submenu_item" style="color:black">Directory & Map</a>-->
<!--        </div>-->
<!--        <div class="menu_item">-->
<!--        <a href="/hours" class="submenu_item">Store hours</a>-->
<!--        </div>-->
<!--        <div class="menu_item">-->
<!--        <a href="/pages/northpark-retailer-news" class="submenu_item">Retailer News</a>-->
<!--        </div>-->
<!--        <div class="menu_item">-->
<!--        <a href="https://www.amctheatres.com/movie-theatres/dallas-ft-worth/amc-northpark-15" target="_blank"  class="submenu_item">AMC</a>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--<div class="store_detail_top_container">-->
<!--    <div class="store_detail_top">-->
<!--        <div class="store_detail_top_left">-->
<!--            {% if store.store_front_url contains "original/missing.png" %}-->
<!--                <img class="store_detail_top_left_image" src="{{4033 | get_image_url}}"/>-->
<!--            {% else %}-->
<!--                <img class="store_detail_top_left_image" src="{{store.store_front_url}}"/>-->
<!--            {% endif %}-->
<!--            <a style="margin-bottom:15px" class="back visible-phone" href="/stores"> < back to Directory</a>-->
<!--            <p class="store_detail_name hidden-phone">-->
<!--                {{store.name}}-->
<!--            </p>-->
<!--            <div class="store_detail_desc hidden-phone">-->
<!--                {{store.description}}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="store_detail_top_right">-->
<!--            <a class="back hidden-phone" href="/stores"> < back to Directory</a>-->
<!--            <h2 class="visible-phone" id="contact-button" onclick="javascript:toggle_hidden_div('contact')">contact<i class="pull-right fa fa-chevron-up"></i></h2>            -->
<!--            <div class="mobile-hidden-div" id="contact-div" style="display:block">-->
<!--                <p class="store_phone">-->
<!--                    {{store.phone}}-->
<!--                </p>-->
<!--                {% assign store_hoursnum = store.store_hours | size %}-->
<!--                {% if store_hoursnum > 0 %}-->
<!--                <p class="store_detail_content"><strong>Hours:</strong></p>-->
<!--                 <ul class="store_detail_hour_list" id='hours_ul'>-->
<!--                    <script>-->
<!--                    hour_array = []-->

<!--                    {% for hour in store.store_hours %}-->
                   
<!--                                var hour = {}-->
<!--                                var day_index = '{{hour.day_of_week}}'-->
<!--                                hour['day'] = '{{hour | get_day_of_week}}'-->
                                
<!--                                {% assign open_min = hour.open_time | in_my_time_zone: "56" | date: "%M" %}-->
<!--                                {% assign close_min = hour.close_time | in_my_time_zone: "56" | date: "%M" %}-->
<!--                                {% if open_min == '00' %}-->
<!--                                    hour['open'] =  '{{hour.open_time | in_my_time_zone: "56" | date: "%l%p" }}'-->
<!--                                {% else %}-->
<!--                                    hour['open'] =  '{{hour.open_time | in_my_time_zone: "56" | date: "%l:%M%p"}}'-->
<!--                                {% endif %}-->
<!--                                {% if close_min == '00' %}-->
<!--                                    hour['close'] = '{{hour.close_time | in_my_time_zone: "56" | date: "%l%p" }}'-->
<!--                                {% else %}-->
<!--                                    hour['close'] = '{{hour.close_time | in_my_time_zone: "56" | date: "%l:%M%p" }}'-->
<!--                                {% endif %}-->
<!--                                if (day_index == '0'){-->
<!--                                    hour['day_index'] = 7    -->
<!--                                } else {-->
<!--                                     hour['day_index'] = day_index -->
<!--                                }-->
                                
<!--                                hour_array.push(hour)-->
<!--                   {% endfor %} -->
<!--                   hour_array = hour_array.sort(function(a,b){-->
<!--                       if(a['day_index'] > b['day_index']){ return 1}-->
<!--                        if(a['day_index'] < b['day_index']){ return -1}-->
<!--                          return 0;-->
<!--                    });-->
<!--                   $.each( hour_array , function( key, val ) {-->
<!--                       if (val.day_index !="" || val.da_index != null){-->
<!--                            $("#hours_ul").append('<li><strong>'+val.day+'</strong> - '+val.open+' - '+val.close+'</li>')-->
<!--                        }-->
<!--                   })-->
<!--                </script>-->
<!--                </ul>-->
<!--                {% endif %}-->
<!--                {% if store.manager_name and store.manager_name != "" %}-->
<!--                <p class="store_detail_content"><strong>Store Manager: </strong>{{store.manager_name}}</p>-->
<!--                {% endif %}-->
<!--                {% if store.website != "" %}-->
<!--                    <a href="http://{{store.website}}" target="_blank"><p class="store_detail_content"><strong>View Website: </strong>{{store.website}}</p></a>-->
<!--                {% endif %}-->
<!--            </div>-->
<!--            <div class="visible-phone" style="width:100%">-->
<!--                <h2 class="visible-phone" id="description-button" onclick="javascript:toggle_hidden_div('description')">Description</h2>-->
<!--                <div class="mobile-hidden-div" id="description-div" style="display:block">-->
<!--                    <p class="store_detail_name">-->
<!--                        {{store.name}}-->
<!--                    </p>-->
<!--                    <div class="store_detail_desc">-->
<!--                        {{store.description}}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            
<!--        </div> -->
<!--    </div>-->
<!--</div>-->

<!--<div class="feature-div">-->
<!--    <div class="page_body_left">-->
    
         <!-- map -->
<!--        <div class="row-fluid">-->
<!--            {% if store.z_coordinate == 1 %}-->
<!--                {% assign level = "One" %}-->
<!--            {% elsif store.z_coordinate == 2 %}-->
<!--                {% assign level = "Two" %}-->
<!--            {% elsif store.z_coordinate == 3 %}-->
<!--                {% assign level = "Three" %}-->
<!--            {% endif %}-->
<!--            <p class="store_detail_content" style="font-size:13px;margin-bottom:10px"><strong>Location: </strong>Level {{level}}</p>-->
<!--            <div class="map" style="margin-bottom:30px">-->
<!--                <div id="mapsvg_store_detail"></div>  -->
<!--            </div>-->
<!--        </div>-->
        
<!--        {% assign store_promo = store.current_promotions | size %}-->
<!--        {% if store_promo > 0 %}-->
<!--            <div class="promo_div">-->
<!--                <h2 class="hidden-phone">SALES AND PROMOTIONS</h2>-->
<!--                <h2 class="visible-phone" id="promotions-button" onclick="javascript:toggle_hidden_div('promotions')">promotions<i class="pull-right fa fa-chevron-down"></i></h2>-->
<!--                <div class="mobile-hidden-div" id="promotions-div">-->
<!--                    <ul class="promo_ul">-->
<!--                        {% for promo in store.current_promotions %}-->
<!--                            <li>-->
<!--                                <div class="promo_box">-->
<!--                                    <div class="promo_box_left">-->
<!--                                        {% if promo.promo_image_path contains "original/missing.png" %}-->
<!--                                            <a href="{{4032 | get_image_url}}" rel="lightbox-gallery" title="{{promo.name}}"><img class="promo_box_image" src="{{4032 | get_image_url}}"></a>   -->
<!--                                        {% else %}-->
<!--                                            <a href="{{promo.promo_image_path}}" rel="lightbox-gallery" title="{{promo.name}}"><img class="promo_box_image" src="{{promo.promo_image_path}}"></a>   -->
<!--                                        {% endif %}-->
<!--                                    </div>-->
<!--                                    <div class="promo_box_right">-->
<!--                                        <a href="/promotions/{{promo.slug}}"><p class="promo_box_name">{{promo.name}}</p></a>-->
<!--                                        <p class="promo_box_date">{{promo.start_date | date: "%B %d"}} - {{promo.end_date | date: "%B %d"}}</p>-->
<!--                                        <div class="promo_box_desc">{{promo.description | strip_html | truncatewords: 15}}</div>-->
<!--                                        <div class="promo_box_social_div">-->
<!--                                            <span class='st_facebook'></span>-->
<!--                                            <span class='st_pinterest'></span>-->
<!--                                            <span class='st_twitter'></span>-->
<!--                                            <span class='st_sharethis'></span>    -->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </li>-->
<!--                        {% endfor %}-->
<!--                    </ul>-->
<!--                </div>-->
<!--            </div>-->
<!--        {% endif %}-->
<!--    </div>-->
<!--    <div class="page_body_right store_detail_right">-->
<!--        {% for repo in site.property.repos %}-->
<!--            {% if repo.slug == "northpark-menus" %}-->
<!--                {% for file in repo.site_images %}-->
<!--                    {% if file.url == store.slug %}-->
<!--                        {% assign hasmenu = "True" %}-->
<!--                    {% endif %}-->
<!--                {% endfor %}-->
<!--            {% endif %}-->
<!--        {% endfor %}-->
<!--        {% if hasmenu == "True" %}-->
<!--            {% for repo in site.property.repos %}-->
<!--                {% if repo.slug == "northpark-menus" %}-->
<!--                    <h2 class="hidden-phone" style="border-bottom:1px solid #c9c8c8;padding-top:0;margin-bottom:5px;padding-bottom:5px">MENU</h2>-->
<!--                    <h2 class="visible-phone" id="menu-button" onclick="javascript:toggle_hidden_div('menu')">menu<i class="pull-right fa fa-chevron-down"></i></h2>-->
<!--                    <div class="mobile-hidden-div" id="menu-div">-->
<!--                        {% for file in repo.site_images %}-->
<!--                            {% if file.url == store.slug %}-->
<!--                                <a href="{{file.image_url}}" target="_blank">-->
<!--                                    <p>{{file.name}} > </p>  -->
<!--                                </a>-->
<!--                            {% endif %}-->
<!--                        {% endfor %}-->
<!--                    </div>-->
<!--                {% endif %}-->
<!--            {% endfor %}-->
<!--        {% endif %}-->
<!--        <div style="text-align:center">-->
            
<!--        </div>-->
<!--        {% assign store_tags = store.tags | split:","%}-->
<!--        {% for tag in store_tags %}-->
<!--            {% if tag contains "opentable" %}-->
<!--                {% assign number = tag | remove: "opentable" %}-->
<!--                <h2 class="visible-phone" id="reservations-button" onclick="javascript:toggle_hidden_div('reservations')">reservations<i class="pull-right fa fa-chevron-down"></i></h2>-->
<!--                <div class="mobile-hidden-div" style="text-align:center" id="reservations-div">-->
<!--                    <script type="text/javascript" src="https://secure.opentable.com/frontdoor/default.aspx?rid={{number | remove: " " }}&restref={{number | remove: " " }}&bgcolor=FFFFFF&titlecolor=636363&subtitlecolor=636363&btnbgimage=https://secure.opentable.com/frontdoor/img/ot_btn_black.png&otlink=FFFFFF&icon=dark&mode=short&hover=1"></script>                    -->
<!--                </div>-->
<!--            {% endif %}-->
<!--        {% endfor %}-->
                
        
<!--    </div>-->
<!--</div>-->

<!--<script>-->
<!--    $(".page_body_right").css("width","35%");-->
<!--</script>-->
<!--<script type="text/javascript">var switchTo5x=true;</script>-->
<!--<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>-->
<!--<script type="text/javascript">stLight.options({publisher:'12345',});</script>-->
<!--<script type="text/javascript" src="/javascripts/mapsvg/jquery.js"></script>-->
<!--<script type="text/javascript" src="/javascripts/mapsvg/raphael.js"></script>-->
<!--<script type="text/javascript" src="/javascripts/mapsvg/jquery.mousewheel.js"></script>-->
<!--<script type="text/javascript" src="/system/site_images/photos/000/005/107/original/mallmaverick_svgmap.js?1412885524"></script>-->
<!--<script>-->
    
<!--    $(document).ready (function(){-->
<!--       var region = '{{store.svgmap_region}}'-->
<!--        if (region != ""){-->
<!--            drop_pin();     -->
<!--        }-->
        
<!--    })-->

<!--   var map = $('#mapsvg_store_detail').mapSvg({-->
        source: '{{site.property.svgmap_file_path}}',    // Path to SVG map
<!--        colors: {stroke: '#aaaaaa', hover: 0},-->
<!--       popover: 'auto',-->
<!--        disableAll: false,-->
<!--      viewBox:'{{store.svgmap_region}}',-->
<!--        regions: {-->
<!--           {% if store.svgmap_region %}-->
<!--            {{ store.svgmap_region }}:{-->
<!--            tooltip: "<label class='store_name_map store_name_map_detail'>{{ store.name }}</label>",-->
<!--                popover : "<label class='store_name_map store_name_map_detail'>{{ store.name }}</label>",-->
<!--                selected: true,-->
<!--                attr:{fill: '#a6a6a6'}-->
<!--},        -->
<!--            {% endif %}-->
<!--        },-->
<!--        tooltipsMode:   'custom',-->
<!--        zoom: true,-->
<!--        pan:true,-->
<!--        panLimit:true,-->
<!--        cursor:'pointer',-->
<!--        responsive:true,-->
<!--        zoomLimit: [0,20],-->
<!--        height:246,-->
<!--        width:560,-->
<!--        zoomButtons: {'show': true, 'location': 'left'}-->
<!--    });-->

<!--    function drop_pin(){-->
<!--        var coords = map.get_coords('{{store.svgmap_region}}');-->
<!--        var height = parseInt(coords["height"])-->
<!--        var width = parseInt(coords["width"])-->
<!--        var x_offset = (parseInt(width) / 2);-->
<!--        var y_offset = (parseInt(height) /2);-->
<!--        map.setMarks([{ xy: [coords["x"] - 25 + x_offset, coords["y"] - 85 + y_offset],-->
<!--                   attrs: {-->
                            src:  'http://cdn.mallmaverick.com/system/sites/map_markers/000/000/056/original/map_pincopy.png?1423594955'     // image for marker
<!--                           }-->
<!--                 }-->
<!--                 ])-->
<!--    }-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->
<!--    $('#btnZoomIn').click()-->

<!--</script>-->
