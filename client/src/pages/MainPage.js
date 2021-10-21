import React from 'react'
import { UploadForm } from '../components/UploadForm.js';
import { ImageList } from '../components/ImageList.js';

export const MainPage = () => {
    return (
        <>
            <h1 className="App-title">Upload page</h1>
            <UploadForm />
            <ImageList />
        </>
    )
}