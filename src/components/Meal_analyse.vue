<template>
  <v-container>
    <v-layout row wrap align-center>
      <br>
      <br>
      <v-card-text>
        <v-form>
          <v-container grid-list-md>
            <v-layout row wrap>
              <!-- <v-card-title><span>Meal Analytics</span></v-card-title> -->
              <!-- <v-card-text> -->
              <v-flex sm6 md7 v-for="row in items.item_data.item_name" :key="row">
                <v-flex>
                  <span>Item : {{row.item_name}}</span>
                </v-flex>
                <v-flex sm12 md12>
                  <v-select
                    v-model="row.form_type"
                    :items="Forms"
                    required
                    label="Form Type"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md12>
                  Vessel ID:
                  <v-select
                    v-model="row.vessel_id"
                    :items="Vessels"
                    required
                    label="Vessel Type"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md12>
                  Weight
                  <v-text-field v-model="row.weight" type="number" suffix="kgs" outline></v-text-field>
                </v-flex>
              </v-flex>
              <!-- </v-card-text> -->
            </v-layout>
            <v-btn color="primary" @click="onSubmit">SUBMIT</v-btn>
          </v-container>
        </v-form>
      </v-card-text>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
// var moment = require("moment");
export default {
  name: "Meal",
  props: ["items"],

  data() {
    return {
      // formattedDate: '',
      // rows: '',
      newData: {
        item_name: "",
        vessel_id: "",
        weight: "",
        kitchen_name: "",
        property_name: "",
        form_type: "",
        meal_type: "",
        type_of_entry: "",
        date: ""
      },
      // items: {
      //   item_data: { item_name: {}, vessel_id: "", weight: "" },
      //   form_type: "",
      //   meal_type: "",
      //   property_name: "",
      //   kitchen_name: "",
      //   type_of_entry: "",
      //   date: ""
      // },
      ItemName: "",
      vesselID: "",
      weightID: "",
      successtext: "",
      Forms: ["Dispatch", "Received", "Wastage"],
      Vessels: []
    };
  },
  methods: {
    async onMount() {
      // this.rows = this.items.item_names.length;
      console.log("Hey", this.items);
      const vesselData = await axios.get(
        "http://localhost:3000/vessel_data/userdata1"
      );
      for (var index = 0; index < vesselData.data.length; index++) {
        this.Vessels.push(vesselData.data[index].vessel_id);
      }
    },
    async onSubmit() {
      console.log(this.items);
      console.log(this.items.item_data.item_name);
      for (
        var index = 0;
        index < this.items.item_data.item_name.length;
        index++
      ) {
        this.newData.date = this.items.date;
        this.newData.meal_type = this.items.meal_type;
        this.newData.type_of_entry = this.items.type_of_entry;
        this.newData.property_name = this.items.property_name;
        this.newData.kitchen_name = this.items.kitchen_name;
        this.newData.form_type = this.items.item_data.item_name[index].form_type;
        console.log("first", this.items.item_data.item_name[index].item_name);
        this.newData.item_name = this.items.item_data.item_name[
          index
        ].item_name;
        this.newData.vessel_id = this.items.item_data.item_name[
          index
        ].vessel_id;
        this.newData.weight = this.items.item_data.item_name[index].weight;
        console.log("second", this.items.item_data.item_name[index].item_name);
        console.log("Data to be sent", this.newData);

        await axios
          .post(`http://localhost:3000/meal_analysis/insert`, this.newData)
          .then(response => {
            console.log(response);
          });
        console.log("third", this.items.item_data.item_name[index].item_name);
      }
    }
  },
  computed: {},
  mounted() {
    // console.log("hello");

    this.onMount();
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
