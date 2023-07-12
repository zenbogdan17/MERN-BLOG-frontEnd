import { Avatar, Button, Grid, Typography } from '@mui/material';
import styles from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchAuthMe } from '../../redux/slices/auth';
import axios from '../../axios';
import { Post } from '../../components/Post';

export const Profile = ({ user }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.data);
  const inputFileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthMe());
    const { avatarUrl } = user;
    setImageUrl(avatarUrl);
  }, [dispatch, user]);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('avatar', file);
      const { data } = await axios.post('/uploadAvatar', formData);
      setImageUrl(data.url);
    } catch (e) {
      console.warn(e);
      alert('Error uploading file!');
    }
  };

  return (
    <div className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Typography className={styles.title} variant="h5">
            Your Avatar
          </Typography>

          <Avatar
            className={styles.avatar}
            src={
              user?.avatarUrl
                ? 'https://mern-blog.up.railway.app/' + imageUrl
                : ''
            }
          />
          <Typography className={styles.subtitle} variant="h5">
            Fullname
          </Typography>
          <Typography className={styles.name} variant="h4">
            {user?.fullName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            className={styles.button}
            onClick={() => inputFileRef.current.click()}
            variant="contained"
          >
            Upload avatar
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleChangeFile}
            hidden
          />
        </Grid>
      </Grid>
      <Typography className={styles.title__post} variant="h4">
        Your Post
      </Typography>
      <span className={styles.title__underline}></span>
      {posts.items
        .filter((post) => post.user._id === user?._id)
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
          />
        ))}
    </div>
  );
};
