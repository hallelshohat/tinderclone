import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPics } from '../../reducers/likedPictureReducer';
import styles from './pictureGallery.module.css';
import appStyles from '../../App.module.css';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { DislikeFilled } from '@ant-design/icons';
import {remove} from '../../reducers/likedPictureReducer';

export default function PictureGallery() {
    const pics = useSelector(selectPics);
    const dispatch = useDispatch();

    const [picIndex, setPicIndex] = useState(-1);

    const deletePic = ()=> {
        dispatch(remove(pics[picIndex]));
        setPicIndex(-1);
    }

    return (
        // <div className={appStyles.container}>
        <div>
            <div className={styles.galleryContainer}>
                {pics.map((pic, index) => (
                        <img key={index} src={pic} className={styles.picture} 
                            alt=""
                            onClick={()=>setPicIndex(index)}/>
                ))}
            </div>

            {picIndex!==-1 && <Lightbox mainSrc={pics[picIndex]} 
                toolbarButtons={[<DislikeFilled 
                    onClick={deletePic}
                    style={{color:"#b8b8b8", 
                    fontSize:18, cursor:"pointer"}}/>]}
                onCloseRequest={()=>setPicIndex(-1)}/> }
        </div>
    )
}