const meals = require("../../assets/database/meals");
const axios = require("axios");
const ingredients = require("../../assets/database/ingredients");
exports.getAllMeals = (req, res) => {    
  let ingredients = require("../../assets/database/ingredients");

  res.send(meals);
};
exports.getMealByngredient = (req, res) => {
  let ingredient = req.params.ingredient.substr(1);
  let day = req.params.day.substr(1);
  let relevantMeals = JSON.parse(JSON.stringify(meals));
  relevantMeals = relevantMeals.filter(
    (element) => element.Ingredients.indexOf(ingredient) != -1
  );
  res.send({ today: "Suggested meals for the day of " + day, relevantMeals });
};
exports.getAllIngredients = (req, res) => {
  let ingredients = require("../../assets/database/ingredients");
  res.send(ingredients);
};
exports.getIngredientsQuery = (req, res) => {
  let ingredients = require("../../assets/database/ingredients");
  let query = req.params.query.substr(1);
  let relevantIngredients = ingredients.filter(
    (ingredient) => ingredient.indexOf(query) > -1
  );
  res.send(relevantIngredients);
};
exports.getPrayerTimes = (req, res) => {
  let hours = new Date().getHours();
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let minutes = new Date().getMinutes();
  let day = new Date().getDate();
  let timePart = hours < 12 ? "AM" : "PM";
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  axios
    .get("http://api.aladhan.com/v1/calendar?latitude=36.806389&longitude=10.181667&method=1&month="+month+"&year="+year)
    .then(function(data){
      res.send({prayerTimes:data.data,time:hours+":"+minutes+" "+timePart,date:day});
    });
};
exports.getSuggestedMeals=(req,res)=>{
  let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  let months=[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  let day=days[new Date().getDay()];
  let month=months[new Date().getMonth()];
  let year=new Date().getFullYear();
  res.send(day+" ,the "+new Date().getDate()+"th of "+month+" "+year);
};
exports.SuggestedMeals=(req,res)=>
{
let winter=["Chestnuts","Grapefruit","Lemons","Oranges","Tangerines","Kale","Leeks","Radicchio","Radishes","Rutabaga","Turnips"];
let summer=["Blackberries","Blueberries","Nectarines","Peaches","Plums","Raspberries","Tomatoes","Watermelon","Broccoli","Cucumber","Green Beans","Zucchini"];
let spring=["Apricots","Avocado","Mango","Pineapple","Rhubarb","Strawberries","Artichoke","Asparagus","Carrots","Celeriac","Chives","Collards","Fava","Beans","Fennel","Fiddlehead","Ferns","Morels","Mustard","Greens"];
let autumn=["Apples","Cranberries","Figs","Grapes","Pears","Pomegranate","Quince","Butternut Squash","Cauliflower","Garlic","Ginger","Mushrooms","Potatoes","Pumpkin","Sweet Potatoes","Swiss Chard"];
let month=new Date().getMonth();
if(month<=2)
{
  let season=winter;
}
else if(month<=5)
{
  let season=spring;
}
else if(month<=9)
{
  let season=summer;
}
else
{
  let season=autumn;
}
let Suggested=[];
meals.forEach(meal=>{
  ingredients.forEach(ingredient=>{
    if(meal.listOfIngredients.indexOf(ingredient)!=-1)
    {
      Suggested.push(meal);
    }
  })
});
res.send(Suggested);
}