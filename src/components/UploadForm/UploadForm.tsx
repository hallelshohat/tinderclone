import { PictureOutlined } from '@ant-design/icons';
import { message, Progress } from 'antd';
import React, { ChangeEvent, createRef, useContext, useEffect, useState } from 'react';
import { FirebaseProvider, ModeProvider } from '../../App';
import { ModeType } from '../../services/ModeContext';
import styles from './UploadForm.module.css';
import appStyles from '../../App.module.css';
import { useDispatch } from 'react-redux';
import {add} from '../../reducers/uploadedPicturesReducer';

export function UploadForm() {
    const mode = useContext(ModeProvider);
    const fireBase = useContext(FirebaseProvider); 
    const inputRef = createRef<HTMLInputElement>();

    const [percentage, setPercentage] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [images, setImages] = useState(null as FileList | null);
    
    const dispatch = useDispatch();
    
    const upload = async(e:ChangeEvent<HTMLInputElement>) =>{
        setImages(e.target.files);
    }

    useEffect(()=> {
        (async()=>{
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    setImageIndex(i+1);
                    
                    try {
                        const url = await fireBase.uploadPic(`${mode.id}/`, 
                            (snapshot)=>setPercentage(
                                snapshot.bytesTransferred/snapshot.totalBytes * 100), 
                            images[i]);
                        dispatch(add(url));
                    }
                    catch (e) {
                        message.error("could not upload pictures");
                    }                
                }
                
                mode.setMode(ModeType.upload);
                message.success("pictures uploaded successfully!", 1);
            }
        })();
    }, [images, fireBase, mode, dispatch])
    
    return (
        <div className={appStyles.container}>
            <input type="file" onChange={upload} multiple ref={inputRef}
                style={{display:"none"}}></input>

            <button className={styles.uploadBtn} 
                onClick={()=>inputRef.current?.click()}>Upload <PictureOutlined/>
            </button>

            {images && 
                <div>
                    <Progress percent={percentage}/>
                    {imageIndex}/{images.length}
                </div>
            }
        </div>
    )
}