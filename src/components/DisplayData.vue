<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-card-text>
        <v-select
          v-model="header_num"
          :items="template.headers"
          required
          label="Choose Header"
          outline
        ></v-select>
        <v-select
          v-model="clause_num"
          :items="template.clauses"
          required
          label="Choose Clauses"
          outline
        ></v-select>
      </v-card-text>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "DisplayData",
  data() {
    return {
      baseURL: "http://localhost:3000/",
      template: { header: '', clauses: [] },
      header_num: "",
      clause_num: ""
    };
  },
  methods: {
    headerData() {
      let self = this;
      axios.get(this.baseURL + "headerdata/headerdata").then(response => {
        console.log("headers", response.data);
        response.data.forEach(function(element) {
            console.log(self.template.length)
            self.template.push(response.data.length)
            console.log(self.template.length)
          self.template.header = element.Description;
        });
      });
    },
    clauseData() {
      axios.get(this.baseURL + "headerdata/clausedata").then(response => {
        console.log("clauses", response.data);
        response.data.forEach(function(element) {
          var array = element.ItemId.split("-");
          console.log(array);
        });
      });
    }
  },
  computed: {},

  mounted() {
    // console.log("hello");
    this.headerData();
    this.clauseData();
  }
};
</script>
