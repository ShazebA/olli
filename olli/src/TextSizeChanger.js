import React from 'react';
import './TextSizeChanger.css';

const TextSizeChanger = () => {
    const changeTextSize = (delta) => {
        // Only target elements within #main-content
        const elementsToResize = document.querySelectorAll('#main-content label, #main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5, #main-content h6, #main-content p');
        elementsToResize.forEach(element => {
            const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
            const newSize = parseFloat(currentSize) + delta;
            element.style.fontSize = `${newSize}px`;
        });
    };

    const resetTextSize = () => {
        const elementsToResize = document.querySelectorAll('#main-content label, #main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5, #main-content h6, #main-content p');
        elementsToResize.forEach(element => {
          element.style.fontSize = '';
        });
      };


    return (
        <div className="text-size-changer">
            <button onClick={() => changeTextSize(1)}>+</button>
            <button onClick={() => changeTextSize(-1)}>-</button>
            <button onClick={resetTextSize} style={{ width: '80px' }}>Reset</button>
            <label>Text Size</label>
        </div>
    );
};

export default TextSizeChanger;
