// Dependencies
// =============================================================
// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require('request');

 
//Models
//=============================================================
 var db = require("./models");

// Database Connection:
//=============================================================
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//Mongo Promises
//=============================================================
mongoose.Promise = Promise;



// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3001;


// Middleware morgan + body parser + express static 
// =============================================================
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars set up
// =============================================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Handlebars
// =============================================================
app.engine("handlebars",exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// =============================================================
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);


 app.get("/", function(req, res) {
  
      res.render("index", {
        title: "News Scraper", 
        dev: "Angela Andrews"
        
      });
    });
  
app.get("/scrape",function(req, res){
  new Promise (resolve => {
  request("https://old.reddit.com/r/webdev/", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  var results = [];

  $("p.title").each(function(i, element) {

    var title = $(element).text();
    var link = $(element).children().attr("href");
    var commentCount = $(element).nextAll(".comment").text();

  
    results.push({
      title: title,
      link: link,
      
      
    });
  });
  resolve(results);
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
})
})
.then(function (data) {
    console.log(data);
  
  data.forEach(article => {
    db.Article.create(article)
  })
  res.send(data);
  
})



  
})

// Notify the server is listening for client requests.
// =============================================================
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});