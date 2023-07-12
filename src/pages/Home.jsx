import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from '../redux/slices/posts';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const [isPostSort, setIsPostSort] = useState(0);
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    if (isPostSort === 0) {
      dispatch(fetchPosts());
    }
    if (isPostSort === 1) {
      dispatch(fetchPopularPosts());
    }

    dispatch(fetchTags());
  }, [dispatch, isPostSort]);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={isPostSort}
        aria-label="basic tabs example"
        onChange={() => setIsPostSort(isPostSort === 0 ? 1 : 0)}
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        {id ? (
          <Grid xs={8} item>
            {isPostsLoading
              ? [...Array(5)].map((_, index) => (
                  <Post key={index} isLoading={true} />
                ))
              : posts.items
                  .filter((item) => item.tags.includes(id))
                  .map((post) => (
                    <Post
                      key={post?._id}
                      id={post?._id}
                      title={post.title}
                      imageUrl={
                        post.imageUrl
                          ? `https://mern-blog.up.railway.app${post.imageUrl}`
                          : null
                      }
                      user={post.user}
                      createdAt={new Date(post.createdAt).toLocaleDateString()}
                      viewsCount={post.viewsCount}
                      commentsCount={post.comments.length}
                      tags={post.tags}
                      isEditable={userData?.data?._id === post.user?._id}
                      isLoading={isPostsLoading}
                    />
                  ))}
          </Grid>
        ) : (
          <Grid xs={8} item>
            {isPostsLoading
              ? [...Array(5)].map((_, index) => (
                  <Post key={index} isLoading={true} />
                ))
              : posts.items.map((post) => (
                  <Post
                    key={post?._id}
                    id={post?._id}
                    title={post.title}
                    imageUrl={
                      post.imageUrl
                        ? `https://mern-blog.up.railway.app${post.imageUrl}`
                        : null
                    }
                    user={post.user}
                    createdAt={new Date(post.createdAt).toLocaleDateString()}
                    viewsCount={post.viewsCount}
                    commentsCount={post.comments.length}
                    tags={post.tags}
                    isEditable={userData?.data?._id === post.user?._id}
                    isLoading={isPostsLoading}
                  />
                ))}
          </Grid>
        )}
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: ' QWERTY',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'ASDFG',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
