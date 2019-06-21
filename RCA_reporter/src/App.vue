<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>RCA </span>
        <span class="font-weight-light">Reporter</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Rca/>
    </v-content>
  </v-app>
</template>

<script>
import Rca from './components/Rca'

export default {
  name: 'App',
  components: {
    Rca
  },
  data () {
    return {
      //
    }
  }
}
</script>
