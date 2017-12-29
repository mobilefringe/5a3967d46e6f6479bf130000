<template>
    <div id="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <img style= "width: 100%;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512574241932/placeholder_insidepage_image.png" alt="plaza" class="show_phone">  
        <div class="main_container">
            <div class="margin_25_across padding_top_40">
                <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-12">
                        <div class="row">
                            <div class="col-md-12"> 
                                <h3 class="hours_heading" >Regular Shopping Hours</h3>
                                <div id="hours_container" class="hours_container">
                                    <div class="hours_div" v-for="hour in hours">
                                        <span>{{dayOfTheWeek[hour.day_of_week]}}:</span>
                                        <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-7 hidden_phone">
                        <img style="margin-bottom:20px; width: 100%;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512574241932/placeholder_insidepage_image.png" alt="plaza">
                    </div> 
                </div>
                <div class="padding_top_20 show_phone"></div>
                <hr/>
                <div class="row">
                    <div class="col-md-12 ">
                        <div class="padding_top_20"></div>
                        
                        <h3 class="hours_heading">Reduced Holiday Hours of Operation</h3>
                        <div id="holidays_hours_container" class="hours_container">
                            <div class="hours_div"  v-for="hour in reducedHolidays">
                                <span>{{hour.holiday_name}} <br/>({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                                <span>{{hour.open_time | moment("h:mm A", timezone)}} - {{hour.close_time | moment("h:mm A", timezone)}}</span>
                            </div>
                        </div>
                        
                        <div class="padding_top_20"></div>
                        
                        <h3 class="hours_heading">Holiday Closures</h3>
                        <div id="closed_hours_container" class="hours_container">
                            <div class="hours_div" v-for="hour in closeHolidays">
                                <span>{{hour.holiday_name}} ({{hour.holiday_date | moment("MMM D YYYY", timezone)}})</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="padding_top_40"></div>
            </div>
        </div >
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dayOfTheWeek : [
                        "Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ]
                }
            },
            mounted () {
              console.log(this.hours);
              console.log(this.holidayHours);
            },
            computed: {
                timezone () {
                  return this.$store.getters.getTimezone;
                },
                hours () {
                    return this.$store.getters.getPropertyHours;
                },
                holidayHours () {
                    return this.$store.getters.getPropertyHolidayHours;
                },
                reducedHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return !o.is_closed; });
                },
                closeHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return o.is_closed; });
                }
            }
        });
    });
</script>
