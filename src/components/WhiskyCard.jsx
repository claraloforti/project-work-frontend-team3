import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

function WhiskyCard({ whisky }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    // Calcolo prezzo scontato
    const finalPrice = whisky.price - (whisky.price * whisky.discount / 100)

    // Controllo se il whisky è già nei preferiti
    const isFavorite = wishlist.some(item => item.slug === whisky.slug)

    return (
        <div className="whisky-card">

            {/* Link al dettaglio */}
            <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                <img src={whisky.image} alt={whisky.name} className="whisky-img" />
                <h3>{whisky.name}</h3>
            </Link>

            {/* Invecchiamento */}
            <div className="whisky-info">
                <p>{whisky.description}</p>
                <p>Invecchiato {whisky.age} anni</p>
            </div>

            {/* Prezzo */}
            {
                whisky.discount > 0 ? (
                    <div className="whisky-price">
                        <span className="full-price">{whisky.price} €</span>
                        <span className="discount-price">{finalPrice.toFixed(2)} €</span>
                    </div>
                ) : (
                    <p className="full-price-no-discount">{whisky.price} €</p>
                )
            }

            {/* Bottoni */}
            <div className="card-buttons">
                <button
                    className="cart-btn"
                    // Chiama la funzione addToCart dal CartContext
                    // Al click aggiunge il whisky al carrello
                    onClick={() => addToCart(whisky, 1)}
                >
                    🛒 Aggiungi al carrello
                </button>

                <button
                    className={`wishlist-btn ${isFavorite ? "favorited" : ""}`}
                    // Chiama la funzione toggleWishlist dal WishlistContext
                    // Al click aggiunge o rimuove il Whisky dai preferiti
                    onClick={() => toggleWishlist(whisky)}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

        </div >
    )
}

export default WhiskyCard