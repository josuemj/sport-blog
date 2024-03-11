import express from 'express'
import { getAllPosts, createPost, getPostById} from './db.js';

const app = express()
app.use(express.json());


app.get('/', async (req, res) => {
  res.send('HELLO FROM MY SERVER')
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        console.log(posts);
        if(posts.length > 0){
            res.status(200).json(posts);
        } else {
            res.status(404).json({message: "No posts found"});
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content, video } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        const post = await createPost({ title, content, video });
        res.status(200).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    
    try {
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

const port = 5000

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})