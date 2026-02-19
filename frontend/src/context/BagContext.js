import { createContext, useState, useEffect } from "react"

export const BagContext = createContext()

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bag")) || []
    setBag(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(bag))
  }, [bag])

  const addToBag = (product) => {
    setBag(prev => [...prev, product])
  }

  const removeFromBag = (id) => {
    setBag(prev => prev.filter(item => item.id !== id))
  }

  return (
    <BagContext.Provider
      value={{
        bag, 
        addToBag,
        removeFromBag
      }}
    >
      {children}
    </BagContext.Provider>
  )
}
