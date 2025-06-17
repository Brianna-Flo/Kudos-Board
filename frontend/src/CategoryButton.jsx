import React from 'react';
// import './CommonStyles.css'

const CategoryButton = ({category}) => {
    return (
        <button id={category} className="category-btn buttons">
            {category}
        </button>
    )
}

export default CategoryButton;