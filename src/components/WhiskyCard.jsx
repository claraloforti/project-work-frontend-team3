import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

function WhiskyCard({ whisky }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    // Calcolo prezzo scontato
    const finalPrice = whisky.discountedPrice;

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
                <p>{whisky.description}</p>
                <p>{whisky.age} YO</p>
                {/* Prezzo */}
                {whisky.discount > 0 ? (
                    <div className="whisky-price">
                        <span className="full-price">{whisky.price} €</span>
                        <span className="discount-price">{finalPrice.toFixed(2)} €</span>
                    </div>
                ) : (
                    <p className="full-price-no-discount">{whisky.price} €</p>
                )}

                {/* Bottone aggiungi al carrello */}
                <div className="card-button">
                    <button
                        className="cart-btn"
                        // Chiama la funzione addToCart dal CartContext
                        // Al click aggiunge il whisky al carrello
                        onClick={() => addToCart(whisky, 1)}
                    >
                        Aggiungi al carrello
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WhiskyCard