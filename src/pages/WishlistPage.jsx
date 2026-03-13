import { useWishlist } from "../contexts/WishlistContext";
import { Link } from "react-router-dom";
import '../Valeria.css'

function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();

    return (
        <div className="wishlist-container">
            <header className="wishlist-header">
                <h1>I tuoi preferiti</h1>
                <p>Hai {wishlist.length} {wishlist.length === 1 ? 'bottiglia' : 'bottiglie'} nella tua lista.</p>
            </header>

            {wishlist.length === 0 ? (
                <div className="empty-state">
                    <Link to={"/"}>
                        <button className="btn-explore">Esplora la nostra selezione</button>
                    </Link>
                </div>
            ) : (
                <div className="wishlist-list">
                    {wishlist.map((whisky) => (
                        <div key={whisky.slug} className="wishlist-card">
                            <div className="wishlist-image-wrapper">
                                <img
                                    src={whisky.image}
                                    alt={whisky.name}
                                    className="wishlist-img"
                                />
                            </div>

                            <div className="wishlist-details">
                                <h3>{whisky.name}</h3>
                                <div className="wishlist-actions">
                                    <button
                                        className="cart-button">
                                        Aggiungi al carrello
                                    </button>

                                    <button
                                        className="remove-button"
                                        onClick={() => toggleWishlist(whisky)}
                                    >
                                        Rimuovi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;