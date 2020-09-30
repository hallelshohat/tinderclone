import React from 'react';
import styles from './App.module.css'
import {BarsOutlined, FireTwoTone} from '@ant-design/icons';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import PhotosPage from './pages/PhotosPage';

function App() {
  return (
    <div className={styles.app}>   
      <BrowserRouter>      
        <header className={styles.header}>
          <div className={styles.headerLink}/>
          <Link to="/">
            <div className={styles.logo}>
              <FireTwoTone twoToneColor="#ec3b07" style={{fontSize:40}}/>
            </div>
          </Link>
          <div className={styles.headerLink}>
            <Link to="/photos">
              <BarsOutlined style={{fontSize:25}}/>
            </Link>
          </div>
        </header>

        <Route exact path="/">
            <HomePage/>
        </Route>
        <Route exact path="/photos">
          <PhotosPage/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
