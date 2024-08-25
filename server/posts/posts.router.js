const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { posts, images, nextPostExists } = await fetchPosts(req.query);
  const postsWithImages = posts.reduce((acc, post) => {
    return [
      ...acc,
      {
        ...post,
        images: images[post.id]
      },
    ];
  }, []);

  res.json({ posts: postsWithImages, nextPostExists });
});

module.exports = router;
