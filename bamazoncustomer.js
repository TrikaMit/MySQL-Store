var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mniTM111",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) {
        connection.end();
        throw err;
    }
    console.log('connected as id ' + connection.threadId);
    displayItems()
});

var productId;
var productNumber;
var productName = '';
var productPrice;
var stockQuantity;

function displayItems() {
    connection.query("SELECT id, product_name, department_name, product_price, stock_quantity FROM products_stock", function (err, res) {
        if (err) throw err;
        console.log(res);
        whatProduct();
    })
}

function whatProduct() {
    inquirer.prompt([{
        type: "input",
        name: "productId",
        message: "What is the id of the product you would like to buy?"
    }]).then(function (user) {
        console.log(user.productId);
        productId = parseInt(user.productId);
        numberProduct();
    })
}

function numberProduct() {
    inquirer.prompt([{
        type: "input",
        name: "productNumber",
        message: "How many would you like to buy?"
    }]).then(function (user) {
        console.log(user.productNumber);
        productNumber = parseInt(user.productNumber);
        connection.query("SELECT product_name, department_name, product_price, stock_quantity FROM products_stock WHERE id = " + productId, function (err, res) {
            if (err) throw err;
            productName = res[0].product_name;
            productPrice = res[0].product_price;
            stockQuantity = res[0].stock_quantity;
            checkStock();
            console.log(stockQuantity + " units of " + productName + " remaining.");
            buyAgain();
        })
    })
}

function checkStock() {
    console.log("You are trying to buy " + productNumber + " units of " + productName + " at a price of $" + productPrice + " and we currently have " + stockQuantity + " in stock.");
    if (stockQuantity >= productNumber) {
        console.log("Congratulations! We have fulfilled your order. Your total is: $" + productPrice * productNumber + ". Enjoy your new items.");
        stockQuantity -= productNumber;
        connection.query("UPDATE products_stock SET stock_quantity = " + stockQuantity + " where id = " + productId, function (err, res) {
            if (err) throw err;
        });
    } else {
        console.log("Sorry, we don't have enough of that product in stock.")
    }
}

function buyAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "buyAgain",
        message: "Would you like to buy more products?",
        default: "boolean"
    }]).then(function (user) {
        if (user.buyAgain) {
            displayItems();
        } else {
            console.log("Ok, thanks for shopping!")
            connection.end();
        }
    })
}