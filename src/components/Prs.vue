<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-img :src="require('../assets/zolo-logo.png')" class="my-3" contain height="50"></v-img>
      </v-flex>
      <v-card-title>
        <!-- <v-icon large left>mdi-calendar</v-icon>
        <span class="title font-weight-light">{{
            Date.now() | moment("dddd, MMMM Do YYYY")
        }}</span>-->
      </v-card-title>
      <br>
      <br>
      <v-card-text>
        <v-form>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex sm6 md2>
                <v-text-field v-model="sendData.userenter" label="Entered By: " outline></v-text-field>
              </v-flex>
              <v-flex sm6 md2>
                <v-text-field v-model="sendData.username" label="PRS Prepared By: " outline></v-text-field>
              </v-flex>
              <v-flex sm6 md2>
                <v-select
                  v-model="sendData.usercity"
                  :items="cities"
                  reuired
                  label="User City"
                  outline
                ></v-select>
              </v-flex>
              <v-flex sm6 md2>
                <v-text-field v-model="sendData.prsid" label="PRS Line Unique ID: " outline></v-text-field>
              </v-flex>
              <v-flex sm6 md4>
                <v-menu v-model="menu1" :close-on-content-click="false" full-width max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Select a date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-data-table :headers="headers" :items="rows" class="elevation-1" hide-actions>
          <template v-slot:items="props">
            <td>{{props.item.id}}</td>
            <td>{{ props.item.type }}</td>
            <td>
              <v-checkbox v-model="props.item.checkbox"></v-checkbox>
            </td>
            <td>
              <v-text-field v-model="props.item.risktype" label="Type ... "></v-text-field>
            </td>
            <td>
              <v-text-field v-model="props.item.comment" label="Comment ... "></v-text-field>
            </td>

            <!-- <td class="text-xs-right">{{ props.item.risktype }}</td> -->
            <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
            <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
          </template>
        </v-data-table>
      </v-card-text>
      <v-btn color="primary" @click="getData">SUBMIT</v-btn>
      {{successtext}}
      <v-btn @click="updateState" v-if="this.successtext==='Added'">OK</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { constants } from "crypto";
// import moment from "moment";
var moment = require("moment");
export default {
  data() {
    return {
      baseURl: process.env.VUE_APP_BASE_URL,
      date: new Date().toISOString().substr(0, 10),
      dateComp: "",
      menu1: false,
      successtext: "",
      sendData: {
        userenter: "",
        username: "",
        usercity: "",
        prsid: "",
        type: "",
        risktype: "",
        comment: "",
        sendDate: ""
      },
      rows1: [
        {
          id: "0",
          type: [""],
          risktype: "",
          comment: "",
          checkbox: false
        }
      ],
      rows: [
        {
          id: "1",
          type: "Provision Not Provided",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "2",
          type: "Wrong A/C Details",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "3",
          type: "Incorrect Cost Center",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "4",
          type: "Calculation Mistake",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "5",
          type: "Incorrect Information",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "6",
          type: "Statuatory Related Mistake",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "7",
          type: "Advance Payment not adjusted Correctly",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "8",
          type: "Complete Information Not Provided",
          risktype: "",
          comment: "",
          checkbox: false
        },
        {
          id: "9",
          type: "Duplicate Payment Request",
          risktype: "",
          comment: "",
          checkbox: false
        }
      ],
      cities: [],
      fields: [],
      username: "",
      headers: [
        { text: "S/N", value: "S/N" },
        { text: "Error Type", value: "Error_Type" },
        { text: "Applicability", value: "Applicability" },
        { text: "Notional Value at Risk", value: "Notional_Value" },
        { text: "Comment", value: "Comment" }
      ]
    };
  },
  methods: {
    updateState() {
      this.successtext = "";
    },
    async getData() {
      this.dateComp = this.date;
      this.dateComp = moment(this.dateComp, "YYYY-MM-DD").format(
        "dddd" + " " + "DD/MM/YYYY"
      );
      // const meow = moment().format(
      //   "dddd" + " " + "DD/MM/YYYY" + " " + "HH:mm:ss"
      // );
      // this.sendData.time = meow;
      console.log(this.dateComp);
      this.sendData.sendDate = this.dateComp;

      console.log(this.rows);
      for (var index = 0; index < this.rows.length; index++) {
        if (this.rows[index].checkbox === true) {
          this.sendData.type = this.rows[index].type;
          this.sendData.risktype = this.rows[index].risktype;
          this.sendData.comment = this.rows[index].comment;

          await axios.post(this.baseURl + 'prs/insert', this.sendData);
        }
      }
      console.log(this.sendData);
      this.successtext = "Added";
    },
    getKitchenData() {
      let self = this;
      axios
        .get(this.baseURl + 'Zolo_city/userdatacity')
        .then(response => {
          for (var iter9 = 0; iter9 < response.data.length; iter9++) {
            self.cities.push(response.data[iter9].CITY);
          }
        });

      // axios.get("http://localhost:3000/proj_type/projdata").then(res0 => {
      //   for (var index = 0; index < res0.data.length; index++) {
      //     self.fields.push(res0.data[index].field_name);
      //     // console.log(typeof(self.fields[index]));
      //     self.rows1.type.push(self.fields[index]);
      //     self.rows1.id++;
      //   }
      // });

      // console.log('rows',self.rows1);
      // console.log(self.fields);
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date
        ? moment(this.date).format("dddd" + " " + "DD/MM/YYYY")
        : "";
    }
  },
  mounted() {
    this.getKitchenData();
  }
};
</script>

<style scoped>
table {
  align-self: align-center;
  align-items: align-center;
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 10px 10px;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: rgb(82, 101, 241);
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}

table tr:nth-child(1) {
  color: #fff;
}
</style>
