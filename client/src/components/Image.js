import React from 'react'

export const Image = ({ imageUrl }) => (
    <img 
        style={{
            width: '100%'
        }}
        src={`http://localhost:5000/uploads/${imageUrl}`} 
        alt=""
    />
)