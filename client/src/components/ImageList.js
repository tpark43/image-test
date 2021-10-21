import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import { Image } from './Image';

export const ImageList = () => {
    const { images } = useContext(ImageContext);
    
    const imageList = images.map(image => (
        <Image key={image.key} imageUrl={image.key} />
    ));

    return (
        <div style={{
            maxWidth: 600,
            margin: 'auto'
        }}>
            <h3>Image List</h3>
            {imageList}
        </div>
    )
}