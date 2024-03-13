import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function createPost({ title, content, video }) {
    await conn.query(
      'INSERT INTO blog_posts (title, content, video) VALUES (?, ?, ?)',
      [title, content, video]
    );
}

export async function getPostById(postId) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    return rows[0]; 
}

export async function updatePost(postId, updates) {
    // Construct the SQL query based on the fields provided in updates
    const fields = Object.keys(updates)
        .filter(key => updates[key] !== undefined) // Filter out undefined values
        .map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates).filter(value => value !== undefined);

    if (!fields) {
        throw new Error('No valid fields provided for update.');
    }

    const updateQuery = `UPDATE blog_posts SET ${fields} WHERE id = ?;`;
    const selectQuery = `SELECT * FROM blog_posts WHERE id = ?;`;

    // Execute the update query
    await conn.query(updateQuery, [...values, postId]);

    // Fetch the updated post to return it
    const [updatedRows] = await conn.query(selectQuery, [postId]);
    return updatedRows.length ? updatedRows[0] : null;
    
}

export async function deletePost(postId) {
    const deleteQuery = 'DELETE FROM blog_posts WHERE id = ?';

    try {
        const [result] = await conn.query(deleteQuery, [postId]);
        return result;
    } catch (error) {
        throw error;
    }
}