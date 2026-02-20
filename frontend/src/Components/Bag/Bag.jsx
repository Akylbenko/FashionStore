import { useContext } from "react"
import { BagContext } from "../../context/BagContext"
import "./Bag.css"

export default function BagPage() {
  const { bag, removeFromBag } = useContext(BagContext)

  return (
    <div className="bag-container">
      <h1>Корзина</h1>

      {bag.length === 0 && <p>Корзина пустая</p>}

      {bag.map(item => (
        <div className="bag-card" key={item.id}>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="bag-image"
            />

          )}
          <h3 className="bag-title">{item.title}</h3>
          <p className="bag-description">{item.description}</p>
          <p className="bag-price">{item.price}</p>
          <button onClick={() => removeFromBag(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  )
}
