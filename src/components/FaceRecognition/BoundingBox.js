import React from 'react';
import './FaceRecognition.css';

const BoundingBox = ({ top, right, bottom, left }) => {
    return (
        <div className='bounding-box' 
            style={{
                top: top, right: right, 
                bottom: bottom, left: left}}>
        </div>
    );
}

export default BoundingBox;