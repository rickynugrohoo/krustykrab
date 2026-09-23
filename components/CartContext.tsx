"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface CartLine {
  id: string;
  name: string;
  subtitle: string;
  detail: string;
  image: string;
  unitPrice: number;
  qty: number;
  mods?: string[];
}

export interface AddPayload {
  id: string;
  name: string;
  subtitle?: string;
  detail?: string;
  image: string;
  unitPrice: number;
  mods?: string[];
}

interface CartState {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (item: AddPayload) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const seedItems: CartLine[] = [
  {
    id: "the-og",
    name: "The OG",
    subtitle: "Custom Single Patty Smash",
    detail: "Fresh Angus Beef, Melted American, Martin's Potato Bun",
    image: "/menu/burger-og.jpg",
    unitPrice: 13.5,
    qty: 1,
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    subtitle: "2x Angus Patties, Double Gooey Cheddar",
    detail: "Crispy Onion Strings, Caramelized Sweet Onions, Brioche",
    image: "/menu/burger-double.jpg",
    unitPrice: 14.0,
    qty: 2,
    mods: ["Cut in Halves", "Extra Crispy Edges"],
  },
  {
    id: "crispy-fries",
    name: "Crispy Shoestring Fries",
    subtitle: "Golden & Double-Fried in Tallow",
    detail: "Rosemary Maldon Sea Salt + Large Carton",
    image: "/menu/side-fries.jpg",
    unitPrice: 5.0,
    qty: 1,
  },
];

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(seedItems);

  const add = useCallback((item: AddPayload) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.id === item.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          subtitle: item.subtitle ?? "",
          detail: item.detail ?? "",
          image: item.image,
          unitPrice: item.unitPrice,
          qty: 1,
          mods: item.mods,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, l) => sum + l.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + l.qty * l.unitPrice, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, add, remove, setQty, clear }),
    [items, count, subtotal, add, remove, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
