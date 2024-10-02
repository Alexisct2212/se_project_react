import { Children } from "react";
import "./ModalWithForm.css"
function ModalWithForm({children, title, buttonText,activeModal,onClose}){
    return(
        <div className={`modal ${activeModal === "add-garment"&& "modal__opened"}`}>
            <div className="modal__content">
            <h2 className="modal__title">{title}</h2>
            <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form">
            {children}
            <button className="modal__submit" type="submit" disabled>{buttonText}</button>
        </form>
        </div>
        </div>
    );
}
export default ModalWithForm