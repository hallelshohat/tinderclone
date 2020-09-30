import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PictureGenerator from '../../pictureGenerator';
import {add} from '../../reducers/pictureReducer';
import styles from './pictureRandomer.module.css';
import {HeartTwoTone, FrownTwoTone} from '@ant-design/icons';

export default function PictureRandomer() {
    const dispatch = useDispatch();
    const [pic, setPic] = useState("");
    const [picStyle, setPicStyle] = useState(""); 
    
    const changePic = async() => {
        const generator = new PictureGenerator();
        setPic(await generator.getImageUrl());
    }
    useEffect(() => {
        changePic();
    }, []);
    
    const like = ()=> {
        dispatch(add(pic));
        setPicStyle(styles.likeAnimation);
        //changePic();
    }

    const dislike = ()=> {
        URL.revokeObjectURL(pic);
        changePic();
    }

    return (
        <div className={styles.container}>
            <div className={styles.picContainer}>
                <img src="" alt="tmp_img"/>
                <img src={pic} alt="img" className={picStyle}
                    onAnimationEnd={()=>{}}/>
            </div>
            <div className={styles.btnContainer}>
                <button className={`${styles.actionBtn} ${styles.dislikeBtn}`}
                    onClick={dislike}>
                    <FrownTwoTone twoToneColor="#2a18e7" style={{fontSize:30}}/>
                </button>
                <button className={`${styles.actionBtn} ${styles.likeBtn}`} 
                    onClick={like}>
                    <HeartTwoTone twoToneColor="#b80404" style={{fontSize:30}}/>
                </button>
            </div>
        </div>
    )
}