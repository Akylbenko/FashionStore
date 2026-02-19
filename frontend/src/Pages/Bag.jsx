import { useContext } from "react"
import { BagContext } from "../context/BagContext"

export default function BagPage() {
  const { bag, removeFromBag } = useContext(BagContext)

  return (
    <div>
      <h1>Корзина</h1>

      {bag.length === 0 && <p>Корзина пустая</p>}

      {bag.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.price}</p>

          <button onClick={() => removeFromBag(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  )
}
