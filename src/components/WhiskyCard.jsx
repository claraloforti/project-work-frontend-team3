import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

function WhiskyCard({ whisky }) {
    const { addToCart } = useContext(CartContext)
    const { wishlist, toggleWishlist } = useContext(WishlistContext)

    // Calcolo prezzo scontato
    const finalPrice = whisky.price - (whisky.price * whisky.discount / 100)

    // Controlla se il whisky è già nei preferiti
    const isFavorite = wishlist.some(item => item.slug === whisky.slug)

    return (
        <div className="whisky-card">

            {/* Link al dettaglio */}
            <Link to={`/whisky/${whisky.slug}`} className="whisky-link">
                <img src={whisky.image} alt={whisky.name} className="whisky-img" />
                <h3>{whisky.name}</h3>
            </Link>

            {/* Età */}
            <p>Invecchiato {whisky.age} anni</p>

            {/* Prezzo */}
            {whisky.discount > 0 ? (
                <div className="price">
                    <span className="full-price">{whisky.price} €</span>
                    <span className="discount-price">{finalPrice.toFixed(2)} €</span>
                </div>
            ) : (
                <p>{whisky.price} €</p>
            )}

            {/* Bottoni */}
            <div className="card-buttons">
                <button
                    className="add-to-cart"
                    onClick={() => addToCart(whisky, 1)} // aggiunge 1 al carrello
                >
                    🛒 Aggiungi al carrello
                </button>

                <button
                    className={`wishlist-btn ${isFavorite ? "favorited" : ""}`}
                    onClick={() => toggleWishlist(whisky)}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

        </div>
    )
}

export default WhiskyCard