import { Children } from "react";
import "./ModalWithForm.css";
function ModalWithForm({ children, title, buttonText, onClose, isOpen,onSubmit }) {
  const handleSubmit = (e)=>{
    e.preventDefault();
    onSubmit(e);
  }
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button className="modal__submit" type="submit" >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
