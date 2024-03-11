import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function createPost({ title, content, video }) {
    const result = await conn.query(
      'INSERT INTO blog_posts (title, content, video) VALUES (?, ?, ?)',
      [title, content, video]
    );
}