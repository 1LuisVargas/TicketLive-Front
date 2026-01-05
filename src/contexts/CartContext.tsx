//Versión con local storage en lo que se incorpora el carrito del back y cookies
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/interfaces/product.interface";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getIdItems: () => number[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  //PERSISTENCIA LOCAL
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

   //LIMPIAR EL CARRITO AL HACER LOGOUT
  useEffect(() => {
    if (!isLoggedIn) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  }, [isLoggedIn]);

  //ACCIONES
  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      toast.error("You must sign in to add items to the cart");
      return;
    }

    const exists = cartItems.some(item => item.id === product.id);
    if (exists) {
      toast.warning("This item is already in your cart");
      return;
    }

    setCartItems(prev => [...prev, product]);
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);

  const getItemCount = () => cartItems.length;

  const getIdItems = () => cartItems.map(item => item.id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getItemCount,
        getIdItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

