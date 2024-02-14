import React from 'react';
import './TextSizeChanger.css';

const TextSizeChanger = () => {
  const changeTextSize = (delta) => {
    const elementsToResize = document.querySelectorAll('label, h1, h2, h3, h4, h5, h6, p');
    elementsToResize.forEach(element => {
      const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
      const newSize = parseFloat(currentSize) + delta;
      element.style.fontSize = `${newSize}px`;
    });
  };

  return (
    <div className="text-size-changer">
      <button onClick={() => changeTextSize(1)}>+</button>
      <button onClick={() => changeTextSize(-1)}>-</button>
      <label>Text Size</label>
    </div>
  );
};

export default TextSizeChanger;
