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

    // Incrementa la quantità di un prodotto
    const incrementQuantity = (slug) => {
        setCart(
            cart.map(item =>
                item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrementa la quantità di un prodotto
    const decrementQuantity = (slug) => {
        setCart(
            cart.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    // Calcolo totale dinamico del carrello
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            incrementQuantity,
            decrementQuantity,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook custom per usare il cart context
function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };