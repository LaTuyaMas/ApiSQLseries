CREATE DATABASE ionicseriesdb;
USE ionicseriesdb;

CREATE TABLE series(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    episodes INT,
    year_issue DATE,
    synopsis VARCHAR(255)
);

CREATE TABLE categories(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE series_categories(
    id_series INT,
    id_cat INT,
    FOREIGN KEY (id_series) REFERENCES series(id),
    FOREIGN KEY (id_cat) REFERENCES categories(id)
);

-- Preguntar por puntuacion media de la serie
-- Preguntar sobre imágenes

-- select series.title from series, categories,
-- series_categories where series.id = series_categories.id_serie
-- and categories.id = series_categories.id_cat