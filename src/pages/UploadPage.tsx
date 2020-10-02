import React, { useContext } from 'react';
import { ModeProvider } from '../App';
import { ModeType } from '../ModeContext';

export function UploadPage() {
    const mode = useContext(ModeProvider);

    mode.setMode(ModeType.upload);
    
    return (
        <div>hi</div>
    )
}