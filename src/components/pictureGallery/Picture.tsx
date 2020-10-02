import styles from './pictureGallery.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import { CheckCircleTwoTone, CloseCircleTwoTone, DeleteFilled, DislikeFilled } from '@ant-design/icons';
import {remove} from '../../reducers/likedPictureReducer';
import { Popover } from 'antd';

const deleteHold = 300;

export default function Picture(props:any) {
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [picStyle, setPicStyle] = useState("");
    const [canDelete, setCanDelete] = useState(false);
    const dispatch = useDispatch();
    
    const deletePic = ()=> {
        setPicStyle(styles.deleteAnimation);
        setLightboxVisible(false);
        setPopoverVisible(false);
        setTimeout(()=>setCanDelete(true), deleteHold);
    }

    const deleteFromList = () => {
        if (picStyle === styles.deleteAnimation && canDelete) {
            dispatch(remove(props.src));
        }
    }

    return (
        <div>
            <div className={`${styles.pictureContainer} ${picStyle}`}
                onAnimationEnd={deleteFromList}>
                <Popover content={
                    <div className={styles.popoverContent}>
                        <CheckCircleTwoTone twoToneColor="#ffaa01" style={{fontSize:25}}
                            onClick={deletePic}/>
                        <CloseCircleTwoTone twoToneColor="#ffaa01" style={{fontSize:25}}
                            onClick={()=>setPopoverVisible(false)}/>
                    </div>
                } 
                    title="Are you sure?"
                    placement="bottom"
                    trigger="click" visible={popoverVisible}
                    onVisibleChange={setPopoverVisible}>
                    <div className={styles.closeBtn}><DeleteFilled/></div>
                </Popover>
                <img src={props.src} className={styles.picture} 
                    alt=""
                    onClick={()=>setLightboxVisible(true)}/>
            </div>
            {lightboxVisible && <Lightbox mainSrc={props.src} 
                toolbarButtons={[<DislikeFilled 
                    onClick={deletePic}
                    style={{color:"#b8b8b8", 
                    fontSize:18, cursor:"pointer"}}/>]}
                onCloseRequest={()=>setLightboxVisible(false)}/> }
        </div>
    )
}