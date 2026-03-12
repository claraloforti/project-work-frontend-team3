import { useState } from "react";
import axios from "axios";
import "../clara.css";

function OrderForm({ cart, totalPrice, onOrderComplete }) {
    const [customer, setCustomer] = useState({
        customer_name: "",
        customer_surname: "",
        customer_email: "",
        shipping_address: "",
        billing_address: "",
        customer_phone: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Aggiorna lo stato quando l'utente scrive
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Invia ordine al backend
    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Il carrello è vuoto!");
            return;
        }

        setLoading(true);

        // Payload ordine
        const orderPayload = {
            customer_name: customer.customer_name,
            customer_surname: customer.customer_surname,
            customer_email: customer.customer_email,
            shipping_address: customer.shipping_address,
            billing_address: customer.billing_address,
            customer_phone: customer.customer_phone,
            whiskies: cart.map(item => ({
                whisky_id: item.id,
                quantity: item.quantity,
                unitary_price: item.unitary_price
            }))
        };

        axios.post("http://localhost:3000/api/products/orders", orderPayload)
            .then(res => {
                setSuccess(true);
                onOrderComplete && onOrderComplete(); // callback se serve in CheckoutPage
            })
            .catch(err => {
                console.error(err);
                alert("Errore nell'invio dell'ordine");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="checkout-page">
            <form className="order-form" onSubmit={handleSubmit}>
                {success && <p className="success-msg">Ordine completato con successo!</p>}

                {/* Dati per la spedizione */}
                <div className="shipping-data">
                    <h2>Dati per la spedizione</h2>
                    <input
                        type="text"
                        name="customer_name"
                        placeholder="Nome"
                        value={customer.customer_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="customer_surname"
                        placeholder="Cognome"
                        value={customer.customer_surname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="customer_email"
                        placeholder="Email"
                        value={customer.customer_email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="shipping_address"
                        placeholder="Indirizzo spedizione"
                        value={customer.shipping_address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="customer_phone"
                        placeholder="Telefono"
                        value={customer.customer_phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Dati per la fatturazione */}
                <div className="billing-data">
                    <h2>Dati per la fatturazione</h2>
                    <input
                        type="text"
                        name="billing_name"
                        placeholder="Nome"
                        value={customer.customer_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="billing_surname"
                        placeholder="Cognome"
                        value={customer.customer_surname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="billing_email"
                        placeholder="Email"
                        value={customer.customer_email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="billing_address"
                        placeholder="Indirizzo fatturazione"
                        value={customer.billing_address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="billing_phone"
                        placeholder="Telefono"
                        value={customer.customer_phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Totale ordine */}
                <p className="total-order-price"><strong>Totale ordine: {totalPrice.toFixed(2)} €</strong></p>

                <button type="submit" disabled={loading || cart.length === 0}>
                    {loading ? "Invio in corso..." : "Invia ordine"}
                </button>
            </form>
        </div>
    );
}

export default OrderForm;