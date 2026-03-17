import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import Swal from 'sweetalert2';


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
        // Questa funzione svuota lo stato 'cart' e il localStorage e mostra l'alert 
        if (hasShownAlert.current) return;
        hasShownAlert.current = true;

        clearCart();

        Swal.fire({
            title: 'Ordine Completato! 🥃',
            text: 'Il tuo carrello è stato svuotato con successo. Torna presto a trovarci i barili si svuotano presto!',
            icon: 'success',
            confirmButtonColor: '#d4af37',
            background: '#4c301a',
            color: '#ffffff',
            allowOutsideClick: false,
        });

    }, [clearCart]);


    return (
        <div className="payment-page container" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
            <h1>Il tuo acquisto è stato completato! 🥃</h1>
            <p>Grazie per aver scelto i nostri prodotti!</p>
            <p>Il numero del tuo ordine è <strong>#{orderId}</strong>.</p>
            <p>Un’email di conferma con il riepilogo dell’ordine è stata inviata al tuo indirizzo.</p>
            <p>Ti consigliamo di verificare anche la cartella spam.</p>

            {/* Anteprima email cliente e venditore */}
            {(urlCliente || urlVenditore) && (
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    border: '1px dashed #d4af37'
                }}>
                    <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>Anteprima Email</h3>
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