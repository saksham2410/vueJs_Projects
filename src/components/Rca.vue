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
              <v-flex sm12 md4>
                <v-text-field v-model="sendData.username" label="Filled By: " outline></v-text-field>
              </v-flex>
              <v-flex sm12 md4>
                <v-select
                  v-model="sendData.usercity"
                  :items="cities"
                  reuired
                  label="User City"
                  outline
                ></v-select>
              </v-flex>
              <v-flex sm12 md4>
                <v-select
                  v-model="sendData.userprop"
                  :items="kitchens"
                  required
                  label="User Property"
                  outline
                ></v-select>
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
              <v-select v-model="props.item.critical" :items="criticals" reuired label="Select"></v-select>
            </td>
            <td>
              <v-text-field v-model="props.item.comment" label="Comment ... "></v-text-field>
            </td>

            <!-- <td class="text-xs-right">{{ props.item.critical }}</td> -->
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
// import moment from "moment";
var moment = require("moment");
export default {
  data() {
    return {
      baseURl: process.env.VUE_APP_BASE_URL,
      successtext: '',
      sendData: {
        username: "",
        usercity: "",
        userprop: "",
        time: "",
        type: "",
        critical: "",
        comment: ""
      },
      rows: [
        {
          id: "1",
          type: "Structural Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: "2",
          type: "Budget Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: "3",
          type: "Location Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: "4",
          type: "Property Setup Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: "5",
          type: "Existing PG Takeover Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: "6",
          type: "Other Issues",
          critical: "",
          comment: "",
          checkbox: false
        }
      ],
      cities: [],
      criticals: ["Low", "Moderate", "High", "Very High"],
      kitchens: [],
      username: "",
      headers: [
        { text: "ID", value: "S/N" },
        { text: "Issue Type", value: "Issue Type" },
        { text: "Applicability", value: "Applicability" },
        { text: "Criticality", value: "Criticality" },
        { text: "Comment", value: "Comment" }
      ]
    };
  },
  methods: {
    updateState() {
      this.successtext = "";
    },
    async getData() {
      const meow = moment().format(
        "dddd" + " " + "DD/MM/YYYY" + " " + "HH:mm:ss"
      );
      this.sendData.time = meow;
      
      console.log(this.rows);
      for (var index = 0; index < this.rows.length; index++) {
        if (this.rows[index].checkbox === true) {
          this.sendData.type = this.rows[index].type;
          this.sendData.critical = this.rows[index].critical;
          this.sendData.comment = this.rows[index].comment;
        
        await axios.post(
          this.baseURl + 'rca/insert',
          this.sendData
        );}
      }
      console.log(this.sendData);
      this.successtext = "Added";
    },
    async getKitchenData() {
      const kitchenData = await axios.get(
        this.baseURl + 'Zolo_city/userdata'
      );
      for (var iter9 = 0; iter9 < kitchenData.data.length; iter9++) {
        this.kitchens.push(kitchenData.data[iter9].LOCALNAME);
      }
      const CityData = await axios.get(
        this.baseURl + 'Zolo_city/userdatacity'
      );
      for (var iter9 = 0; iter9 < CityData.data.length; iter9++) {
        this.cities.push(CityData.data[iter9].CITY);
      }
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
