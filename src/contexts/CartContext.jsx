import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Funzione che aggiunge un whisky al carrello
    const addToCart = (whisky, quantity = 1) => {
        const alreadyInCart = cart.find(item => item.slug === whisky.slug);

        // Calcolo del prezzo finale sempre corretto
        const finalPrice = whisky.discount > 0
            ? whisky.price - (whisky.price * whisky.discount / 100)
            : whisky.price;

        if (alreadyInCart) {
            setCart(
                cart.map(item =>
                    item.slug === whisky.slug
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
                    unitary_price: Number(finalPrice), // sempre salvato
                }
            ]);
        }
    };

    const removeFromCart = (slug) => {
        setCart(cart.filter(item => item.slug !== slug));
    };

    const incrementQuantity = (slug) => {
        setCart(
            cart.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (slug) => {
        setCart(
            cart.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
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