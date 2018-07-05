DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products_stock (
    id INT(10) AUTO_INCREMENT NOT NULL, 
    PRIMARY KEY (id),
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    product_price INT(10) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

INSERT INTO products_stock (product_name, department_name, product_price, stock_quantity)
VALUES ("computer", "technology", 1000, 10),
("phone", "technology", 700, 15),
("ring", "jewellery", 50, 20),
("necklace", "jewellery", 75, 15),
("bracelet", "jewellery", 50, 20),
("sandals", "shoes", 150, 10),
("watch", "accessories", 400, 4),
("hat", "accessories", 15, 40),
("shirt", "clothing", 30, 15),
("shorts", "clothing", 25, 15),
("leggings", "clothing", 70, 10);
