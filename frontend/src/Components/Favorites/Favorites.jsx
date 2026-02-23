import { useEffect, useState, useContext } from "react"
import { BagContext } from "../../context/BagContext"
import api from "../../services/api"
import "./Favorites.css"

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites/")
      setFavorites(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromFavorites = async (productId) => {
    try {
      await api.post("/api/favorites/remove/", {
        product: productId
      })

      setFavorites(prev =>
        prev.filter(item => item.product.id !== productId)
      )

    } catch (err) {
      alert("Ошибка удаления")
    }
  }

  const { bag, addToBag } = useContext(BagContext)

  const isInBag = (productId) => {
    return bag.some(item => item.id === productId)
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Избранное ❤️</h1>
        <div className="favorites-line"></div>
      </div>
      <div className="favorites-grid">
        {favorites.map(item => (
          <div className="favorite-card" key={item.id}>
            {item.product.image && (
              <img
                src={item.product.image}
                alt={item.product.title}
                className="favorite-image"
              />
            )}

            <h3 className="favorite-title-text">
              {item.product.title}
            </h3>

            <p className="favorite-description">
              {item.product.description}
            </p>

            <p className="favorite-price">
              {item.product.price} ₽
            </p>

            <div className="favorite-buttons">
              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(item.product.id)}
              >
                💔 Удалить
              </button>

              <button
                className="buy-btn"
                onClick={() => addToBag(item.product)}
                disabled={isInBag(item.product.id)}
              >
                {isInBag(item.product.id)
                  ? "✅ В корзине"
                  : "🛒 Купить"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}