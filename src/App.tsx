import React, { createContext } from 'react';
import styles from './App.module.css'
import {FireTwoTone, LikeTwoTone} from '@ant-design/icons';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import OptionsPage from './pages/PhotosPage';
import { Divider } from 'antd';
import PictureGenerator from './services/pictureGenerator';

export const PictureProvider = createContext({} as PictureGenerator);

function App() {
  return (
    <PictureProvider.Provider value={new PictureGenerator()}>
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
              <Link to="/options">
                <LikeTwoTone twoToneColor="#FF9D0B" 
                  style={{fontSize:25}}/>
              </Link>
            </div>
          </header>
          <Divider/>
          
          <Route exact path="/">
              <HomePage/>
          </Route>
          <Route exact path="/options">
            <OptionsPage/>
          </Route>
        </BrowserRouter>
      </div>
    </PictureProvider.Provider>
  );
}

export default App;
