<template>
  <div id="app">
    <header class="row">
      <sso :app="$appName" :env="$envName" appRoles="Y" loginRequired="N" autoClaim="Y"  />
    </header>
    <!-- <Navbar /> -->

    <div class="container shadow">
      <!-- <ul id="app-navigation" class="nav">
        <li><router-link to="/login">Login</router-link></li>
      </ul> -->
      <StickyNavbar/>
      <router-view  />
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import StickyNavbar from '@/components/StickyNavbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    StickyNavbar
  }
}

</script>
<style scoped>
#main{
  margin-bottom: 0px;
}
</style>
