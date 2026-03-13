import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Aggiunge un whisky al carrello
    const addToCart = (whisky, quantity = 1) => {
        const alreadyInCart = cart.find(item => item.id === whisky.id);

        if (alreadyInCart) {
            setCart(
                cart.map(item =>
                    item.id === whisky.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    id: whisky.id,
                    slug: whisky.slug,
                    name: whisky.name,
                    image: whisky.image,
                    quantity,
                    unitary_price: Number(whisky.unitary_price),
                    price: Number(whisky.price)
                }
            ]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const incrementQuantity = (id) => {
        setCart(
            cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCart(
            cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    // Funzione per svuotare il carrello
    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.unitary_price * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            incrementQuantity,
            decrementQuantity,
            clearCart,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };