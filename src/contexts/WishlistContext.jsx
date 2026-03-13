import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
  
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("whisky_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("whisky_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

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

function useWishlist() {
    return useContext(WishlistContext);
}

export { WishlistProvider, useWishlist };