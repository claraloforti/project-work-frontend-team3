import { useCart } from "../contexts/CartContext";
import OrderForm from "../components/OrderForm";
import "../clara.css";

function CheckoutPage() {
    const { cart, totalPrice, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    return (
        <div className="checkout-page container">
            <h1>CARRELLO</h1>

            {/* CARRELLO */}
            {cart.length === 0 && <p>Il carrello è vuoto.</p>}

            {cart.length > 0 && (
                <div className="cart-summary">
                    <h2>Carrello</h2>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Prodotto</th>
                                <th>Prezzo</th>
                                <th>Quantità</th>
                                <th>Subtotale</th>
                                <th>Rimuovi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.slug}>
                                    <td>{item.name}</td>
                                    <td>{item.discountedPrice?.toFixed(2) ?? item.price.toFixed(2)} €</td>
                                    <td>
                                        <button onClick={() => decrementQuantity(item.slug)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementQuantity(item.slug)}>+</button>
                                    </td>
                                    <td>{((item.discountedPrice ?? item.price) * item.quantity).toFixed(2)} €</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.slug)}>X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p><strong>Totale: {totalPrice.toFixed(2)} €</strong></p>
                </div>
            )}

            {/* ORDER FORM */}
            <OrderForm cart={cart} totalPrice={totalPrice} />
        </div>
    );
}

export default CheckoutPage;