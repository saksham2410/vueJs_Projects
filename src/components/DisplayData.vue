<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-card-text>
        <v-select
          v-model="header_num"
          :items="headers"
          required
          label="Choose Header"
          @input="clauseData"
          outline
        ></v-select>
        <v-select v-for="i in numClause" :key="i" v-model="clause_num[i]" @input="numClause++" :items="clauses" required label="Choose Clauses" outline></v-select>
        
      </v-card-text>
      <v-btn color="primary" @click="pushItems">Push</v-btn>
      <v-textarea v-model="clause_num"></v-textarea>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
import axios from "axios";
export default {
  name: "DisplayData",
  data() {
    return {
      baseURL: "http://localhost:3000/",
      template: [{ header: "", clauses: [] }],
      headers: [],
      clauses: [],
      numClause: 1,
      header_num: "",
      clause_num: [],
    //   headNum: "1",
      clauseNum: "1"
    };
  },
  methods: {
    headerData() {
      let self = this;
      axios.get(this.baseURL + "legalbase/headerdata").then(response => {
        // console.log("headers", response.data);
        // self.headNum = response.data.length;
        response.data.forEach(function(element, index) {
        //   console.log("index", index);
          self.template[index].header = element.describ;
          self.headers.push(index + 1 + ". " + element.describ);
        //   console.log(self.template[index].header);
          self.template.push({ header: "", clauses: [] });
          console.log(self.template);
        });
      });
    },
    pushItems() {
        

    },
    clauseData() {
      this.clauses = [];
      this.numClause = 1;
      var array1 = this.header_num.split(".");
      var headNum = "H" + array1[0];
    //   console.log("headNum", headNum);
      let self = this;
      axios.get(this.baseURL + "legalbase/clausedata").then(response => {
        // console.log("clauses", response.data);
        response.data.forEach(function(element) {
          var array = element.Item_id.split("-");
        //   console.log(array);
          if (array[0] === headNum) {
            self.clauses.push(element.describ);
          }
        });
      });
    }
  },
  computed: {},

  mounted() {
    // console.log("hello");
    this.headerData();
    // this.clauseData();
  }
};
</script>
