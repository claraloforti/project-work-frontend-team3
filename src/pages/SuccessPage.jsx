import { useSearchParams, Link } from "react-router-dom";

function SuccessPage() {
    const [searchParams] = useSearchParams();

    // Recuperiamo l'ID ordine e i due link delle email dall'URL
    const orderId = searchParams.get("order_id");
    const urlCliente = searchParams.get("url_c");
    const urlVenditore = searchParams.get("url_v");

    return (
        <div className="payment-page container" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
            <h1>Il tuo acquisto è stato completato! 🥃</h1>
            <p>Grazie per aver scelto i nostri prodotti!</p>
            <p>Il numero del tuo ordine è <strong>#{orderId}</strong>.</p>
            <p>Un’email di conferma con il riepilogo dell’ordine è stata inviata al tuo indirizzo.</p>
            <p>Ti consigliamo di verificare anche la cartella spam.</p>

            {/* --- SEZIONE DEBUG PER PRESENTAZIONE --- */}
            {(urlCliente || urlVenditore) && (
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    border: '1px dashed #d4af37'
                }}>
                    <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🛠️ Area Anteprima Email (a scopo didattico)</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>

                        {urlCliente && (
                            <a href={urlCliente} target="_blank" rel="noopener noreferrer" style={{
                                backgroundColor: '#d4af37',
                                color: 'black',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}>
                                📧 Vedi Mail Cliente
                            </a>
                        )}

                        {urlVenditore && (
                            <a href={urlVenditore} target="_blank" rel="noopener noreferrer" style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}>
                                💰 Vedi Mail Venditore
                            </a>
                        )}

                    </div>
                </div>
            )}

            <div style={{ marginTop: '40px' }}>
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