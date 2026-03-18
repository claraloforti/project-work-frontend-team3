import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";


function SuccessPage() {
    const [searchParams] = useSearchParams();
    // Recupera la funzione dal context
    const { clearCart } = useCart();
    // Recuperiamo l'ID ordine e i due link delle email dall'URL
    const orderId = searchParams.get("order_id");
    const urlCliente = searchParams.get("url_c");
    const urlVenditore = searchParams.get("url_v");

    const hasShownAlert = useRef(false);

    useEffect(() => {
        clearCart();
    }, []);


    return (
        <div className="payment-page container">
            <h1>Il tuo acquisto è stato completato! 🥃</h1>
            <p>Grazie per aver scelto i nostri prodotti!</p>
            <p>Il numero del tuo ordine è <strong>#{orderId}</strong>.</p>
            <p>Un’email di conferma con il riepilogo dell’ordine è stata inviata al tuo indirizzo.</p>
            <p>Ti consigliamo di verificare anche la cartella spam.</p>

            <div>
                <Link to="/">
                    <button className="back-btn">
                        ← TORNA ALLA HOME
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SuccessPage;