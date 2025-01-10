import { useContext } from "react";
import "./ItemModal.css";
import currentUserContext from "../../context/CurrentUserContext"
function ItemModal({ activeModal, card, onClose,handleDelete }) {
  const  currentUser = useContext(currentUserContext);
  const isOwner = currentUser && currentUser?._id === card?.owner;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" onClick={onClose}></button>
        <img src={card.link || card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
           {isOwner ?(<button className="modal__delete" onClick={handleDelete}>Delete item</button>)
           : (
            <p className="modal__error_noOwner">You Cannot Delete This Item</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
