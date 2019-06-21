<template>
  <v-app dark>
    <!-- <v-toolbar app> -->
      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>Meal</span>
        <span class="font-weight-light">Analytics</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar> -->
    <router-view/>

    <!-- <v-content>
      <Meal/>
    </v-content> -->
  </v-app>
  
</template>

<script>
import Meal from './components/Meal'

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
