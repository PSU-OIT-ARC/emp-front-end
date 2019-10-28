<template>
  <!-- Nav bar -->
    <div id="sticky-navbar">
      <div id="nav-container">
        <b-link to="assistance">Evacuation Assistance</b-link>
        <b-link to="alerts">PSU Alerts</b-link>
        <b-link to="contacts">Emergency Contacts</b-link>
      </div>
    </div>
</template>


<script>
  export default {
    name: 'Navbar',
    props: {
      current: String,
    },
    computed: {
      isAssistance() {
        return current == 'assistance';
      },
      isAlerts() {
        return current == 'alerts';
      },
      isContacts() {
        return current == 'contacts';
      }
    }
  }
</script>


<style scoped>

a {
  color: #ffffff;
}
.dropdown-menu {
  background-color: #8c9516;
}

#sticky-navbar {
  transition: background-color 1s;

  /* Make element obey sticky positioning */
  position: sticky;
  position: -webkit-sticky; /* Safari */
  top: 70px;
  bottom: 0px;
  width: 100vw;

  /* Set the fixed height of the footer here */
  height: 50px;

  /* Set the width to the whole veiwport */
  /* Even if the displaying language is rtl*/
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  /* Center contained links */
  display: flex;
  justify-content: space-around;

  /* Style */
  background-color: #8c9516;

}

#nav-container {
  display: flex;
  justify-content: space-around;

  margin: auto;
}

#mobile-nav-container{
  display: none;
}


@media (min-width: 980px) {
  #nav-container{
    width:100%;
  }
}

/* Landscape phone to landscape and desktop */
@media (min-width: 481px) and (max-width: 979px) {
  #nav-container{
    width:960px;
    /* margin:auto 8px auto 8px; */
  }

}

@media(min-width: 769px) and (max-width: 979px) {
  #sticky-navbar {
    top: 75px;
  }
}

@media(max-width: 768px) {
  #sticky-navbar {
    top: 63px;
  }
}

/* Landscape phones and down */
@media (max-width: 500px) {
  #sticky-navbar{
    position:fixed;
    /* bottom:0px; */
    width: 100%;
    left: 0px;
    min-width: 500px;
    top: 65px;
  }

  #nav-container{
    /* display: none; */
    /* padding: 15px; */
  }
  #mobile-nav-container{
    width:100%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;

    /* display: flex; */
    /* justify-content: space-evenly; */

    /* margin: 2.5px auto auto auto; */
    /* margin: auto; */
    /* padding: 5px 12px; */
  }
  #sticky-navbar {
    /* height: 60px; */
    width: 100%
  }
}


</style>
