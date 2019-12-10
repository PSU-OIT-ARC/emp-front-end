<template>
  <div id="app">
    <header class="row">
      <sso :app="$appName" :env="$envName" appRoles="Y" loginRequired="N" autoClaim="Y"  />
    </header>
    <!-- <Navbar /> -->

    <!-- <div class="container shadow"> -->
      <!-- <ul id="app-navigation" class="nav">
        <li><router-link to="/login">Login</router-link></li>
      </ul> -->
      <!-- <StickyNavbar/> -->
      <!-- <router-view  />
    </div> -->

    <div id="sticky-navbar">
      <div id="nav-container" class="row">
        <div class="col-md-12 shadow">
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
// import Navbar from '@/components/Navbar.vue'
// import StickyNavbar from '@/components/StickyNavbar.vue'
// import TimeoutPopup from '@/components/TimeoutPopup.vue'
// import SubmitPopup from '@/components/SubmitPopup.vue'
import EvacAssist from '@/components/EvacAssist.vue'
import AlertsInformation from '@/components/AlertsInformation.vue'
import EmergencyContactList from '@/views/EmergencyContactList'
import StickyNavbar from '@/components/StickyNavbar.vue'

export default {
  name: 'App',
  components: {
    // Navbar,
    // StickyNavbar,
    EvacAssist,
    AlertsInformation,
    EmergencyContactList,
  }
}

</script>
<style scoped>
#main{
  margin-bottom: 0px;
}
</style>
