import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowContext } from '../contexts/WindowContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(0);
  const [nextPostExists, setNextPostExists] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const { isSmallerDevice } = useContext(WindowContext);
  const limit = isSmallerDevice ? 5 : 10;

  const fetchPost = async () => {
    setIsLoading(true);
    const { data: { posts: newPosts, nextPostExists } } = await axios.get('/api/v1/posts', {
      params: { start, limit },
    });
    setPosts([...posts, ...newPosts]);
    setNextPostExists(nextPostExists);
    setIsLoading(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/v1/users');
      const reducedUsers = data.reduce((acc, user) => {
        return { ...acc, [user.id]: user }
      }, {});
      setUsers(reducedUsers);
    }
    fetchPost();
    fetchUsers();
    setStart(start + limit)
  }, []);

  const handleClick = () => {
    setStart(start + limit)
    fetchPost()
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} user={users[post.userId]} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {nextPostExists && <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>}
      </div>
    </Container>
  );
}
