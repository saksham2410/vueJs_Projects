<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <v-card-text>
        <h4>Paste your Google Spreadsheet URL...</h4>
        <!-- <p>(<a href="https://docs.google.com/spreadsheets/d/1HFGm_cSH_XeZtxfREusftu-4S1LYZeAVSVjWMmsRHtY/copy" target="_blank">make a copy</a>)</p> -->
        <div class="input-container">
          <div class="data-link-input">
            <form v-on:submit="validateURL()">
              <input type="text" class="form-control" placeholder="Paste your Google Spreadsheet URL here." v-model="parseURL">
            </form>
          </div>
          </div>
          </v-card-text>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      datatype: 'Saksham',
      processing: 'False'
    })
  }
</script>

<style>

</style>
