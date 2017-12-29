<template>
	<div class="job_dets_container page_container" v-if="currentJob">
		<div class="row">
			<div class="col-sm-4 job_logo_container">
				<div>
					<img :src="currentJob.store.store_front_url_abs" alt=""/>
				</div>
			</div>
			<div class="col-sm-8 job_image_container text-left">
				<!--<img src="http://placehold.it/620x300"/>-->
				<img :src="currentJob.image_url"/>
			</div>
		</div>
		<div class="row" style="margin-left:0;">
			<div class="col-sm-4 job_details_container text-left">
				<div>
					
				</div>
			</div>
			<div class="col-sm-8 job_desc_container">
				<div class="text-left job_description">
					<p>{{currentJob.description}}</p>
				</div>
			</div>
		</div>
		<div class="job_container" v-if="storeJobs.length > 0">
		    <div class="job_container_title text-left all_caps"> OTHER {{currentJob.store.name | uppercase }} Jobs</div>
		    <div class="row job_job_dets text-left" v-for="job in storeJobs">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img :src="job.store.store_front_url_abs" alt=""/>
		        </div>
		        </div>
		        <div class="col-sm-5 job_div_dets">
		            <p class="promo_div_name">{{job.name}}</p>
		            <p class="promo_div_job_name">{{job.store.name | uppercase}}</p>
		            <p class="promo_div_date">{{job.start_date | moment("MMM D", timezone)}} - {{job.end_date | moment("MMM D", timezone)}}</p>
		            
						<p class="promo_div_description">{{job.description_short}}</p>
						<span class="feature_read_more">
							<router-link :to="'/jobs/'+job.slug" class="mobile_readmore" >
								<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
							</router-link>
						</span>
		        </div>
		    </div>
		</div>
		<!--<div class="job_main_header sub_title" v-if="storeJobs.length > 0 && property" style="border-top: 1px solid #000;">-->
  <!--             OTHER {{property.name | uppercase }} EVENTS-->
  <!--      </div>-->
  <!--      <div id="jobs_container" v-if="storeJobs">-->
  <!--          <div class="col-md-6 col-sm-6 no_padding" v-for="job in storeJobs" :data-cat="job.cat_list">-->
  <!--              <div class="job_item cats_row is-table-row">-->
  <!--                  <div class="col-md-5 col-xs-4 no_padding">-->
  <!--                      <img class="job_job_image" :src="job.image_url" :alt="job.name" />-->
  <!--                  </div>-->
  <!--                  <div class="col-md-7 padding_tb_20">-->
  <!--                      <router-link :to="'/jobs/'+job.slug" class="">-->
  <!--                          <h2 class="job_list_name">{{job.name}}</h2>-->
  <!--                      </router-link>-->
  <!--                      <p>-->
  <!--                          <span class="job_dates sub_title">{{job.start_date | moment("MMM D", timezone)}} - {{job.end_date | moment("MMM D", timezone)}}</span>-->
  <!--                      </p>-->
  <!--                      <div class="job_list_desc hidden_phone">{{job.description_short }}</div>-->
  <!--                      <div class="text_center position_relative hidden_phone">-->
  <!--                          <router-link :to="'/jobs/'+job.slug" class="animated_btn text_center">Read More</router-link>-->
  <!--                      </div>-->
  <!--                  </div>-->
  <!--              </div>-->
  <!--          </div>-->
  <!--      </div>-->
	</div>
</template>
<style>
    .row{
        margin-left:inherit;
    }
    /*.job_dets_container .row.is-table-row [class*="col-"] {*/
    /*    padding-top: inherit;*/
    /*    padding-bottom: inherit;*/
    /*    padding-left: 0;*/
    /*    padding-right: 0;*/
    /*}*/
    .job_div_dets {
        margin:20px auto;
    }
    .job_logo_container,
    .job_image_container,
    .job_details_container,
    .job_desc_container{
        padding: 20px 10px;
    }
    .job_image_container img{
        max-height: 300px;
    }
    .job_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    .job_details_container h1{
        padding: 0;
    }
    .job_store_name, .job_div_date{
        font-size: 16px;
    }
    .job_container_title{
        border-top:1px solid #aea99e;
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
</style>
<script>
    define(['Vue','moment'], function(Vue, moment) {
        return Vue.component("job-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentJob: null,
                    storeJobs : null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentJob = vm.findJobBySlug(to.params.id);
                    console.log(vm.currentJob);
                    if (vm.currentJob === null || vm.currentJob === undefined) {
                        vm.$router.replace({
                            name: '404'
                        });
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.currentJob = this.findJobBySlug(to.params.id);
                console.log(this.currentJob);
                if (this.currentJob === null || this.currentJob === undefined) {
                    this.$router.replace({
                        name: '404'
                    });
                }
            },
            watch: {
                map: function() {
                    var vm = this;
                    setTimeout(function() {
                        console.log(this);
                        vm.dropPin();
                    }, 500);
                },
                currentJob : function (){
                    if(this.currentJob != null) {
                    var vm = this;
                    var temp_job = [];
                    var current_id =_.toNumber(this.currentJob.id);
                    // console.log(x);
                    _.forEach(this.currentJob.store.jobs, function(value, key) {
                        if(_.toNumber(value) != current_id){
                            var current_job = vm.findJobById(value);
                            current_job.description_short = _.truncate(current_job.description, {'length': 70});
                            temp_job.push(current_job);
                        }
                    });
                        this.storeJobs = temp_job;
                        console.log("jobs",this.storeJobs);
                    }
                }  
            },
            computed: {
                findJobBySlug() {
                    return this.$store.getters.findJobBySlug;
                },
                findJobById() {
                    return this.$store.getters.findJobById;
                },
                findJobById() {
                    return this.$store.getters.findJobById;
                },
                property() {
                    return this.$store.getters.getProperty;
                },
                allJobs() {
                    return this.$store.getters.processedJobs;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                updateSVGMap(map) {
                    this.map = map;
                    console.log("this", this);
                },
                dropPin() {
                    console.log(this.currentJob);
                    console.log(this.currentJob.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentJob, '//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentJob)
                }
            }
        });
    });
</script>