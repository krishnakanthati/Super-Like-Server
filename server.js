const express = require('express');
const cors = require('cors')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '000',
      database : 'superlike'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/like', (req, res) => {
  const { likes } = req.body;
  db('likescount')
  // .insert({likes: likes})
  .increment('likes', 0)
  .returning('likes')
  .then(likes => {
    res.json(likes[0])
  })
  .catch(err => {
      res.status(400).json('No likes')
  })
})

app.put('/liked', (req, res) => {
    const { likes } = req.body;
    db('likescount')
    .increment('likes', 1)
    .returning('likes')
    .then(likes => {
      res.json(likes[0])
    })
    .catch(err => {
        res.status(400).json('No likes')
    })
})

app.listen(3001, () => {
    console.log('server is running on port 3001');
})