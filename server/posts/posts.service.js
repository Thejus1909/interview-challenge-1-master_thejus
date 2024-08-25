const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );
  const { data: nextPost } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: Number(start) + Number(limit),
        _limit: 1,
      },
    },
  );
  const nextPostExists = nextPost.length ? true : false;    // Checking if there are any more posts to retrieve  
  let images = {}
  for (let i = start; i <= Number(start) + Number(limit); i++) {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${i}/photos`
    );
    images[i] = data;
  }
  return { posts, images, nextPostExists };
}

module.exports = { fetchPosts };
