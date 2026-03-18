import { useCart } from "../contexts/CartContext";
import OrderForm from "../components/OrderForm";
import { Link } from "react-router-dom";


function CheckoutPage() {
    // Prendo dal CartContext il carrello e tutte le funzioni per gestirlo
    const {
        cart,
        subtotal,
        totalPrice,
        shippingCost,
        amountToFreeShipping,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    return (
        <>
            <h1 className="checkoutpage-title">CARRELLO</h1>
            <div className="checkout-page container">

                {/* CARRELLO */}
                {cart.length === 0 && <p className="empy-cart">Il carrello è vuoto.</p>}

                {cart.length > 0 && (
                    <div>
                        {/* Bottone svuota carrello */}
                        {cart.length > 0 && (
                            <button className="clear-cart-btn"
                                onClick={() => {
                                    if (window.confirm("Sei sicuro di voler svuotare tutto il carrello? Questa azione non è reversibile.")) {
                                        clearCart();
                                    }
                                }}
                            >
                                Svuota carrello
                            </button>
                        )}
                        <div className="cart-products">
                            {cart.map(item => (
                                <div key={item.slug} className="cart-item">
                                    <div className="cart-name-and-price">
                                        <Link to={`/whisky/${item.slug}`} className="whisky-link">
                                            <p className="cart-product-name">{item.name}</p>
                                        </Link>
                                        {/* Prezzo */}
                                        {Number(item.unitary_price) < Number(item.price) ? (
                                            <div className="whisky-price">
                                                <span className="cart-full-price">{Number(item.price).toFixed(2)} €</span>
                                                <span>{Number(item.unitary_price).toFixed(2)} €</span>
                                            </div>
                                        ) : (
                                            <p className="cart-unitary-price">{Number(item.unitary_price).toFixed(2)} €</p>
                                        )}
                                    </div>

                                    <div className="cart-item-buttons">
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
                        <div className="total-cart-info">
                            <p>Subtotale: {subtotal.toFixed(2)} €</p>

                            <p>
                                Spedizione: {shippingCost === 0 ? "Gratuita" : shippingCost.toFixed(2) + " €"}
                            </p>

                            {shippingCost > 0 && (
                                <p className="shipping-cost-info">
                                    Aggiungi <strong>{amountToFreeShipping.toFixed(2)}€ </strong>
                                    per ottenere la <strong>spedizione gratuita</strong>
                                </p>
                            )}

                            {shippingCost === 0 && totalPrice > 0 && (
                                <p className="free-shipping">
                                    🎉 Hai ottenuto la spedizione gratuita!
                                </p>
                            )}

                            <p>
                                <strong>Totale: {totalPrice.toFixed(2)} €</strong>
                            </p>
                        </div>
                    </div>
                )}

                {/* ORDER FORM */}
                {cart.length > 0 && (
                    <OrderForm cart={cart} totalPrice={totalPrice} />
                )}
            </div>
        </>
    );
}

export default CheckoutPage;