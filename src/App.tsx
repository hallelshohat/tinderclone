import React from 'react';
import './App.css'
import PictureRandomer from './components/pictureContainer/pictureContainer';
import {FireTwoTone} from '@ant-design/icons';

function App() {
  return (
    <div className="app">   
      <div className="logo">
        <FireTwoTone twoToneColor="#ec3b07" style={{fontSize:40}}/>
      </div>
      <PictureRandomer/>
    </div>
  );
}

export default App;
