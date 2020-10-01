import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PictureGenerator from '../../pictureGenerator';
import {add} from '../../reducers/likedPictureReducer';
import styles from './pictureChooser.module.css';
import appStyles from '../../App.module.css';
import {HeartTwoTone, FrownTwoTone, SmileOutlined} from '@ant-design/icons';
import { Spin } from 'antd';

export default function PictureContainer() {
    const dispatch = useDispatch();
    const [pic, setPic] = useState("");
    const [tmpPic, setTmpPic] = useState("");
    const [picStyle, setPicStyle] = useState(""); 
    const [tmpPicStyle, setTmpPicStyle] = useState("");

    const changePic = async() => {
        const generator = new PictureGenerator();
        setTmpPic(await generator.getImageUrl());
        setTmpPicStyle(styles.zoomAnimation);
    }

    const flipTmp = () => {
        setPic(tmpPic);
        setTmpPicStyle("");
    }
    
    const disablePic = () => { 
        setPicStyle("");
        if (pic !== tmpPic) {
            setPic("");
        }
    }

    useEffect(() => {
        changePic();
    }, []);

    useEffect(()=> {
        if (tmpPic === pic && picStyle === "") {
            setTmpPic("");
        }
    }, [pic, tmpPic, picStyle]);
    
    const like = ()=> {
        if (!picStyle && pic) {
            dispatch(add(pic));
            setPicStyle(styles.likeAnimation);
            changePic();
        }
    }

    const dislike = ()=> {
        if (!picStyle && pic) {
            setPicStyle(styles.dislikeAnimation);
            URL.revokeObjectURL(pic);
            changePic();
        }
    }

    return (
        <div>
            <div className={appStyles.container}>
                <div className={styles.picContainer}>
                    <img src={tmpPic} alt="" className={tmpPicStyle}
                        onAnimationEnd={flipTmp}/>
                    {(!tmpPic) ? 
                        <Spin
                        indicator={<SmileOutlined style={{fontSize:35}} spin/>}/> 
                        : ""
                    }
                    <img src={pic} alt="" className={picStyle}
                        onAnimationEnd={disablePic}/>
                </div>
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