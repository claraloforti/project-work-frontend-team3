import { Link, useNavigate } from "react-router-dom";
import "../clara.css";
import { useState } from "react";

function Navbar() {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search.trim() !== "") {
            navigate(`/whisky?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div className="navbar">
            <div className="container nav-links">
                <Link to="/" className="home">HOME</Link>
                <Link to="/whisky" className="home">WHISKY</Link>
                {/* LOGO */}
                <Link to="/" className="logo">
                    <img
                        src="/imgs/logo.png"
                        alt="Heritage Whisky Reserve Logo"
                        className="logo-img"
                    />
                </Link>
                <div className="nav-icons">
                    {/* SEARCH FORM */}
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Cerca..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <Link to="/wishlist">
                        <i className="fa-solid fa-heart"></i>
                    </Link>
                    <Link to="/checkout">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;