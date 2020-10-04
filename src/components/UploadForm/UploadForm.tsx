import { CheckCircleFilled, PictureOutlined } from '@ant-design/icons';
import { message, Progress, Spin } from 'antd';
import React, { ChangeEvent, createRef, useCallback, useContext, useEffect, useState } from 'react';
import { FirebaseProvider, ModeProvider } from '../../App';
import { ModeType } from '../../services/ModeContext';
import styles from './UploadForm.module.css';
import appStyles from '../../App.module.css';
import { useDispatch } from 'react-redux';
import {add} from '../../reducers/uploadedPicturesReducer';
import {compress} from '../../services/imageCompressor';

message.config({
    top:50
})

export function UploadForm() {
    const mode = useContext(ModeProvider);
    const fireBase = useContext(FirebaseProvider); 
    const inputRef = createRef<HTMLInputElement>();
    const [imageCount, setImageCount] = useState(0);
    const [images, setImages] = useState(null as FileList | null);
    
    const dispatch = useDispatch();

    const percent = ()=>images ? 100 * imageCount / images.length : 0;
    
    const upload = async(e:ChangeEvent<HTMLInputElement>) =>{
        setImages(e.target.files);
    }

    const uploadOne = useCallback(async(image:File) => {
        try {
            const compressed = await compress(image);
            const url = await fireBase.uploadPic(`${mode.id}/`, 
                compressed);
            dispatch(add(url));
            setImageCount(count=>count+1);
        }
        catch (e) {
            message.error("could not upload pictures", 1);
        }                
    }, [fireBase, mode, dispatch]);

    useEffect(()=> {
        if (images) {
            for (let i = 0; i < images.length; i++) {
                uploadOne(images[i]);
            }
        }
    }, [images, uploadOne]);

    useEffect(()=>{
        if (imageCount === images?.length) {
            message.success("pictures uploaded successfully!", 1);
            mode.setMode(ModeType.upload);
        }
    }, [images, imageCount, mode]);
    
    return (
        <div className={appStyles.container}>
            <input type="file" accept="image/*" onChange={upload} multiple ref={inputRef}
                style={{display:"none"}}></input>

            <button className={styles.uploadBtn} 
                onClick={()=>inputRef.current?.click()}>Upload <PictureOutlined/>
            </button>

            {images &&
                    <div>
                        <Progress percent={percent()} format={p=>p?.toFixed(0)+"%"}/>
                        {imageCount}/{images.length} 
                        {percent() < 100 ? 
                        <Spin/>
                        :
                        <CheckCircleFilled style={{color:"green"}}/>
                        }
                    </div>
                }
        </div>
    )
}