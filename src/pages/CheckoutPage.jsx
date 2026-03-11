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
                    <div className="cart-products">
                        {cart.map(item => (
                            <div key={item.slug}>
                                <p>{item.name}</p>
                                <img src={item.image} alt={item.name}></img>
                                {Number(item.discountedPrice || item.price).toFixed(2)} €
                                <p>
                                    <button onClick={() => decrementQuantity(item.slug)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(item.slug)}>+</button>
                                </p>
                                <p>{((item.discountedPrice ?? item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)} €</p>
                                <p>
                                    <button onClick={() => removeFromCart(item.slug)}>X</button>
                                </p>
                            </div>
                        ))}
                    </div>

                    <p><strong>Totale: {totalPrice.toFixed(2)} €</strong></p>
                </div>
            )}

            {/* ORDER FORM */}
            <OrderForm cart={cart} totalPrice={totalPrice} />
        </div>
    );
}

export default CheckoutPage;