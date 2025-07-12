import React from 'react';
import { styles } from './Card.styles';

const Card = ({ children, style = {}, className = "", ...props }) => {
    return (
        <div
            style={{...styles.card, ...style}}
            className={className}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
