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
                                <img src={item.image} alt={item.name}></img>
                                <p>{item.name}</p>

                                {/* Prezzo */}
                                {Number(item.unitary_price) < Number(item.price) ? (
                                    <div className="whisky-price">
                                        <span className="cart-full-price">{Number(item.price).toFixed(2)} €</span>
                                        <span className="">{Number(item.unitary_price).toFixed(2)} €</span>
                                    </div>
                                ) : (
                                    <p className="">{Number(item.unitary_price).toFixed(2)} €</p>
                                )}

                                {/* Bottoni incrementa/decrementa */}
                                <p>
                                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                                </p>

                                {/* Bottone rimuovi prodotto dal carrello */}
                                <p>
                                    <button onClick={() => removeFromCart(item.id)}>Rimuovi dal carrello</button>
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