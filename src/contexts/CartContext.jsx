import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {

    // Salvo il carrello nel localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

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

    const SHIPPING_COST = 100.00;
    const FREE_SHIPPING_THRESHOLD = 1000.00;

    const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : SHIPPING_COST;
    const finalTotal = totalPrice + shippingCost;
    const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            incrementQuantity,
            decrementQuantity,
            clearCart,
            totalPrice,
            shippingCost,
            finalTotal,
            amountToFreeShipping
        }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };