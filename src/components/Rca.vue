<template>
  <v-container>
    <v-layout row wrap align-center>
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
      <v-card-text>
        <v-data-table :headers="headers" :items="rows" class="elevation-1" hide-actions>
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
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
      <v-btn color="primary" @click="getData">GET</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      checkbox: ["true", "true", "true", "true", "true", "true"],
      row: [
        {
          id: 1,
          name: "Structural Issue",
          critical: "",
          comment: "",
          checkbox: false
        }
      ],
      rows: [
        {
          id: 1,
          name: "Structural Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: 2,
          name: "Budget Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: 3,
          name: "Location Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: 4,
          name: "Property Setup Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: 5,
          name: "Existing PG Takeover Issue",
          critical: "",
          comment: "",
          checkbox: false
        },
        {
          id: 6,
          name: "Other Issues",
          critical: "",
          comment: "",
          checkbox: false
        }
      ],
      cities: ["Bangalore", "Delhi", "Kolkata"],
      criticals: ["Low", "Moderate", "High", "Very High"],
      kitchens: ["Swiggy", "Zomato"],
      username: "",
      headers: [
        {
          text: "ID",
          value: "ID"
        },
        { text: "Issue Type", value: "Issue Type" },
        { text: "Applicability", value: "Applicability" },
        { text: "Criticality", value: "Criticality" },
        { text: "Comment", value: "Comment" }
      ]
    };
  },
  methods: {
    getData() {
      console.log(this.rows);
    },
    async getKitchenData() {
       this.todaydate = moment().format("YYYY-MM-DD");
       console.log(this.todaydate);
        const kitchenData = await axios.get(
        "http://localhost:3000/Zolo_city/userdata"
      );
      // var kitchencity = [];
      this.kitchenNew = kitchenData;
      // this.kitchenNewlength = this.kitchenNew.data.length;
      for( var iter9=0;iter9<this.kitchenNew.data.length;iter9++)
      {
        this.kitchenName.push(this.kitchenNew.data[iter9].LOCALNAME);
      }
      const CityData = await axios.get(
        "http://localhost:3000/Zolo_city/userdatacity"
      );
      // this.cityNew = CityData.data;
      for( var iter9=0;iter9<CityData.data.length;iter9++)
      {
        this.cityNew.push(CityData.data[iter9].CITY);
      }
      console.log('test',this.cityNew);
      console.log(this.cityNew.length);
      console.log(this.kitchenName);
    },
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
