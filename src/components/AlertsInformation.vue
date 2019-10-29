<template>
  <div id="alert-info" class="page-component">
    <div class="page-title">
      <h1 style="text-align:center">PSU Alert Emergency Notification System Registration</h1><br>
    </div>
    <div id="information-1" class="textblock">
      <p>
      PSU Alert is an emergency communications system designed to disseminate
      emergency messages via text messages, email, and phone calls. In the
      event of an emergency, PSU administration can use this system to share
      critical, and potentially lifesaving, information with the campus community.
      </p>
      <br>
      <p><b>PSU ensures that all <i>@pdx.edu</i> email addresses are automatically
      subscribed to receive PSU Alert messages, but it is up to individual
      students, faculty, and staff to subscribe to receive PSU Alert messages via
      text, phone call, or email to their personal accounts.</b>
      </p>
      <br>
      <p>If you have any responsibilities for the welfare of staff, faculty,
      students, and/or visitors on campus, or if you supervise any such
      individuals on campus, we encourage you to subscribe to receive information
      in multiple ways (e.g., text, cell phone, home phone, personal email).
      </p>
      <br>
      <p>Your subscription information will be kept confidential. You will only be
      contacted via PSU Alerts in the event of an actual emergency or a test of
      the system.
      </p>
    </div>

    <div id="links-1" class="textblock">
    For more information about the PSU Alert system:
    <ul>
      <li>Visit the
        <a href="http://www.pdx.edu/emergency-management/psu-alert-emergency-notification-system" target="_blank">
          PSU Alert
          <sup style="color:Blue;">
            <i class="fa fa-external-link xsm" aria-label="opens in a new window" title="opens in a new window"></i>
          </sup>
        </a>
        <a href="http://www.pdx.edu/psualert" target="_blank">
          <sup style="color:Blue;"/>
        </a>
        webpage
      </li>
      <li>Contact
        <a href="http://www.pdx.edu/emergency-management" target="_blank">
          PSU Emergency Management
          <sup style="color:Blue;">
            <i class="fa fa-external-link xsm" aria-label="opens in a new window" title="opens in a new window"/>
          </sup>
        </a>
      </li>
      <li>Or the
        <a href="http://www.pdx.edu/cpso" target="_blank">
          Campus Public Safety Office
          <sup style="color:Blue;">
            <i class="fa fa-external-link xsm" aria-label="opens in a new window" title="opens in a new window"/>
          </sup>
        </a>.
      </li>
    </ul>
    <br/>
    <b>Notes:</b>
    <br>
    <ul>
      <li>To receive text messages <i>and</i> phone calls, you must enter your
        number (even if it is the same number) into both sections of the form.
      </li>
      <li>The PSU Alert system cannot accommodate international phone numbers
        or Google Voice numbers at this time.
      </li>
    </ul>
  </div>

  <hr/>

  <div id="text-information" class="textblock boxed">
    <input type="hidden" name="SYNCHRONIZER_TOKEN" value="ff5b0d0c-6be6-4a67-b8a7-f0dafade3fd5" id="SYNCHRONIZER_TOKEN">
    <input type="hidden" name="SYNCHRONIZER_URI" value="/gen/alert/index" id="SYNCHRONIZER_URI">
    <h2>
      Subscribe to PSU Alert Text Messages<small><span style="color:red">*</span></small>
    </h2>
    <p class="text-muted">
        <span style="color:red"><b>*Required:</b></span>
        Either enter a text message number or opt-out by reading the notice and checking the box.
    </p>
    <br/>

    <b>Text Message Opt In</b>
    <br/>
    <br/>
    <div class="row">
      <div class="col-md-3">
        <label for="smsDevice1" code="alert.index.textMessage#LABEL" alt="Text Message Number" specialelement="true">Text Message Number</label>
        <input v-model="smsNumber" type="tel" placeholder="123-456-7890" class="form-control" id="smsDevice1" name="smsDevice1" maxlength="12" value="" pattern="\d{3}-?\d{3}-?\d{4}" title="10-digit phone number" onkeyup="this.value = formatTelephone(this.value);" aria-label="10-digit phone number"/>
      </div>
    </div>
    <br/>
    <small class="text-muted">
      Standard text message rates apply. Text messages will come from one of two IDs: 231-77 or 630-79.
      <br/>
    </small>

    <br/><p><b>OR</b></p><br/>

    <div class="row">
      <div class="col">
        <b>Text Message Opt Out</b>

        <p>Text messages are an extremely effective way to distribute emergency
        notifications quickly. If you choose not to register your cell phone
        number to receive PSU Alert notifications via text message, you may
        not get necessary information to stay safe in emergency or threatening
        situations, such as campus closures or threats to your safety (e.g.
        active shooter, evacuation, etc.).</p>
        <br>
        <div class="checkbox-card text-center">
          <label code="alert.index.textOptOut#LABEL" for="opt-out" alt="I acknowledge that I have read and understand the risks described above and I choose to opt out of receiving PSU Alert notifications via text message." specialelement="true">
            <span class="custom-checkbox"></span>
            <input id="opt-out" v-model="smsStatusInd" type="checkbox" name="smsStatusInd" true-value="Y" false-value="N"/>
            &nbsp;I acknowledge that I have read and understand the risks described
            above and I choose to opt out of receiving PSU Alert notifications
            via text message.
          </label>
        </div>
        <br style="clear: both;">
      </div>
    </div>
  </div>
  <hr/>

  <div id="voice-information" class="textblock boxed">
    <h2>Subscribe to PSU Alert Voice Messages</h2>
    <br>

    <div class="row">
      <div class="col-md-6">
        <label for="mobilePhone" code="alert.index.businessPhone#LABEL" alt="Primary Phone Number" specialelement="true">Primary Phone Number</label>
        <input v-model="phoneNumber" type="tel" placeholder="Primary Phone Number" class="form-control" id="mobilePhone" name="mobilePhone" maxlength="12" value="" pattern="\d{3}-?\d{3}-?\d{4}" title="10-digit phone number" onkeyup="this.value = formatTelephone(this.value);" aria-label="10-digit phone number"/>
      </div>
      <div class="col-md-6">
        <label for="businessPhone" code="alert.index.mobilePhone#LABEL" alt="Alternate Phone Number" specialelement="true">Alternate Phone Number</label>
        <input v-model="alternatePhoneNumber" type="tel" placeholder="Alternate Phone Number" class="form-control" id="businessPhone" name="businessPhone" maxlength="12" value="" pattern="\d{3}-?\d{3}-?\d{4}" title="10-digit phone number" onkeyup="this.value = formatTelephone(this.value);" aria-label="10-digit phone number"/>
      </div>
    </div>
    <br style="clear: both;">
    <small class="text-muted">Standard rates apply. Calls will come from the phone number: 1-877-725-9111.</small>
  </div>

  <div id="email-information" class="textblock boxed">
    <h2>Subscribe to PSU Alert Emails</h2>
    <p class="text-muted">
All <i>@pdx.edu</i> email addresses are automatically subscribed to receive PSU Alert messages and Timely Warning notifications and cannot be unsubscribed.<br>
    If you choose to subscribe an additional email address, that email address will also receive both PSU Alert messages and Timely Warning notifications.
    </p><br>

    <div class="row">
      <div class="col-md-6">
        <label for="psuemail" code="alert.index.psuEmail#LABEL" alt="PSU email address" specialelement="true">PSU email address</label>
        <input v-model="psuEmailAddress" type="email" placeholder="PSU email address" class="form-control" id="psuemail" value="leake@pdx.edu" readonly="">
      </div>
      <div class="col-md-6">
        <label for="emailAddress" code="alert.index.emailAddress#LABEL" alt="Alternate email address" specialelement="true">Alternate email address</label>
        <input v-model="alternateEmailAddress" type="email" placeholder="Alternate email address" class="form-control" id="emailAddress" name="emailAddress" value="">
      </div>
    </div>
    <br style="clear: both;">
  </div>

  <div class="button-holder">
  <fieldset class="form-group" id="formButtons" style="border:0px transparent none;">
    <!-- <button type="button" class="submit" id="reset-btn" v-on:click="submitAlertsInformation()">Submit</button>
    <button type="button" class="reset" id="submit-btn" v-on:click="fillAlertsInformation()">Reset</button> -->

    <button type="button" class="btn btn-lg btn-primary" v-on:click="submitAlertsInformation()">Submit</button>&nbsp;&nbsp;&nbsp;
    <button type="button" class="btn btn-lg btn-default" v-on:click="fillAlertsInformation()">Reset</button>

   </fieldset>
   </div>
   <br>
    <hr/>
   <div id="emergency-response-information">
     <h2>Emergency Response Planning</h2>
     <p>
     Preparing for emergencies is a shared responsibility across the whole community.
     That includes individuals, campus departments and units, the PSU Administration, and the larger Portland community.
     Individuals can take steps to prepare themselves to help ensure their own safety and comfort should an emergency incident occur while at home, at school, or at work.
     For emergency planning information, visit <a href="http://www.pdx.edu/emergency-management" target="_blank">PSU Emergency Management’s website<sup style="color:Blue;"> <i class="fa fa-external-link xsm" aria-label="opens in a new window" title="opens in a new window"></i></sup></a>, or contact: <a href="mailto:EmrMgmt@pdx.edu">PSU Emergency Management</a>.
     </p>
   </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PSUAlertInformation',
  model: {
    event: 'submit'
  },
  props: {},

  data() {
    return {
      smsNumber: '',
      smsStatusInd: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      psuEmailAddress: '',
      alternateEmailAddress: ''
    }
  },

  methods: {
    fillAlertsInformation() {
      var vm = this;

      axios({
        method: 'post',
        baseURL: 'http://127.0.0.1:8000/getEmergencyNotifications/',
      })
      .then(response => {
        let data = response.data[0];
        vm.psuEmailAddress = data['campus_email'];
        vm.alternateEmailAddress = data['external_email'];
        vm.phoneNumber = data['primary_phone'];
        vm.alternatePhoneNumber = data['alternate_phone'];
        vm.smsStatusInd = data['sms_status_ind'];
        vm.smsNumber = data['sms_device'];
        vm.activityDate = data['activity_date'];
      })
      .catch(error => console.log(error.toString()))
    },

    submitAlertsInformation() {
      //emits event to root to create popup
      this.$root.$emit('submit');

      var vm = this;

      // Update Registration checkbox state in the database
      let bodyFormData = new FormData();

      let local_to_api_map = {
        'alternateEmailAddress': 'external_email',
        'psuEmailAddress': 'campus_email',
        'phoneNumber': 'primary_phone',
        'alternatePhoneNumber': 'alternate_phone',
        'smsStatusInd': 'sms_status_ind',
        'smsNumber': 'sms_device'
      }

      for (let key in local_to_api_map) {
        if(vm[key]) {
            bodyFormData.set(local_to_api_map[key], vm[key])
        }
      }

      axios({
        method: 'post',
        baseURL: 'http://127.0.0.1:8000/setEmergencyNotifications/',
        data: bodyFormData
      })
      .catch(error => console.log(error))
    },
  },

  //TODO It seems Auth tokens are clearing or not working if we make repeat requests after a refresh. Don't know why.
  mounted() {
    this.fillAlertsInformation()
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.text-box{
  max-width: 240px;
}

/* .checkbox-card {
    background:#8b9516;
    color:#ffffff;
    display:inline-block;

    margin-top: 24px;
    margin-bottom:24px;
    margin-left:16px;
    margin-right:16px;
    padding:12px;
    border-radius:5px;
}
 */
</style>
