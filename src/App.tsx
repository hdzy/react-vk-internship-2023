import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AccountPage} from './components/Account/AccountPage';
import {Header} from './components/Header/Header';
import {LoginPage} from './components/Login/LoginPage';
// @ts-ignore
import styles from './App.module.css';
import {PostsPage} from "./components/Posts/PostsPage";
import {PostPage} from "./components/Post/PostPage";
function App() {
  return (
      <div className={styles.content}>
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path={'/account'} element={<AccountPage/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path={'/posts'} element={<PostsPage/>}/>
              <Route path={'/post/:id'} element={<PostPage/>}/>
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
