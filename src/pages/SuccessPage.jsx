import { useSearchParams, Link } from "react-router-dom";


function SuccessPage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="payment-page container" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
            <h1 >Il tuo acquisto è stato completato! 🥃</h1>
            <p>Grazie per aver scelto i nostri prodotti!</p>
            <p>Il numero del tuo ordine è <strong>#{orderId}</strong>.</p>
            <p>Un’email di conferma con il riepilogo dell’ordine è stata inviata al tuo indirizzo.</p>
            <p>Ti consigliamo di verificare anche la cartella spam.</p>
            <Link to="/">
                <button className="back-btn">
                    ← TORNA ALLA HOME
                </button>
            </Link>
        </div>
    );
}

export default SuccessPage;