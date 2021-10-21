import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({percent}) => {
    return (
        <div className="progress__container">
            <div className="progress__percent" style={{
                opacity: percent === 0 ? 0 : 1,
                width: `${percent}%`
            }}>
            {percent}%
            </div>
        </div>
    )
}

export default ProgressBar;
