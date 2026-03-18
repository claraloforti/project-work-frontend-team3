import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { useState } from "react"

function WhiskyCard({ whisky }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const [added, setAdded] = useState(false);

    // Controllo se il whisky è già nei preferiti
    const isFavorite = wishlist.some(item => item.slug === whisky.slug)

    return (
        <div className="whisky-card">

            <div className="whisky-img-wrapper">
                {/* Link al dettaglio cliccando l'immagine */}
                <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                    <img src={whisky.image} alt={whisky.name} className="whisky-img" />
                </Link>
                {/* Icona cuore per aggiungere ai preferiti */}
                <i
                    className={`fa-solid fa-heart ${isFavorite ? "favorited" : ""}`}
                    onClick={() => toggleWishlist(whisky)}
                ></i>
            </div>

            <div className="whisky-info">
                {/* Link al dettaglio cliccando sul titolo */}
                <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                    <h3>{whisky.name}</h3>
                </Link>
                <p>{whisky.category}</p>
                <p className="whisky-description">{whisky.description}</p>
                {/* Prezzo */}
                <div className="whisky-price">
                    {whisky.discount > 0 ? (
                        <>
                            <span className="full-price">{whisky.price} €</span>
                            <span className="discount-price">{Number(whisky.unitary_price).toFixed(2)} €</span>
                        </>
                    ) : (
                        <span className="full-price-no-discount">{whisky.price} €</span>
                    )}
                </div>

                {/* Bottone aggiungi al carrello */}
                <div className="card-button">
                    <button
                        className={`add-to-cart-btn ${added ? "added" : ""}`}
                        onClick={() => {
                            addToCart({
                                id: whisky.id,
                                slug: whisky.slug,
                                name: whisky.name,
                                image: whisky.image,
                                price: whisky.price,
                                unitary_price: whisky.unitary_price
                            }, 1);

                            setAdded(true);

                            setTimeout(() => {
                                setAdded(false);
                            }, 2000);
                        }}
                    >
                        {added ? "Aggiunto ✓" : "Aggiungi al carrello"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WhiskyCard