import styles from './pictureGallery.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import { DeleteFilled, DislikeFilled } from '@ant-design/icons';
import {remove} from '../../reducers/likedPictureReducer';
import { Popover } from 'antd';

export default function Picture(props:any) {
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const dispatch = useDispatch();
    
    const deletePic = ()=> {
        dispatch(remove(props.src));
        setLightboxVisible(false);
    }

    return (
        <div>
            <div className={styles.pictureContainer}>
                <Popover content={"hi"} title="Are you sure?"
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