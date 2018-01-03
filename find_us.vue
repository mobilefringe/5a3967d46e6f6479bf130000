<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row"> 
            <div class="left_column">
            <iframe class="gmap" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11627.944033926566!2d-79.765795!3d43.230753!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa964fdbddfdeae60!2sEastgate+Square!5e0!3m2!1sen!2sca!4v1427319653112" style="border:0" title="Map">Directions</iframe>
            <h2>How to Get Here</h2>

<p>Eastgate Square is easy to find and there is plenty of parking once you arrive!</p>

<p><strong>From the Queen Elizabeth Way (QEW)</strong></p>

<p>Simply follow the QEW, take the Centennial Pkwy N. exit, and continue south. We will be on the right hand side of the road.</p>

<p><strong>From the Red Hill Expressway</strong></p>

<p>Take the Queenston Rd. exit and head eastbound. You will find Eastgate Square on the left hand side, just before the intersection with Centennial Pkwy N.</p>

<h2>Public Transit</h2>

<p>Eastgate Square is serviced by the Hamilton Street Railway. The following Routes will get you here: 1 (King), B-Line Express, 55 (Stoney Creek Central), 56 (Centennial), and 58 (Stoney Creek Local). Visit <a href="//www.hamilton.ca/CityServices/transit/">www.hamilton.ca/CityServices/transit/</a> for bus maps and schedules.</p>

        </div>
        <div class="right_column">
            <p class="right_column_header">centre information</p>
            <div id="centre_info_container">
                <script id="centre_info_template" type="x-tmpl-mustache/text">
                    <p class="directory_content">{{name}}</p>
                    <p class="directory_content">{{address1}}</p>
                    <p class="directory_content">{{city}}, {{province_state}} {{postal_code}}</p>
                </script>
            </div>
            
            
        </div>
                <!--<div class="col-sm-6 contact_contents">-->
                <!--    <div class="description_text text_left">-->
                <!--        We value your feedback. Send us your comments or questions by completing the contact form below.-->
                <!--    </div>-->
                <!--    <form class="form-horizontal padding_top_20" action="form-submit" @submit.prevent="validateBeforeSubmit">-->
                <!--        <div class="form-group ">-->
                <!--            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('name')}">-->
                <!--                <label class="label" for="name">Name</label>-->
                <!--                <input v-model="form_data.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="1000">-->
                <!--                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>-->
                <!--            </div>-->
                <!--            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">-->
                <!--                <label class="label" for="email">Email</label>-->
                <!--                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">-->
                <!--                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>-->
                <!--            </div>-->
                <!--        </div>-->
                        <!--<div class="form-group">-->
                            
                        <!--</div>-->
                <!--        <div class="form-group">-->
                <!--            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">-->
                <!--                <label class="label" for="phone">Phone</label>-->
                <!--                <input v-model="form_data.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" placeholder="Phone" data-vv-delay="1000">-->
                <!--                <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>-->
                <!--            </div>-->
                <!--            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('subject')}">-->
                <!--                <label class="label" for="subject">Subject</label>-->
                <!--                <input v-model="form_data.subject" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="subject" type="text" placeholder="Subject" data-vv-delay="1000">-->
                <!--                <span v-show="errors.has('subject')" class="form-control-feedback">{{ errors.first('subject') }}</span>-->
                <!--            </div>-->
                <!--        </div>-->
                        <!--<div class="form-group ">-->
                            
                        <!--</div>-->
                <!--        <div class="form-group">-->
                <!--            <div class="col-xs-12" :class="{'has-error': errors.has('message')}">-->
                <!--                <label class="label" for="message">Message</label>-->
                <!--                <textarea v-model="form_data.message" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="message" type="text" placeholder="Message" data-vv-delay="1000"></textarea>-->
                <!--                <span v-show="errors.has('message')" class="form-control-feedback">{{ errors.first('message') }}</span>-->
                <!--            </div>-->
                <!--        </div>-->
                <!--        <div class="form-group">-->
                <!--            <div class="col-xs-12" :class="{'has-error': errors.has('message')}">-->
                <!--                <label class="label" for="validate">Enter the following number below to proceed: {{correctValNum}}</label> -->
                <!--                <input v-model="validaNum" v-validate="'required|numeric|min:6|max:6'" class="form-control" :class="{'input': true}" name="validate" type="text" placeholder="Enter above number" data-vv-delay="1000">-->
                <!--                <span v-show="errors.has('validate')" class="form-control-feedback">{{ errors.first('validate') }}</span>-->
                <!--                <span v-if="validaNum.length === 6 && validaNum !== correctValNum && errors.first('validate') == null" class="form-control-feedback" :class="{shake_element : validNumError}">Please enter correct number</span>-->
                <!--            </div>-->
                <!--        </div>-->
                <!--        <div class="form-group account-btn text-left m-t-10">-->
                <!--            <div class="col-xs-12">-->
                <!--                <button class="feature-readmore" type="submit" :disabled="formSuccess">Submit</button>-->
                <!--            </div>-->
                <!--        </div>-->
                <!--    </form>-->
                    
                <!--    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">-->
                <!--        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>-->
                <!--        <span class="sr-only">Success</span>-->
                <!--        Thank you for contacting us. A member from our team will contact you shortly.-->
                <!--    </div>-->
                <!--    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">-->
                <!--        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>-->
                <!--        <span class="sr-only">Error:</span>-->
                <!--        There was an error when trying to submit your request. Please try again later.-->
                <!--    </div>-->
                    
                <!--</div>-->
                <!--<div class="col-sm-6 hidden_phone">-->
                <!--    <img style="margin-bottom:20px;"  src='http://placehold.it/460x300' alt="plaza">-->
                <!--</div> -->
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    #contact_us_container .row{
        margin-left:inherit;
    }
    #contact_us_container {
        margin: 20px auto 0;
    }
    .form-group .form-control-feedback{
        font-size: 12px;
        top:50px;
        color: #F44336;
    }
</style>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate'], function(Vue, moment, tz, VueMoment, Meta, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("find-us-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null
                }
            },
            computed: {
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                property() {
                    return this.$store.getters.getProperty;
                }
            }
        });
    });
</script>