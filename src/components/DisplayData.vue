<template>
  <v-container>
      <v-layout align-start justify-start>
          Hello world
      </v-layout>
    <v-layout align-end justify-end>
        <v-flex sm3 md4 text-xs-right>
      <v-card-text>
        <v-select
          v-model="header_num"
          :items="headers"
          required
          label="Choose Header"
          @input="clauseData"
          outline
        ></v-select>
        <v-select
          v-for="i in numClause"
          :key="i"
          v-model="clause_num[i]"
          @input="numClause++"
          :items="clauses"
          required
          label="Choose Clauses"
          outline
        ></v-select>
      </v-card-text>
      <v-btn color="primary" @click="pushItems">Push</v-btn>
      <!-- <v-textarea v-model="clauses"></v-textarea> -->
      <v-textarea v-model="clause_num"></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
import axios from "axios";
export default {
  name: "DisplayData",
  components: {
    draggable
  },
  data() {
    return {
      baseURL: "http://localhost:3000/",
      template: [{ header: "", clauses: [] }],
      headers: [],
      clauses: [],
      numClause: 1,
      header_num: "",
      pushClause: [{ clause: [] }],
      clause_num: [],
      //   headNum: "1",
      clauseNum: "1"
    };
  },
  methods: {
    headerData() {
      let self = this;
      axios.get(this.baseURL + "legalbase/headerdata").then(response => {
        response.data.forEach(function(element, index) {
          self.template[index].header = element.describ;
          self.headers.push(index + 1 + ". " + element.describ);
          self.template.push({ header: "", clauses: [] });
          console.log(self.template);
        });
      });
    },
    pushItems() {
      console.log("pushClauseinit", this.pushClause);
      console.log("clauseNumSize", this.clause_num.length);
      for (var index = 1; index < this.clause_num.length; index++) {
        console.log("pushClauseinit", this.clause_num[index]);
        this.pushClause[0].clause.push(this.clause_num[index]);
        console.log("reachedhere");
      }
      this.pushClause.push({ clause: [] });
      console.log("pushClause", this.pushClause);
      (this.header_num = ""), (this.clause_num = []), (this.numClause = 1);
    },
    clauseData() {
      this.clauses = [];
      this.numClause = 1;
      var array1 = this.header_num.split(".");
      var headNum = "H" + array1[0];
      let self = this;
      axios.get(this.baseURL + "legalbase/clausedata").then(response => {
        response.data.forEach(function(element) {
          var array = element.Item_id.split("-");
          if (array[0] === headNum) {
            self.clauses.push(element.describ);
            self.template;
          }
        });
      });
    }
  },
  computed: {},

  mounted() {
    this.headerData();
  }
};
</script>
