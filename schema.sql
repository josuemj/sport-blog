CREATE USER IF NOT EXISTS 'blog_josue'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON blog_sport_db.* TO 'blog_josue'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS blog_sport_db;

    CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        video VARCHAR(900),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sport_users (
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
