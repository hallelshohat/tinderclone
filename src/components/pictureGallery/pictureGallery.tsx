import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPics } from '../../reducers/pictureReducer';
import styles from './pictureGallery.module.css';
import appStyles from '../../App.module.css';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

export default function PictureGallery() {
    const pics = useSelector(selectPics);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className={appStyles.container}>
            {pics.map((pic, index) => (
                <img key={index} src={pic} className={styles.picture} 
                    alt=""
                    onClick={()=>setModalVisible(true)}/>
            ))}

            {modalVisible && <Lightbox mainSrc={pics[0]} 
                onCloseRequest={()=>setModalVisible(false)}/> }
        </div>
    )
}