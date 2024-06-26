import express from 'express'
import 
{ getAllPosts, createPost, getPostById, updatePost, deletePost, register,getAllUsers,login} 
    from './db.js';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json());


app.get('/hello', async (req, res) => {
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
    const { title, content, video } = req.body;

    if (!title && !content && !video) {
        return res.status(400).send({ error: 'At least one field is required for an update.' });
    }

    try {
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

app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const result = await deletePost(postId);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Post not found.' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ error: 'An error occurred while deleting the post.' });
    }
});


//Login and regist stuff

//register
app.post('/register', async (req, res) => {
    console.log("body", req.body);
    const { username, password } = req.body;
  
    try {
      await register(username, password);
      res.json({ "message": "user created" });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//checking users
app.get('/users', async (req, res) => {
try {
    const users = await getAllUsers();
    res.json(users);
} catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const isAuthenticated = await login(username, password);
      if (isAuthenticated) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = 22397

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
