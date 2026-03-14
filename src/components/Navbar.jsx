import { Link } from "react-router-dom";
import "../clara.css";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

function Navbar() {

    const { cart } = useCart();
    const { wishlist } = useWishlist();

    // Somma tutte le quantità dei prodotti
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalWishlist = wishlist.length;


    return (
        <div className="navbar">
            <div className="container nav-links">
                {/* Link principali */}
                <Link to="/" className="home"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>HOME</Link>
                <Link to="/whisky" className="home"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>WHISKY</Link>

                {/* Logo */}
                <div className="logo">
                    <img
                        src="/imgs/logo.png"
                        alt="Heritage Whisky Reserve Logo"
                        className="logo-img"
                    />
                </div>

                {/* Icone */}
                <div className="nav-icons">
                    {/* Lente che porta a WhiskyPage */}
                    <Link to="/whisky"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>

                    {/* Cuore che porta alla WishListPage */}
                    <Link to="/wishlist" className="wishlist-link">
                        <i className="fa-solid fa-heart"></i>
                        {/* Mostra il numero solo se > 0 */}
                        {totalWishlist > 0 && (
                            <span className="wishlist-count">{totalWishlist}</span>
                        )}
                    </Link>

                    {/* Carrello che porta alla CheckoutPage */}
                    <Link to="/checkout" className="cart-link">
                        <i className="fa-solid fa-cart-shopping"></i>

                        {/* Mostra il numero solo se > 0 */}
                        {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;