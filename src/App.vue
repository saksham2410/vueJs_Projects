<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PRS </span>
        <span class="font-weight-light">Error Reporter</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Prs/>
    </v-content>
  </v-app>
</template>

<script>
import Prs from './components/Prs'

export default {
  name: 'App',
  components: {
    Prs
  },
  data () {
    return {
      //
    }
  }
}
</script>
