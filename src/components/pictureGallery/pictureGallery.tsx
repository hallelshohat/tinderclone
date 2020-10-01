import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPics } from '../../reducers/pictureReducer';
import styles from './pictureGallery.module.css';
import appStyles from '../../App.module.css';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

export default function PictureGallery() {
    const pics = useSelector(selectPics);
    const [picIndex, setPicIndex] = useState(-1);

    return (
        <div className={appStyles.container}>
            {pics.map((pic, index) => (
                <img key={index} src={pic} className={styles.picture} 
                    alt=""
                    onClick={()=>setPicIndex(index)}/>
            ))}

            {picIndex!==-1 && <Lightbox mainSrc={pics[picIndex]} 
                toolbarButtons={[]}
                onCloseRequest={()=>setPicIndex(-1)}/> }
        </div>
    )
}