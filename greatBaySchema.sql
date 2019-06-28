DROP DATABASE IF EXISTS greatBaySchema;
CREATE DATABASE greatBaySchema;
USE greatBaySchema;

CREATE TABLE items (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    highestBid DECIMAL(10) NULL,
    lowestBid DECIMAL(10) NULL,
    PRIMARY KEY (id)
);

INSERT INTO items (name, highestBid, lowestBid)
VALUES ("Coca-Cola", 4.00, 0.50), ("Dr. Pepper", 10.00, 0.75);

SELECT * FROM items;