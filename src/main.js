import express from 'express'
import { getAllPosts, createPost, getPostById, updatePost} from './db.js';

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

app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content, video } = req.body; // Assuming these are the fields you allow to update

    if (!title && !content && !video) {
        return res.status(400).send({ error: 'At least one field is required for an update.' });
    }

    try {
        // Assuming you have a function to update the post in your database handling module
        // This function should return the updated post
        const updatedPost = await updatePost(postId, { title, content, video });
        
        if (!updatedPost) {
            return res.status(404).send({ error: 'Post not found.' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send({ error: 'An error occurred while updating the post.' });
    }
});

const port = 5000

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})