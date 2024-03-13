import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'blog_josue',
    password: '123',
    database: 'blog_sport_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool