import { useSearchParams, Link } from "react-router-dom";


function SuccessPage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Pagamento Completato! 🥃</h1>
            <p>Grazie per il tuo acquisto. Il tuo ordine è il <strong>#{orderId}</strong>.</p>
            <p>Controlla la tua email per il riepilogo (guarda anche nello spam!).</p>
            <Link to="/">Torna allo shop</Link>
        </div>
    );
}

export default SuccessPage;