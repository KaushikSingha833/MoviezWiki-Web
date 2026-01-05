CREATE DATABASE imdb_project_db;

USE imdb_project_db;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

USE imdb_project_db;

CREATE TABLE wishlist (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_name VARCHAR(255) NOT NULL,
    movie_image VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);