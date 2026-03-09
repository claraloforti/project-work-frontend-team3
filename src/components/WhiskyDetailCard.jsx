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
            <div className="detail-img-wrapper">
                <img src={whisky.image} alt={whisky.name} className="detail-img" />
                {/* Icona aggiungi ai preferiti */}
                <i
                    className={`fa-solid fa-heart ${isFavorite ? "favorited" : ""}`}
                    onClick={() => toggleWishlist(whisky)}
                ></i>
            </div>
            <div className="detail-info">
                <h2>{whisky.name}</h2>
                <p>{whisky.category}</p>
                <p className="detail-description">
                    {whisky.description}
                </p>
                <p>{whisky.age} YO</p>
                <p>Gradazione: {whisky.alcol}%</p>
                <p>{whisky.liters} L</p>

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

                {/* Bottone aggiungi al carrello */}
                <button
                    className="cart-btn"
                    onClick={() => addToCart(whisky, 1)}
                >
                    Aggiungi al carrello
                </button>
            </div>
        </div>
    );
}

export default WhiskyDetailCard;