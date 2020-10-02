import React from 'react';
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';
import { selectPics } from '../../reducers/likedPictureReducer';
import styles from './pictureGallery.module.css';
import Picture from './Picture';

export default function PictureGallery() {
    const pics = useSelector(selectPics);

    return (
        <div className={styles.galleryContainer}>
            {pics.map(pic => (
                <Picture key={pic} src={pic}/>
            ))}
        </div>
    )
}