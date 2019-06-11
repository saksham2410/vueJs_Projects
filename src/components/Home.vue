<template>
  <v-container>
    <v-layout text-xs-center wrap>
      Template ID : {{templateID}}
      <v-card-text>
        <h4>Paste your Google Spreadsheet URL...</h4>
        <!-- <p>(<a href="https://docs.google.com/spreadsheets/d/1HFGm_cSH_XeZtxfREusftu-4S1LYZeAVSVjWMmsRHtY/copy" target="_blank">make a copy</a>)</p> -->
        <div class="input-container">
          <div class="data-link-input">
            <!-- <form v-on:submit="validateURL()">
              <input type="text" class="form-control" placeholder="Paste your Google Spreadsheet URL here." v-model="parseURL">
            </form>-->
          </div>
        </div>
      </v-card-text>
      <v-card-text>
        Header Number : {{HeaderCount}}
        <v-form>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex sm12 md12 v-for="headindex in HeaderCount" :key="headindex">
                <v-text-field v-model="Template.item[headindex].Header" label="Enter A Header: " outline></v-text-field>
                <v-text-field
                  v-for="index in ClauseCount"
                  :key="index"
                  v-model="Template.item.Clause[index]"
                  label="Enter A Clause for this header"
                  outline
                ></v-text-field>
                <v-btn color="primary" @click="addClause">Add Clause</v-btn>
              </v-flex>
              <v-btn color="primary" @click="addHeader">Add Header</v-btn>
              <v-btn color="primary" @click="insertData">Create Template</v-btn>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    datatype: "Saksham",
    processing: "False",
    cities: ["bangalore", "pakistan"],
    templateID: "1",
    HeaderCount: "1",
    ClauseCount: "1",
    Template: { item: {Header: "", Clause: []} },
    headerdata: {
      Header: { item_id: "", Header: "" },
      Clause: { item_id: {}, Clause: {} }
    },
    tobeSent: {
      item_id:'',
      Type: '',
      description: ''
    }
  }),
  methods: {
    addClause() {
      this.ClauseCount++;
    },
    addHeader() {
      this.HeaderCount++;
      this.ClauseCount = 0;
      // this.Template.item.push({sHeader: '', Clause: []})
    },
    async insertData() {
      
      // if()
      //use ParseInt()
      this.headerdata.Header.Header = this.Template.Header;
      this.headerdata.Header.item_id = "H" + this.HeaderCount;
      this.headerdata.Clause.Clause = this.Template.Clause;
      for (var index = 1; index <= this.ClauseCount; index++) {
        this.headerdata.Clause.item_id[index] = "H" + this.HeaderCount + "C" + index;
      }
      console.log("headerdata", this.headerdata);
      // axios.post('http://localhost:3000/headerdata/insert', this.headerdata);
    }
  },

  computed: {
    templateNo() {
      return this.templateID;
    }
  }
};
</script>

<style>
</style>
