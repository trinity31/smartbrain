import React from 'react';
import BoundingBox from './BoundingBox';

const FaceRecognition = ({ boxs, imageUrl }) => {
    return (
        <div className="center ma">
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
                {
                    boxs.map((box, i) => {
                        return (
                            <BoundingBox
                                key={i}
                                top={box.topRow}
                                right={box.rightCol}
                                bottom={box.bottomRow}
                                left={box.leftCol}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FaceRecognition;