import express from 'express'
import { getAllPosts } from './db.js';

const app = express()

app.get('/', async (req, res) => {
  res.send('HELLO FROM MY SERVER')
})

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    console.log(posts);
    res.json(posts);
});

const port = 5000

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})