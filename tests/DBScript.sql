-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-10-23 16:55:25.675

-- tables
-- Table: post
CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT NULL,
    image VARCHAR(255) NULL,
    url VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id int NOT NULL,
    CONSTRAINT post_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: post_users (table: post)
ALTER TABLE post ADD CONSTRAINT post_user FOREIGN KEY post_user (user_id)
    REFERENCES user (id);

-- End of file.

