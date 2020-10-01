import React from 'react';
import PictureChooser from '../components/pictureChooser/pictureChooser';
import styles from '../App.module.css'

export default function HomePage() {
    return (
        <div className={styles.container}>
            <PictureChooser/>
        </div>
    )
}