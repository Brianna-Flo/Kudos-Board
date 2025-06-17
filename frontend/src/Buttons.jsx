import './Buttons.css'

const Buttons = ({buttonClass, buttonType, buttonId, buttonText, onClick}) => {
    return (
        // example: <button id={category} className="buttons category-btn ">
        <button id={buttonId} className={`buttons ${buttonClass}`} onClick={onClick} type={buttonType}>
            {buttonText}
        </button>
    )
}

export default Buttons;