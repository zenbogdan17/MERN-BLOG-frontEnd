import React from 'react';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '123456@gmail.com',
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (data.payload) {
      localStorage.setItem('token', data.payload.token);
    } else {
      alert('Failed to login!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register('password', { required: 'Enter password' })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};
