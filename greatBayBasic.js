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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
})

// POST ITEM UPDATE
// function postItem() {
//     // console.log("Inserting a new product...\n");
//     var query = connection.query(
//       "INSERT INTO items SET ?",
//       {
//         name: // user input name (from inquirer),
//         description: // user input desc (from inquirer),
//         lowestBid: //user input starting bid (from inquirer)
//       },
//       function(err, res) {
//         if (err) throw err;
//         // console.log(res.affectedRows + " product inserted!\n");
//       }
//     );
//     // logs the actual query being run
//     // console.log(query.sql);
//   }

// LOOK AT ITEMS - WHEN USER SELECTS BID ON ITEMS
  // SHOW LIST OF POSSIBLE BID ITEMS
// function showItems() {
//     var query = connection.query(
//         "SELECT name FROM items", function(err, res) {
//             if(err) throw err;
//             console.log(res);
//         }
//     )
// }

// // BID UPDATE
// function updateBid() {
//     // console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//       "UPDATE items SET ? WHERE ?",
//       [
//         {
//           highestBid: //user bid
//         },
//         {
//           name: //user selected item
//         }
//       ],
//       function(err, res) {
//         if (err) throw err;
//         // console.log(res.affectedRows + " bid successful!\n");
//       }
//     );
//   }

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
      var highestBid = connection.query("SELECT highestBid FROM items WHERE name=" + response.item);
    //if bid is lower than the highest bid
    if (response.bid < highestBid){
        console.log("Make a higher bid");
    } else if (response.bid > highestBid) {
        connection.query("UPDATE items SET ? WHERE ?", [
            {highestBid: response.bid},
            {name: response.item}
        ], function(err, res) {
            if(err) throw err;
        });
    }
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
    var query = connection.query(
        "INSERT INTO items SET ?",
        {
          name: response.name,
          description: response.description,
          lowestBid: response.price
        },
        function(err, res) {
          if (err) throw err;});
    console.log("Your item " + response.name + " has been added!");
  })
}
