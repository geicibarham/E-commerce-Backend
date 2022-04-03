#E-commerce-Backend

## Licensing

[![license](https://img.shields.io/badge/license-MIT-success)](https://opensource.org/licenses/MIT)

## E-Commerce Back End
This application is the back end of a hypothetical e-commerce website. It contains models and routes for a variety of products, product categories, and product tags, and connects to a MySQL database. Using Insomnia, various routes (GET, GET by id, POST, PUT, and DELETE) for these three items can be visualized, as the application currently has no front end.


Installation
Clone the repository to your local machine. You should also have Git Bash, Node.js, and MySQL/MySQL Workbench installed. You'll need to run npm install from the terminal at the root directory of the local repository to install the application's dependencies (express, sequelize, mysql, and dotenv). You will also need to create a .env file (containing DB_USER=root, DB_PW=YourPassword, DB_NAME='ecommerce_db') at this location. Before running the application, create its database in MySQL Workbench. You can copy/paste the contents of db/schema.sql into a MySQL query to do so.

Usage
No front end

This video details how to use the E-Commerce Back End application.

Credits
This application relies on express, sequelize, and mysql. It also uses dotenv.

