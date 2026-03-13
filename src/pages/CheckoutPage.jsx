import { useCart } from "../contexts/CartContext";
import OrderForm from "../components/OrderForm";
import "../clara.css";

function CheckoutPage() {
    // Prendo dal CartContext il carrello e tutte le funzioni per gestirlo
    const { cart, totalPrice, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();

    return (
        <>
            <h1 className="checkoutpage-title">CARRELLO</h1>
            <div className="checkout-page container">

                {/* CARRELLO */}
                {cart.length === 0 && <p>Il carrello è vuoto.</p>}

                {cart.length > 0 && (
                    <div className="cart-summary">
                        {/* Bottone svuota carrello */}
                        {cart.length > 0 && (
                            <button className="clear-cart-btn" onClick={clearCart}>
                                Svuota carrello
                            </button>
                        )}
                        <div className="cart-products">
                            {cart.map(item => (
                                <div key={item.slug} className="cart-item">
                                    <div className="cart-img-wrapper">
                                        <img src={item.image} alt={item.name}></img>
                                    </div>
                                    <div className="cart-product-info">
                                        <p className="cart-product-name">{item.name}</p>
                                        {/* Prezzo */}
                                        {Number(item.unitary_price) < Number(item.price) ? (
                                            <div className="whisky-price">
                                                <span className="cart-full-price">{Number(item.price).toFixed(2)} €</span>
                                                <span>{Number(item.unitary_price).toFixed(2)} €</span>
                                            </div>
                                        ) : (
                                            <p className="cart-unitary-price">{Number(item.unitary_price).toFixed(2)} €</p>
                                        )}


                                        {/* Bottoni incrementa/decrementa */}
                                        <p>
                                            <button
                                                className="decrement-btn"
                                                onClick={() => decrementQuantity(item.id)}><i className="fa-solid fa-minus"></i></button>
                                            <span className="item-quantity">{item.quantity}</span>
                                            <button
                                                className="increment-btn"
                                                onClick={() => incrementQuantity(item.id)}><i className="fa-solid fa-plus"></i></button>
                                        </p>

                                        {/* Bottone rimuovi prodotto dal carrello */}
                                        <p>
                                            <button
                                                className="remove-cart-btn"
                                                onClick={() => removeFromCart(item.id)}>Rimuovi dal carrello</button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totale carrello */}
                        <p><strong>Totale carrello: {totalPrice.toFixed(2)} €</strong></p>
                    </div>
                )}

                {/* ORDER FORM */}
                <OrderForm cart={cart} totalPrice={totalPrice} />
            </div>
        </>
    );
}

export default CheckoutPage;