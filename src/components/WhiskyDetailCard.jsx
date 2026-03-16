import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function WhiskyDetailCard({ whisky }) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();

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
                        <span className="detail-full-price-no-discount">{whisky.price} €</span>
                    )
                }

                <div className="detail-buttons">
                    {/* Bottone aggiungi al carrello */}
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
                    {/* Bottone torna alla pagina precedente */}
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← TORNA INDIETRO
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WhiskyDetailCard;