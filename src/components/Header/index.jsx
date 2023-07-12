import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LoginIcon from '@mui/icons-material/Login';

export const Header = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log')) {
      dispatch(logout());
    }
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>POSTS BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button
                    variant="contained"
                    startIcon={<DriveFileRenameOutlineIcon />}
                  >
                    Write post
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="contained" startIcon={<AccountBoxIcon />}>
                    Profile
                  </Button>
                </Link>

                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                  startIcon={<CloseIcon />}
                >
                  Exit
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" startIcon={<LoginIcon />}>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
