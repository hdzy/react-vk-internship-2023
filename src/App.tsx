import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Sidebar} from './components/Sidebar/Sidebar';
import {LoginPage} from './components/Login/LoginPage';
import {CreatePostPage} from './components/CreatePost/CreatePostPage';
// @ts-ignore
import styles from './App.module.css';
import {PostsPage} from "./components/Posts/PostsPage";
import {PostPage} from "./components/Post/PostPage";
import {RegisterPage} from "./components/Register/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuthenticated} from "./slices/auth";
import {UserPage} from "./components/User/UserPage";
function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchAuthMe());
    }, [])

    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
      <div className={styles.content}>
      <BrowserRouter>
          <Sidebar/>
          <Routes>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path={'/create'} element={<CreatePostPage/>}/>
              <Route path={'/posts'} element={<PostsPage/>}/>
              <Route path={'/post/:id'} element={<PostPage/>}/>
              <Route path={'/post/:id/edit'} element={<CreatePostPage/>}/>
              <Route path={'/register'} element={<RegisterPage/>}/>
              <Route path={'/users/:id'} element={<UserPage/>}/>
              {
                  !isAuthenticated ? <Route path={'/'} element={<LoginPage/>}/> :  <Route path={'/'} element={<PostsPage/>}/>
              }
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
