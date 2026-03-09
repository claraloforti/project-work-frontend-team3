import { Link } from "react-router-dom";
import "../clara.css";

function Navbar() {
    return (
        <div className="navbar">
            <div className="container nav-links">
                {/* Link principali */}
                <Link to="/" className="home">HOME</Link>
                <Link to="/whisky" className="home">WHISKY</Link>

                {/* Logo */}
                <Link to="/" className="logo">
                    <img
                        src="/imgs/logo.png"
                        alt="Heritage Whisky Reserve Logo"
                        className="logo-img"
                    />
                </Link>

                {/* Icone */}
                <div className="nav-icons">
                    {/* Lente che porta a WhiskyPage */}
                    <Link to="/whisky">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>

                    {/* Cuore che porta alla WishListPage */}
                    <Link to="/wishlist">
                        <i className="fa-solid fa-heart"></i>
                    </Link>

                    {/* Carrello che porta alla CheckoutPage */}
                    <Link to="/checkout">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;