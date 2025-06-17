import './Buttons.css'

const Buttons = ({buttonClass, buttonType, buttonId, buttonText, clickAction}) => {
    console.log("in buttons creating button for ", buttonText);
    return (
        // example: <button id={category} className="buttons category-btn ">
        <button id={buttonId} className={`buttons ${buttonClass}`} onClick={clickAction} type={buttonType}>
            {buttonText}
        </button>
    )
}

export default Buttons;