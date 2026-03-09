import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Aggiunge un whisky al carrello (o incrementa se già presente)
    const addToCart = (whisky, quantity = 1) => {
        const alreadyInCart = cart.find(item => item.slug === whisky.slug);
        if (alreadyInCart) {
            setCart(
                cart.map(item =>
                    item.slug === whisky.slug
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...whisky, quantity }]);
        }
    };

    // Rimuove un whisky dal carrello
    const removeFromCart = (slug) => {
        setCart(cart.filter(item => item.slug !== slug));
    };

    // Aggiorna la quantità di un whisky
    const updateQuantity = (slug, quantity) => {
        setCart(
            cart.map(item =>
                item.slug === slug ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook custom per usare il cart context
function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };