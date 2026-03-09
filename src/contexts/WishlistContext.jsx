import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    // Aggiunge o rimuove un whisky dai preferiti
    const toggleWishlist = (whisky) => {
        const exists = wishlist.find(item => item.slug === whisky.slug);
        if (exists) {
            setWishlist(wishlist.filter(item => item.slug !== whisky.slug));
        } else {
            setWishlist([...wishlist, whisky]);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

// Hook custom per usare il wishlist context
function useWishlist() {
    return useContext(WishlistContext);
}

export { WishlistProvider, useWishlist };