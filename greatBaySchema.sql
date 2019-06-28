DROP DATABASE IF EXISTS greatBaySchema;
CREATE DATABASE greatBaySchema;
USE greatBaySchema;

CREATE TABLE items (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(50) NULL,
    highestBid DECIMAL(10) NULL,
    lowestBid DECIMAL(10) NULL,
    PRIMARY KEY (id)
);

INSERT INTO items (name, description, highestBid, lowestBid)
VALUES ("Coca-Cola", 4.00, 0.50), ("Potato", 100.00, 0.75);

SELECT * FROM items;