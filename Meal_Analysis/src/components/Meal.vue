<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-img :src="require('../assets/zolo-logo.png')" class="my-3" contain height="50"></v-img>
      </v-flex>
      <br>
      <br>
      <v-card-text>
        <v-form>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex sm12 md4>
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
              <v-flex sm12 md4>
                <v-select v-model="meal_type" :items="Meals" required label="Meal Type" outline></v-select>
              </v-flex>
              <v-flex sm12 md4>
                <v-select v-model="property" :items="kitchens" reuired label="Property" outline></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-btn color="primary" @click="onSubmit">SUBMIT</v-btn>
      {{successtext}}
      <!-- <v-btn color="info" :to="'/meal_analyse/' + property">View Analytics</v-btn> -->
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
// var moment = require("moment");
export default {
  name: "Meal",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateComp: "",
      items: {
        item_data: { item_name: {}, vessel_id: "", weight: "",form_type: "" },
        meal_type: "",
        property_name: "",
        kitchen_name: "",
        type_of_entry: "",
        date: ""
      },
      menu1: false,
      kitchens: [],
      meal_type: "",
      property: "",
      successtext: "",
      Meals: ["Breakfast", "Lunch", "Dinner"]
    };
  },
  methods: {
    updateState() {
      this.successtext = "";
    },
    async getKitchenData() {
      const kitchenData = await axios.get(
        "http://localhost:3000/Zolo_city/userdata"
      );
      for (var iter9 = 0; iter9 < kitchenData.data.length; iter9++) {
        this.kitchens.push(kitchenData.data[iter9].LOCALNAME);
      }
      // console.log(this.kitchens);
    },
    onSubmit() {
      const self = this;
      this.dateComp = this.date;
      this.dateComp = moment(this.dateComp, "YYYY-MM-DD").format(
        "dddd" + " " + "DD/MM/YYYY"
      );
      axios
        .post("http://localhost:3000/date", {
          todo: this.dateComp,
          todo1: this.property,
          todo2: this.meal_type
        })
        .then(response => {
          console.log("I got out", response);
          axios
            .get("http://localhost:3000/Kitchen_menu/userdatacity")
            .then(res0 => {
              self.items.item_data.item_name = res0.data;
              self.items.meal_type = self.meal_type;
              self.items.kitchen_name = self.property;
              self.items.date = self.dateComp;
              console.log(self.items);
              this.$router.push({
                name: "Meal_analyse",
                params: {
                  items: self.items
                }
              });
              // c
            });
          console.log(res0);
        });
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
    // console.log("hello");

    this.getKitchenData();
  }
};
</script>

<style scoped>
</style>
