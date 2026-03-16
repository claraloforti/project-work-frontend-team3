import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";


function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [addedSlug, setAddedSlug] = useState(null);

    return (
        <div className="wishlist-container container">
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
                    {wishlist.map((whisky) => {

                        return (
                            <div key={whisky.slug} className="wishlist-card">
                                <div className="wishlist-image-wrapper">
                                    {/* Link al dettaglio cliccando l'immagine */}
                                    <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                                        <img src={whisky.image} alt={whisky.name} className="wishlist-img" />
                                    </Link>
                                </div>

                                <div className="wishlist-details">
                                    {/* Link al dettaglio cliccando sul titolo */}
                                    <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                                        <h3>{whisky.name}</h3>
                                    </Link>
                                    {/* Prezzo */}
                                    {whisky.discount > 0 ? (
                                        <div className="whisky-price">
                                            <span className="full-price">{whisky.price} €</span>
                                            <span className="discount-price">{Number(whisky.unitary_price).toFixed(2)} €</span>
                                        </div>
                                    ) : (
                                        <p className="full-price-no-discount">{whisky.price} €</p>
                                    )}
                                    <div className="wishlist-actions">
                                        {/* Bottone Aggiungi al carrello */}
                                        <button
                                            className={`add-to-cart-btn ${addedSlug === whisky.slug ? "added" : ""}`}
                                            onClick={() => {
                                                addToCart({
                                                    id: whisky.id,
                                                    slug: whisky.slug,
                                                    name: whisky.name,
                                                    image: whisky.image,
                                                    price: whisky.price,
                                                    unitary_price: whisky.unitary_price
                                                }, 1);

                                                setAddedSlug(whisky.slug);
                                                setTimeout(() => setAddedSlug(null), 2000);
                                            }}
                                        >
                                            {addedSlug === whisky.slug ? "Aggiunto ✓" : "Aggiungi al carrello"}
                                        </button>

                                        {/* Bottone rimuovi */}
                                        <button
                                            className="remove-button"
                                            onClick={() => toggleWishlist(whisky)}
                                        >
                                            Rimuovi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;