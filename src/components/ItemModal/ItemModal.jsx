import "./ItemModal.css";
function ItemModal({ activeModal, card, onClose,handleDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" onClick={onClose}></button>
        <img src={card.link || card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete" onClick={handleDelete}>Delete item</button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
