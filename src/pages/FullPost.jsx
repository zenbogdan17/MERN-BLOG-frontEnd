import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import axios from './../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';

export const FullPost = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.comments.items);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchComments(id));
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert('Error on fetch post!');
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  console.log(data);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `https://mern-blog.up.railway.app${data.imageUrl}`
            : null
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={items} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
