import Container from '@mui/material/Container';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, Profile } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:id" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
