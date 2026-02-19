import { useEffect, useState } from "react"
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

  return (
    <div className="favorites-container">
      <h1>Избранное ❤️</h1>

      {favorites.map(item => (
        <div className="favorite-card" key={item.id}>
          <h3 className="favorite-title">
            {item.product.title}
          </h3>

          <p className="favorite-description">
            {item.product.description}
          </p>

          <p className="favorite-price">
            {item.product.price} ₽
          </p>
        </div>
      ))}
    </div>
  )
}
