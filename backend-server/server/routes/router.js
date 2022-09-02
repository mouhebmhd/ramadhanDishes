const express = require('express');
const route = express.Router();
const controller=require('../controller/controller');
route.get("/getAllMeals",controller.getAllMeals);
route.get("/getMealsByIngredient/:ingredient/:day",controller.getMealByngredient);
route.get("/getAllIngredients/",controller.getAllIngredients);
route.get("/getIngredientsQuery/:query",controller.getIngredientsQuery);
route.get("/getPrayerTimes",controller.getPrayerTimes);
route.get("/getSuggestedMeals/",controller.getSuggestedMeals);
route.get("/SuggestedMeals/",controller.SuggestedMeals);
module.exports=route;