import React, { createContext } from 'react';
import styles from './App.module.css'
import {FireTwoTone, LikeTwoTone, UploadOutlined} from '@ant-design/icons';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import PhotosPage from './pages/PhotosPage';
import { Divider } from 'antd';
import PictureGenerator from './services/pictureGenerator';
import { ModeContext, ModeType } from './ModeContext';

export const PictureProvider = createContext({} as PictureGenerator);
export const ModeProvider = createContext({} as ModeContext)

function App() {
  return (
    <ModeProvider.Provider value={new ModeContext(ModeType.random)}>
      <PictureProvider.Provider value={new PictureGenerator()}>
        <div className={styles.app}>   
          <BrowserRouter>      
            <header className={styles.header}>
              <div className={styles.headerLink}>
                <Link to="upload">
                  <UploadOutlined style={{color:"#FF9D0B", fontSize:25}}/>
                </Link>
              </div>
              <Link to="/">
                <div className={styles.logo}>
                  <FireTwoTone twoToneColor="#ec3b07" style={{fontSize:40}}/>
                </div>
              </Link>
              <div className={`${styles.headerLink} ${styles.headerLike}`}>
                <Link to="/liked">
                  <LikeTwoTone twoToneColor="#FF9D0B" 
                    style={{fontSize:25}}/>
                </Link>
              </div>
            </header>
            <Divider/>
            
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/liked">
              <PhotosPage/>
            </Route>
        </BrowserRouter>
        </div>
      </PictureProvider.Provider>
    </ModeProvider.Provider>
  );
}

export default App;
