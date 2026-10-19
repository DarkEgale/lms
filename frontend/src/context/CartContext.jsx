import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Temporary cart until Redux exists (guide global rule 6).
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]) // { item, qty }
  const [enrollDraft, setEnrollDraft] = useState(null) // { slug, data }

  const add = useCallback((item, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.item.slug === item.slug)
      if (existing) {
        return prev.map((line) =>
          line.item.slug === item.slug ? { ...line, qty: line.qty + qty } : line,
        )
      }
      return [...prev, { item, qty }]
    })
  }, [])

  const setQty = useCallback((slug, qty) => {
    setLines((prev) =>
      prev.map((line) => (line.item.slug === slug ? { ...line, qty: Math.max(1, qty) } : line)),
    )
  }, [])

  const remove = useCallback((slug) => {
    setLines((prev) => prev.filter((line) => line.item.slug !== slug))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    return {
      lines,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      enrollDraft,
      setEnrollDraft,
    }
  }, [lines, add, setQty, remove, clear, enrollDraft])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
