import { useContext } from "react"
import { BagContext } from "../../context/BagContext"
import "../Favorites/Favorites.css" // используем общий дизайн

export default function BagPage() {
  const { bag, removeFromBag } = useContext(BagContext)

  return (
    <div className="favorites-container">
      
      <div className="favorites-header">
        <h1>Корзина 🛒</h1>
        <div className="favorites-line"></div>
      </div>

      {bag.length === 0 && (
        <p style={{ textAlign: "center" }}>Корзина пустая</p>
      )}

      <div className="favorites-grid">
        {bag.map(item => (
          <div className="favorite-card" key={item.id}>
            
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="favorite-image"
              />
            )}

            <h3 className="favorite-title-text">
              {item.title}
            </h3>

            <p className="favorite-description">
              {item.description}
            </p>

            <p className="favorite-price">
              Цена: {item.price} ₽
            </p>

            {item.stock && (
              <p className="favorite-stock">
                В наличии: {item.stock}
              </p>
            )}

            <div className="favorite-buttons">
              <button
                className="remove-btn"
                onClick={() => removeFromBag(item.id)}
              >
                ❌ Удалить
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}