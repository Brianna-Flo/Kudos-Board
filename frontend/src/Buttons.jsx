import './Buttons.css'

const Buttons = ({type, buttonId, buttonText, clickAction}) => {
    console.log("in buttons creating button for ", buttonText);
    return (
        // example: <button id={category} className="buttons category-btn ">
        <button id={buttonId} className={`buttons ${type}`} onClick={clickAction}>
            {buttonText}
        </button>
    )
}

export default Buttons;