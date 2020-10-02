import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {add} from '../../reducers/likedPictureReducer';
import styles from './pictureChooser.module.css';
import appStyles from '../../App.module.css';
import {SmileOutlined} from '@ant-design/icons';
import { Spin } from 'antd';
import ChooseButtons from './chooseButtons/ChooseButtons';
import { PictureProvider } from '../../App';

export default function PictureContainer() {
    const dispatch = useDispatch();
    const [pic, setPic] = useState("");
    const [tmpPic, setTmpPic] = useState("");
    const [picStyle, setPicStyle] = useState(""); 
    const [tmpPicStyle, setTmpPicStyle] = useState("");
    const generator = useContext(PictureProvider);

    const changePic = useCallback(async() => {
        setTmpPic(await generator.getImageUrl());
        setTmpPicStyle(styles.zoomAnimation);
    }, [generator]);

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
    }, [changePic]);

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
            <ChooseButtons like={like} dislike={dislike} pic={pic}/>
        </div>
    )
}