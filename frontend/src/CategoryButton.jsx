import React from 'react';

const CategoryButton = ({category}) => {
    return (
        <button id={category}>
            {category}
        </button>
    )
}

export default CategoryButton;