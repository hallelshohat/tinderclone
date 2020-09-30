import React from 'react';
import PictureContainer from '../components/pictureContainer/pictureContainer';
import styles from '../App.module.css'

export default function HomePage() {
    return (
        <div className={styles.container}>
            <PictureContainer/>
        </div>
    )
}