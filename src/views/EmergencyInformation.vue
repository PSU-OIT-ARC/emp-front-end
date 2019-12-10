<template>

  <div id="emergency-information" class="main-content">
    <!-- <TimeoutPopup
      :timeLimit="9999"
      @timedOut.once="endSession"
    /> -->
    <!-- <SubmitPopup /> -->
    <!-- <StickyNavbar />
    <EvacAssist />
    <AlertsInformation />
    <EmergencyContactList /> -->
    <div id="sticky-navbar">
      <div id="nav-container" class="row">
        <div class="col-md-12">
        <b-tabs content-class="mt-6" justified style="background-color: #8c9516;">
        <b-tab title="Evacuation Assistance"><EvacAssist /></b-tab>
        <b-tab title="PSU Alerts"><AlertsInformation /></b-tab>
        <b-tab title="Emergency Contacts"><EmergencyContactList /></b-tab>
        </b-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TimeoutPopup from '@/components/TimeoutPopup.vue'
import SubmitPopup from '@/components/SubmitPopup.vue'
import EvacAssist from '@/components/EvacAssist.vue'
import AlertsInformation from '@/components/AlertsInformation.vue'
import EmergencyContactList from '@/views/EmergencyContactList'
import StickyNavbar from '@/components/StickyNavbar.vue'

export default {
  name: 'EmergencyInformation',
  components: {
    EvacAssist,
    AlertsInformation,
    EmergencyContactList,
    TimeoutPopup,
    SubmitPopup,
    StickyNavbar
  },

  methods: {
    endSession() {
      alert("This is the part where I'd delete your JWT.")
    }
  }
}
</script>

<style>

</style>
