<template>
  <div class="row page-container m-0 p-2">
    <div class="container-fluid p-2 m-0">
      <h3 class="page-header">Ramadhan Dishes</h3>
      <div class="row m-0">
        <div class="search-bar-container col-md-8 col-sm-12">
          <div class="container-fluid d-flex">
            <div class="col m-1 p-1 search-form">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search search-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
              <input
                type="text"
                class="form-control form-input search-bar mx-2"
                placeholder="Search by ingredient"
                v-model="searchQuery"
              />
            </div>
            <div class="col m-1 p-1 search-form">
              <input
                type="date"
                class="form-control form-input search-bar mx-2"
                id="search-bar-date"
                v-model="dateQuery"
              />
            </div>
            <div class="col m-1">
              <router-link
                v-bind:to="
                  'http://localhost:3080/getMealsByIngredient/' +
                  searchQuery +
                  '/' +
                  dateQuery
                "
              ></router-link>
              <input
                type="button"
                value="search"
                class="btn searchButton"
                v-on:click="performSearchQuery()"
              />
            </div>
          </div>
          <div
            class="container-fluid mt-2 receipesSuggestions todaySuggestions"
            id="receipes-suggestions"
          >
            <p class="recipesSuggestionTitle">Ingredients Suggestions</p>
            <div class="row flex-row flex-nowrap mealsList">
              <div
                class="col-3 m-2 p-0 d-flex flex-column"
                v-for="(ingredient, index) in ingredients"
                v-bind:key="index"
              >
                <div class="col ingredientPicture"></div>
                <div class="col d-flex flex-column p-2">
                  <p class="receipeName p-2">{{ ingredient }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="container-fluid mt-2 receipesSuggestions todaySuggestions"
            id="receipes-suggestions"
          >
            <p class="recipesSuggestionTitle">
              {{ searchQuery }} Receipes Suggestions for the day of
              {{ dateQuery }}
            </p>
            <div class="row flex-row flex-nowrap mealsList">
              <div
                class="col-3 meal m-2 p-0 d-flex flex-column"
                v-for="meal in meals"
                v-bind:key="meal.FIELD1"
              >
                <div class="col picture"></div>
                <div class="col d-flex flex-column receipeDescription p-2">
                  <p class="receipeName">{{ meal.Title.substr(0, 20) }}</p>
                  <p class="receipeIngredients">
                    {{ meal.listOfIngredients.join(" , ").substr(0, 40) }}
                  </p>
                  <p class="receipeTime p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-clock"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                      />
                      <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                      />
                    </svg>
                    <span class="font-weight-bold m-1">{{
                      meal.coockingTime + " min"
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <salatTime />
      </div>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "roboto";
  src: url("../../src/assets/fonts/roboto/Roboto-Black.woff") format("woff");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  font-family: "roboto";
}
.page-header {
  color: #574746;
  font-weight: 300;
}
.search-form {
  position: relative;
  background-color: #f8f7ec;
  border-radius: 25px;
  height: fit-content;
}
.search-form .search-icon {
  position: absolute;
  top: 30%;
  color: #574746 !important;
}
.ingredientPicture {
  width: 100px;
  min-height: 100px;
  border-radius: 50%;
  background-image: url("https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-size: contain;
}
.search-bar {
  border: 0px !important;
  background-color: #f8f7ec !important;
  border-radius: 25px !important;
}
.search-bar:focus {
  box-shadow: none !important;
}
</style>
<style lang="scss" scoped>
::placeholder {
  color: #574746 !important;
}
.mealsList {
  overflow: scroll;
}
.mealsList::-webkit-scrollbar {
  opacity: 0.1;
}
.searchButton {
  background-color: #987744;
  color: white;
  width: 150px;
  border-radius: 15px;
}
.searchButton:hover,
.searchButton:active {
  background-color: #987744;
  color: white;
  width: 150px;
  border-radius: 15px;
}
.salat-time {
  height: fit-content;
  box-shadow: 5px 5px 22px -5px #000000;
  height: fit-content;
  border-radius: 10px;
}
.timeNow {
  color: #987744;
  font-weight: bold;
}
.picture {
  background-image: url("https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100px;
}
.recipesSuggestionTitle {
  font-weight: bold;
  color: #574746;
  font-size: 1.1em;
}
.receipeName {
  font-size: large;
  font-weight: bold;
  color: #574746;
}
.meal {
  background-color: white;
  box-shadow: 5px 5px 22px -5px #000000;
  border-radius: 15px;
  min-height: fit-content;
  background: linear-gradient(#bc9c9a, #fff);
}
.receipeTime {
  background-color: rgb(226, 225, 225);
  border-radius: 15px;
  width: fit-content;
  color: #574746;
}
</style>
<script>
import axios from "axios";
import salatTime from "../components/salat-time.vue";
export default {
  name: "searchView",
  components: { salatTime },
  data() {
    return {
      fullDate: this.getFullDate(),
      meals: [],
      searchQuery: this.$route.params.ingredient,
      dateQuery: this.$route.params.day,
      ingredients: [],
    };
  },
  methods: {
    getFullDate() {
      let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let day = days[new Date().getDay()];
      let month = months[new Date().getMonth()];
      let year = new Date().getFullYear();
      return (
        day + " ,the " + new Date().getDate() + "th of " + month + " " + year
      );
    },
    getAllMeals() {
      axios
        .get(
          "http://localhost:3080/getMealsByIngredient/" +
            this.searchQuery +
            "/" +
            this.dateQuery
        )
        .then((response) => {
          this.meals = response.data.relevantMeals;
        });
    },
    getAllIngredients() {
      axios.get("http://localhost:3080/getAllIngredients").then((response) => {
        this.ingredients = response.data;
      });
    },
  },
  mounted() {
    this.getAllMeals();
    this.getAllIngredients();
    this.dateQuery = this.$route.params.day;
  },
};
</script>
