import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

function WhiskyDetailCard({ whisky }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    // Calcolo prezzo scontato
    const finalPrice = whisky.price - (whisky.price * whisky.discount / 100)

    // Controllo se il whisky è già nei preferiti
    const isFavorite = wishlist.some(item => item.slug === whisky.slug)


    return (

        <div className="whisky-detail-card">
            <img
                src={whisky.image}
                alt={whisky.name}
                className="detail-img"
            />
            <div className="detail-info">
                <h2>{whisky.name}</h2>
                <p>{whisky.category}</p>
                <p className="detail-description">
                    {whisky.description}
                </p>
                <div className="detail-specs">
                    <p>{whisky.age} YO</p>
                    <p>Gradazione: {whisky.alcohol}%</p>
                    <p>Formato: {whisky.liters} L</p>
                </div>

                {/* Prezzo */}
                {
                    whisky.discount > 0 ? (
                        <div className="whisky-price">
                            <span className="full-price">{whisky.price} €</span>
                            <span className="discount-price">{finalPrice.toFixed(2)} €</span>
                        </div>
                    ) : (
                        <span className="full-price-no-discount">{whisky.price} €</span>
                    )
                }

                {/* Bottoni */}
                <div className="detail-buttons">
                    <button
                        className="cart-btn"
                        onClick={() => addToCart(whisky, 1)}
                    >
                        Aggiungi al carrello
                    </button>

                    <button
                        className={`wishlist-btn ${isFavorite ? "favorited" : ""}`}
                        onClick={() => toggleWishlist(whisky)}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WhiskyDetailCard;