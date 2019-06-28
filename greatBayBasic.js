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

// POST ITEM UPDATE
function postItem() {
    // console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO items SET ?",
      {
        name: // user input name (from inquirer),
        description: // user input desc (from inquirer),
        lowestBid: //user input starting bid (from inquirer)
      },
      function(err, res) {
        if (err) throw err;
        // console.log(res.affectedRows + " product inserted!\n");
      }
    );
    // logs the actual query being run
    // console.log(query.sql);
  }

// LOOK AT ITEMS - WHEN USER SELECTS BID ON ITEMS
  // SHOW LIST OF POSSIBLE BID ITEMS
function showItems() {
    var query = connection.query(
        "SELECT name FROM items", function(err, res) {
            if(err) throw err;
            console.log(res);
        }
    )
}

// BID UPDATE
function updateBid() {
    // console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE items SET ? WHERE ?",
      [
        {
          highestBid: //user bid
        },
        {
          name: //user selected item
        }
      ],
      function(err, res) {
        if (err) throw err;
        // console.log(res.affectedRows + " bid successful!\n");
      }
    );
  }