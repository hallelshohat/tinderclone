import React from 'react';
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';
import { selectPics } from '../../reducers/likedPicturesReducer';
import Picture from './Picture';
import { MansoryLayout } from '../MasonryLayout/MansoryLayout';
import {useMediaQuery} from 'react-responsive';

export default function PictureGallery() {
    const pics = useSelector(selectPics);
    const isMobile = useMediaQuery({query:"(max-width:800px)"});

    return (
        <MansoryLayout columns={isMobile ? 2 : 4}>
            {pics.map(pic=> (
                <Picture key={pic} src={pic} />
            ))}
        </MansoryLayout>
    )
}