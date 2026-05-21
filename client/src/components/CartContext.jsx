import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  /**
   * ADD ITEM
   * Increments qty if same id + size exists
   */
  const addItem = useCallback(
    (product, size, qty = 1) => {
      setItems((prev) => {
        const key = `${product.id}-${size}`;

        const existing = prev.find(
          (i) => i.key === key
        );

        // Existing item
        if (existing) {
          return prev.map((i) =>
            i.key === key
              ? {
                  ...i,
                  qty: i.qty + qty,
                }
              : i
          );
        }

        // New item
        return [
          ...prev,
          {
            key,

            id:
              product.id ||
              product._id,

            name: product.name,

            house: product.house,

            price: Number(
              product.price
            ),

            size,

            qty,
          },
        ];
      });
    },
    []
  );

  /**
   * SET ABSOLUTE QUANTITY
   * Removes item if qty <= 0
   */
  const updateQty = useCallback(
    (key, qty) => {
      if (qty <= 0) {
        setItems((prev) =>
          prev.filter(
            (i) => i.key !== key
          )
        );

        return;
      }

      setItems((prev) =>
        prev.map((i) =>
          i.key === key
            ? {
                ...i,
                qty,
              }
            : i
        )
      );
    },
    []
  );

  /**
   * INCREASE QUANTITY
   */
  const increaseQty = useCallback(
    (key) => {
      setItems((prev) =>
        prev.map((item) =>
          item.key === key
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );
    },
    []
  );

  /**
   * DECREASE QUANTITY
   * Removes automatically if qty reaches 0
   */
  const decreaseQty = useCallback(
    (key) => {
      setItems((prev) =>
        prev
          .map((item) =>
            item.key === key
              ? {
                  ...item,
                  qty: item.qty - 1,
                }
              : item
          )
          .filter(
            (item) => item.qty > 0
          )
      );
    },
    []
  );

  /**
   * REMOVE ITEM
   */
  const removeItem = useCallback(
    (key) => {
      setItems((prev) =>
        prev.filter(
          (i) => i.key !== key
        )
      );
    },
    []
  );

  /**
   * CLEAR CART
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * SUBTOTAL
   */
  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        item.price * item.qty,
      0
    );
  }, [items]);

  /**
   * TOTAL ITEMS
   */
  const totalItems = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,

        addItem,

        updateQty,

        increaseQty,

        decreaseQty,

        removeItem,

        clearCart,

        subtotal,

        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(
    CartContext
  );

  if (!ctx) {
    throw new Error(
      "useCart must be used inside <CartProvider>"
    );
  }

  return ctx;
}