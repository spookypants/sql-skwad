var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "greatBaySchema"
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
//   connection.end();
// })

function initialPrompt() {
  inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["POST A BID", "POST AN ITEM", "EXIT"],
        name: "prompt"
      }
  ]).then(function(response){
    if (response.prompt === "POST AN ITEM") {
      postItem();
    } else if (response.prompt === "POST A BID") {
      postBid();
    }
  })
}
initialPrompt();

function postBid() {
  inquirer.prompt([
    {
      type: "number",
      message: "Which item id do you want to bid on?",
      name: "item"
    }, {
      type: "number",
      message: "How much would you like to bid?",
      name: "bid"
    }
  ]).then(function(response){
    //if bid is lower than the highest bid
    //console.log("Make a higher bid");
    //postBid();
    //else if bid is higher
    //replace higher bid in the database
    //console.log("You are the highest bidder");
    console.log(response);
  })
}

function postItem() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the item's name?",
      name: "name"
    }, {
      type: "input",
      message: "Write a brief description",
      name: "description"
    }, {
      type: "number",
      message: "What is the starting price?",
      name: "price"
    }
  ]).then(function(response) {
    //insert info into name, description, and lowest price
    //highest price is null
    console.log("Your item " + response.name + " has been added!");
  })
}