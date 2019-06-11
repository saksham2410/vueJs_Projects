<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-card-text>Hello World</v-card-text>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "DisplayData",
  data() {
    return {
      baseURL: "http://localhost:3000/"
    };
  },
  methods: {
    headerData() {
      axios.get(this.baseURL + "headerdata/headerdata").then(response => {
        console.log("headers", response.data);
      });
    },
    clauseData() {
      axios.get(this.baseURL + "headerdata/clausedata").then(response => {
        console.log("clauses", response.data);
        response.data.forEach(function(element) {
          var array = element.ItemId.split('-');
          console.log(array)
        });
        // var array = response.data.ItemId.toString().split("-");
        // console.log(array);
      });
    }
  },

  mounted() {
    // console.log("hello");
    this.headerData();
    this.clauseData();
  }
};
</script>
