import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewComment } from '../../redux/slices/comments';
import { useParams } from 'react-router-dom';

export const Index = () => {
  const [isCommenst, setIsComments] = useState('');
  const user = useSelector((state) => state.auth.data);
  const { id } = useParams();

  const dispatch = useDispatch();
  const submitCommentHandler = () => {
    dispatch(
      fetchNewComment({ userId: user._id, commentText: isCommenst, postId: id })
    );
    setIsComments('');
    window.location.reload();
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          // src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            onChange={(e) => setIsComments(e.target.value)}
            value={isCommenst}
            label="Write comments"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={submitCommentHandler} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
