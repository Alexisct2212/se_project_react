import "./ItemCard.css";
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  
  
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img className="card__like_Button" type="button" ></img>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
