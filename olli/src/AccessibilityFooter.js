import React from 'react';
import './AccessibilityFooter.css';
import TextSizeChanger from './TextSizeChanger';

const AccessibilityFooter = () => {

    return (

        <div className="footer">
            <h1>Accessibility Settings</h1>
            {/* Add any other accessibility setting elements like this below */}
            <TextSizeChanger />
        </div>

    );
}

export default AccessibilityFooter;