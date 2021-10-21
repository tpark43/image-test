import React, { useContext, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import './UploadForm.css';
import { toast } from 'react-toastify';
import { ImageContext } from '../context/ImageContext';

export const UploadForm = () => {
    const { images, setImages } = useContext(ImageContext);
    const defaultName = 'Drag an image file';
    const [ file, setFile ] = useState(null);
    const [ fileLabel, setFileLabel ] = useState(defaultName);
    const [ percent, setPercent ] = useState(0);
    const [ imgSrc, setImgSrc ] = useState("");

    const imageFileHandler = (e) => {
        console.log(e.target.files);
        const imageFile = e.target.files[0];
        setFile(imageFile);
        setFileLabel(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        console.log(fileReader)
        fileReader.onload = (e) => setImgSrc(e.target.result);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        try {
            // const res = await fetch('/upload', {
            //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //     mode: 'cors', // no-cors, cors, *same-origin
            //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //     credentials: 'same-origin', // include, *same-origin, omit
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         // 'Content-Type': 'application/json',
            //         // 'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     redirect: 'follow', // manual, *follow, error
            //     referrer: 'no-referrer', // no-referrer, *client
            //     body: JSON.stringify(formData), // body data type must match "Content-Type" header
            // }).then(res => res.json());
            if(!file) {
                alert('Upload a file please');
                throw new Error('Upload a file please');
            }
            const isYes = window.confirm('Would you like to save the file?');
            if(isYes) {
                const { data } = await axios.post('/api/images', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: e => {
                        setPercent(Math.round(e.loaded / e.total) * 100);
                    }
                });
                console.log(data);
                setImages([...images, data]);
                toast.success(`Upload ${fileLabel} successfully!`);
                setTimeout(() => {
                    setPercent(0);
                    setFileLabel(defaultName);
                    setImgSrc("");
                }, 5000);
            }   
        } catch(e) {
            console.error(e);
            toast.error('Error');
            setPercent(0);
            setFileLabel(defaultName);
            setImgSrc("");
        }
    }

    return <form onSubmit={submitHandler}>
        <img src={imgSrc} alt="my file" className={`uploadForm__image-preview ${imgSrc && "uploadForm__image-preview-show"}`} />
        <ProgressBar percent={percent} />
        <div htmlFor="upload" className="uploadForm__file-drag">
            {fileLabel}
            <input type="file" name="image" id="image" onChange={imageFileHandler} />
        </div>
        <button className="uploadForm__file-submit" type="submit">Submit</button>
    </form>
}
