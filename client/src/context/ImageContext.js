import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
    const [ images, setImages ] = useState([]);

    useEffect(() => {
        axios.get('/api/images')
            .then(({data}) => setImages(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <ImageContext.Provider value={{ images, setImages }}>
            {children}
        </ImageContext.Provider>
    )
}
