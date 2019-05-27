<template>
  <v-container>
    <v-layout row wrap align-center>
      <!-- <v-card class="mx-auto" color="secondary" dark> -->
      <v-flex xs12>
        <v-img :src="require('../assets/zolo-logo.png')" class="my-3" contain height="50"></v-img>
      </v-flex>
      <v-card-title>
        <v-icon large left>mdi-calendar</v-icon>
        <!-- <span class="title font-weight-light">{{
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
                <v-text-field v-model="username" label="Filled By: " outline></v-text-field>
              </v-flex>
              <v-flex sm12 md4>
                <v-select :items="cities" reuired label="User City" outline></v-select>
              </v-flex>
              <v-flex sm12 md4>
                <v-select :items="kitchens" required label="User Property" outline></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <!-- </v-card> -->
      <v-card-text align-center>
        <table id="firstTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Issue Type</th>
      <th>Applicability</th>
      <th>Criticality</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows" :key="row">
      <td>{{row.id}}</td>
      <td>{{row.name}}</td>
      <td><v-checkbox v-model="row.checkbox"></v-checkbox></td>
      <td><v-select v-model ="row.critical" :items="criticals" reuired label="Select" ></v-select></td>
      <td><v-text-field v-model="row.comment" label="Comment ... " ></v-text-field></td>
    </tr>
  </tbody>
</table>
      </v-card-text>
      <v-btn color="primary" @click="getData">GET</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      checkbox: ['true','true','true','true','true','true'],
      rows: [
      { id: 1, name: "Structural Issue", critical: '', comment: '', checkbox: false },
      { id: 2, name: "Budget Issue", critical: '', comment: '',checkbox: false },
      { id: 3, name: "Location Issue", critical: '', comment: '',checkbox: false},
      { id: 4, name: "Property Setup Issue", critical: '', comment: '' ,checkbox: false},
      { id: 5, name: "Existing PG Takeover Issue", critical: '', comment: '',checkbox: false},
      { id: 6, name: "Other Issues", critical: '', comment: '',checkbox: false }
    ],
      cities: ["Bangalore", "Delhi", "Kolkata"],
      criticals: ["Low", "Moderate", "High", "Very High"],
      kitchens: ["Swiggy", "Zomato"],
      username: "",
    };
  },
  methods: {
    getData() {
      console.log(this.rows);
    }
  }
};
</script>

<style scoped>
table {
  align-self: align-center;
  align-items: align-center;
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 10px 10px;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: rgb(82, 101, 241);
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}

table tr:nth-child(1) {
  color: #FFF;
}
</style>
