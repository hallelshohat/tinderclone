import React, { useState } from 'react';
import styles from './ChooseButtons.module.css';
import {HeartTwoTone, FrownTwoTone} from '@ant-design/icons';

export default function ChooseButtons(props:any) {
    const [likeStyle, setLikeStyle] = useState("");
    const [dislikeStyle, setDislikeStyle] = useState("");

    const like = () => {
        setTimeout(()=>setLikeStyle(""), 300);
        props.like();
    }

    const dislike = () => {
        setTimeout(()=>setDislikeStyle(""), 300);
        props.dislike();
    }

    return (
        <div className={styles.btnContainer}>
            <button className={`${styles.actionBtn} ${styles.dislikeBtn} ${dislikeStyle}`} 
                onClick={dislike} disabled={!props.pic} 
                onTouchStart={()=>setDislikeStyle(styles.hoverEffect)}>
                <FrownTwoTone twoToneColor="#2a18e7" style={{fontSize:30}}/>
            </button>
            <button className={`${styles.actionBtn} ${styles.likeBtn} ${likeStyle}`} 
                onClick={like} disabled={!props.pic}
                onTouchStart={()=>setLikeStyle(styles.hoverEffect)}>
                <HeartTwoTone twoToneColor="#b80404" style={{fontSize:30}}/>
            </button>
        </div>
    )
}