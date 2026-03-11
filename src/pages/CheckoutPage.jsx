import { useCart } from "../contexts/CartContext";
import OrderForm from "../components/OrderForm";
import "../clara.css";

function CheckoutPage() {
    // Prendo dal CartContext il carrello e tutte le funzioni per gestirlo
    const { cart, totalPrice, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    return (
        <div className="checkout-page container">
            <h1>CARRELLO</h1>

            {/* CARRELLO */}
            {cart.length === 0 && <p>Il carrello è vuoto.</p>}

            {cart.length > 0 && (
                <div className="cart-summary">
                    <div className="cart-products">
                        {cart.map(item => (
                            <div key={item.slug} className="cart-item">
                                {/* Nome e immagine */}
                                <p>{item.name}</p>
                                <img src={item.image} alt={item.name}></img>
                                {/* Prezzo */}
                                <p>Prezzo: {Number(item.unitary_price).toFixed(2)} €</p>
                                <p>
                                    <button onClick={() => decrementQuantity(item.slug)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(item.slug)}>+</button>
                                </p>

                                {/* Bottone rimuovi prodotto */}
                                <p>
                                    <button onClick={() => removeFromCart(item.slug)}>X</button>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Totale carrello */}
                    <p><strong>Totale: {totalPrice.toFixed(2)} €</strong></p>
                </div>
            )}

            {/* ORDER FORM */}
            <OrderForm cart={cart} totalPrice={totalPrice} />
        </div>
    );
}

export default CheckoutPage;