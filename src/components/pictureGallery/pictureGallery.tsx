import React from 'react';
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';
import { selectPics } from '../../reducers/likedPictureReducer';
import styles from './pictureGallery.module.css';
import Picture from './Picture';

export default function PictureGallery() {
    const pics = useSelector(selectPics);

    return (
        <div>
            <div className={styles.galleryContainer}>
                {pics.map((pic, index) => (
                    <Picture key={index} src={pic}/>
                ))}
            </div>
        </div>
    )
}