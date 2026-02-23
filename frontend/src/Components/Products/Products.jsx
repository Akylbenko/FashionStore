import { useEffect, useState, useContext } from "react"
import api from "../../services/api"
import "./Products.css"
import "../Favorites/Favorites.css"
import { BagContext } from "../../context/BagContext" 

export default function Products() {
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState([]) 

  useEffect(() => {
    fetchProducts()
    fetchFavorites()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products/")
      setProducts(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const { bag, addToBag } = useContext(BagContext)

  const isInBag = (productId) => {
    return bag.some(item => item.id === productId)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites/")
      const ids = res.data.map(item => item.product.id)
      setFavorites(ids)
    } catch (err) {
      console.log(err)
    }
  }

  const isFavorite = (productId) => {
    return favorites.includes(productId)
  }

  const toggleFavorite = async (productId) => {
    try {
      if (isFavorite(productId)) {
        await api.post("/api/favorites/remove/", {
          product: productId
        })

        setFavorites(prev => prev.filter(id => id !== productId))

      } else {
        await api.post("/api/favorites/", {
          product_id: productId
        })

        setFavorites(prev => [...prev, productId])
      }

    } catch (err) {
      alert("Ошибка")
    }
  }

  return (
    <div className="products-container">
        <div className="products-header">
          <h1>Товары</h1>
          <div className="products-line"></div>
        </div>
      <div className="products-grid">
        {products.map(product => (
          <div className="favorite-card" key={product.id}>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="favorite-image"
              />
            )}

            <h3 className="favorite-title-text">
              {product.title}
            </h3>

            <p className="favorite-description">
              {product.description}
            </p>

            <p className="favorite-price">
              Цена: {product.price} ₽
            </p>

            <p className="favorite-stock">
              В наличии: {product.stock}
            </p>
            <div className="favorite-buttons">
              <button
                className="remove-btn"
                onClick={() => toggleFavorite(product.id)}
              >
                {isFavorite(product.id)
                  ? "💔 Удалить"
                  : "❤️ Добавить"}
              </button>

              <button
                className="buy-btn"
                onClick={() => addToBag(product)}
                disabled={isInBag(product.id)}
              >
                {isInBag(product.id)
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
