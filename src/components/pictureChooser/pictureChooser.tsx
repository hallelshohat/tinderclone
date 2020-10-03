import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {add} from '../../reducers/likedPicturesReducer';
import styles from './pictureChooser.module.css';
import appStyles from '../../App.module.css';
import {SmileOutlined} from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import ChooseButtons from './chooseButtons/ChooseButtons';
import { ModeProvider, PictureProvider } from '../../App';
import noDataImage from '../../no-data.svg';
import { selectIndex, selectPics } from '../../reducers/uploadedPicturesReducer';
import { ModeType } from '../../services/ModeContext';
import  {increment} from '../../reducers/uploadedPicturesReducer';

export default function PictureContainer() {
    const dispatch = useDispatch();
    const uploaded = useSelector(selectPics);
    const index = useSelector(selectIndex);

    const [pic, setPic] = useState("");
    const [tmpPic, setTmpPic] = useState("");
    const [picStyle, setPicStyle] = useState(""); 
    const [tmpPicStyle, setTmpPicStyle] = useState("");
    
    const [picsDone, setPicsDone] = useState(false);
    const generator = useContext(PictureProvider);
    const mode = useContext(ModeProvider).mode;

    const changePic = useCallback(async() => {
        const url = await generator.getImageUrl(mode, uploaded, index);
        if (!url) {
            setTmpPic("");
            setTimeout(()=>setPicsDone(true), 500);
        }
        else {
            setTmpPic(url);
            setTmpPicStyle(styles.zoomAnimation);
        }
    }, [generator, mode, uploaded, index]);

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
    
    const action = (func:()=>void) => {
        return () => {
            if (!picStyle && pic) {
                if (mode === ModeType.upload) {
                    dispatch(increment());  
                }
                func();
                changePic();
            }
        };
    }
    const like = action(()=> {
        dispatch(add(pic));
        setPicStyle(styles.likeAnimation);
    });

    const dislike = action(()=> {
        setPicStyle(styles.dislikeAnimation);
        URL.revokeObjectURL(pic);
    });

    return (
        <div>
            <div className={appStyles.container}>
                {!picsDone ? 
                    <div>
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
                        <ChooseButtons like={like} dislike={dislike} pic={pic}/>
                    </div>
                : 
                    <Empty image={noDataImage} imageStyle={{height:"25vh"}}/>
                }
            </div>
        </div>
    )
}