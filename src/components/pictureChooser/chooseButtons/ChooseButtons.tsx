import React, { useState } from 'react';
import styles from './ChooseButtons.module.css';
import {HeartTwoTone, FrownTwoTone} from '@ant-design/icons';

const effectTimeout = 300;

export default function ChooseButtons(props:any) {
    const [likeStyle, setLikeStyle] = useState("");
    const [dislikeStyle, setDislikeStyle] = useState("");

    const like = () => {
        setTimeout(()=>setLikeStyle(""), effectTimeout);
        props.like();
    }

    const dislike = () => {
        setTimeout(()=>setDislikeStyle(""), effectTimeout);
        props.dislike();
    }

    const setStyle = (setButton:Function) => {
        if (props.pic) {
            setButton(styles.hoverEffect);
        }
    }

    return (
        <div className={styles.btnContainer}>
            <button className={`${styles.actionBtn} ${styles.dislikeBtn} ${dislikeStyle}`} 
                onClick={dislike} disabled={!props.pic} 
                onTouchStart={()=>setStyle(setDislikeStyle)}>
                <FrownTwoTone twoToneColor="#2a18e7" style={{fontSize:30}}/>
            </button>
            <button className={`${styles.actionBtn} ${styles.likeBtn} ${likeStyle}`} 
                onClick={like} disabled={!props.pic}
                onTouchStart={()=>setStyle(setLikeStyle)}>
                <HeartTwoTone twoToneColor="#b80404" style={{fontSize:30}}/>
            </button>
        </div>
    )
}