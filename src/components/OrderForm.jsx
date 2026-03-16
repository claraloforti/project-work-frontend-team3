import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function OrderForm({ cart, totalPrice }) {
    const [customer, setCustomer] = useState({
        customer_name: "",
        customer_surname: "",
        customer_email: "",
        shipping_address: "",
        billing_address: "",
        customer_phone: ""
    });

    const [sameBilling, setSameBilling] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Aggiorna lo stato quando l'utente scrive
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Handler per il checkbox termini e condizioni
    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    // Handler checkbox fatturazione uguale a spedizione
    const handleSameBillingChange = (e) => {
        const checked = e.target.checked;
        setSameBilling(checked);

        if (checked) {
            setCustomer({
                ...customer,
                billing_address: customer.shipping_address
            });
        } else {
            setCustomer({
                ...customer,
                billing_address: ""
            });
        }
    };

    // Handler per il modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Invia ordine al backend
    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            Swal.fire("Attenzione", "Il carrello è vuoto!", "warning");
            return;
        }

        if (!termsAccepted) {
            Swal.fire("Termini e Condizioni", "Accetta i termini per procedere.", "info");
            return;
        }

        setLoading(true);

        // Payload con dati dell'ordine
        const orderPayload = {
            customer_name: customer.customer_name,
            customer_surname: customer.customer_surname,
            customer_email: customer.customer_email,
            shipping_address: customer.shipping_address,
            billing_address: sameBilling ? customer.shipping_address : customer.billing_address,
            customer_phone: customer.customer_phone,
            total_price: totalPrice,
            whiskies: cart.map(item => ({
                whisky_id: item.id,
                quantity: item.quantity,
                unitary_price: item.unitary_price
            })),
            termsAccepted
        };

        // Invio dati al BE
        axios.post("http://localhost:3000/api/products/orders", orderPayload)
            .then(res => {
                // Reindirizza l’utente alla pagina di pagamento Stripe se il backend restituisce l’URL della sessione
                if (res.data.url) {
                    window.location.href = res.data.url;
                } else {
                    setSuccess(true);
                    Swal.fire("Ottimo!", "Ordine creato con successo!", "success");
                }
            })
            .catch(err => {
                console.error("Errore durante l’invio dell’ordine:", err);

                // LOGICA SWEET ALERT PER ERRORI BACKEND
                if (err.response && err.response.data && err.response.data.errors) {
                    const listaErrori = err.response.data.errors
                        .map(error => `<li>${error}</li>`)
                        .join("");

                    Swal.fire({
                        icon: 'error',
                        title: 'Dati non validi',
                        html: `<ul style="text-align: left;">${listaErrori}</ul>`,
                        confirmButtonText: 'Sistemo subito',
                        confirmButtonColor: '#721c24'
                    });
                } else {
                    Swal.fire("Errore", "Si è verificato un errore imprevisto.", "error");
                }

            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form className="order-form" onSubmit={handleSubmit}>

            {success && <p className="success-msg">Ordine completato con successo!</p>}

            {/* Dati per la spedizione */}
            <div className="shipping-data">
                <h2>Dati per la spedizione</h2>
                <input type="text" name="customer_name" placeholder="Nome" value={customer.customer_name} onChange={handleChange} required />
                <input type="text" name="customer_surname" placeholder="Cognome" value={customer.customer_surname} onChange={handleChange} required />
                <input type="email" name="customer_email" placeholder="Email" value={customer.customer_email} onChange={handleChange} required />
                <input type="text" name="shipping_address" placeholder="Indirizzo spedizione" value={customer.shipping_address} onChange={handleChange} required />
                <input type="tel" name="customer_phone" placeholder="Telefono" value={customer.customer_phone} onChange={handleChange} required pattern="^\+?[0-9]{6,15}$" />
            </div>

            {/* Checkbox fatturazione */}
            <div className="billing-checkbox">
                <input
                    type="checkbox"
                    id="sameBilling"
                    checked={sameBilling}
                    onChange={handleSameBillingChange}
                />
                <label htmlFor="sameBilling">
                    Indirizzo di fatturazione uguale a quello di spedizione
                </label>
            </div>

            {/* Indirizzo di fatturazione */}
            {!sameBilling && (
                <div className="billing-data">
                    <h2>Indirizzo di fatturazione</h2>
                    <input
                        type="text"
                        name="billing_address"
                        placeholder="Indirizzo fatturazione"
                        value={customer.billing_address}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            {/* Totale ordine */}
            <p className="total-order-price"><strong>Totale ordine: {totalPrice.toFixed(2)} €</strong></p>

            {/* Checkbox termini e condizioni */}
            <div className="terms-checkbox">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={handleTermsChange} />
                <label htmlFor="terms">Accetto i termini e condizioni</label>
            </div>

            <button type="button" className="terms-link-btn" onClick={openModal}>
                Leggi termini
            </button>

            {/* Popup termini e condizioni */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Termini e Condizioni</h2>
                        <p>Benvenuto su Heritage Whisky Reserve. Utilizzando questo sito e procedendo con un ordine, accetti di essere vincolato a questi Termini e Condizioni.</p>
                        <p>1. Accettazione dei Termini<br />Effettuando un ordine confermi di aver letto, compreso e accettato questi Termini e Condizioni, la nostra Informativa sulla Privacy e tutte le politiche correlate.</p>
                        <p>2. Descrizione dei Prodotti<br />Vendiamo whisky pregiati, edizioni limitate e prodotti correlati. I prezzi pubblicati includono IVA, ma le spese di spedizione vengono aggiunte al checkout.</p>
                        <p>3. Requisiti Minimi<br />Per acquistare su questo sito devi essere legalmente maggiorenne nel tuo paese (generalmente 18+ o 21+ in base alla legge locale).</p>
                        <p>4. Ordini e Pagamenti<br />Quando confermi un ordine, autorizzi il pagamento immediato tramite i metodi accettati. Ci riserviamo il diritto di rifiutare ordini per motivi ragionevoli.</p>
                        <p>5. Consegna e Spedizione<br />Le tempistiche di consegna variano in base alla località e al corriere. Non siamo responsabili per ritardi causati da terzi.</p>
                        <p>6. Diritto di Recesso<br />Hai il diritto di recedere dall’acquisto entro 14 giorni dalla ricezione, conformemente alla normativa sui contratti a distanza.</p>
                        <p>7. Garanzia e Responsabilità<br />I nostri prodotti sono coperti dalla garanzia legale di conformità. Il nostro limite di responsabilità è pari al valore totale dell’ordine.</p>
                        <p>8. Proprietà Intellettuale<br />Contenuti, immagini, marchi e descrizioni presenti su questo sito sono di nostra proprietà. È vietata la copia senza autorizzazione.</p>
                        <p>9. Modifiche del Contratto<br />Ci riserviamo il diritto di aggiornare questi Termini e Condizioni in qualsiasi momento.</p>
                        <p>10. Contatti<br />Per assistenza ordini o reclami:<br />📧 support@heritagewhiskyreserve.it<br />📞 +39 06 12345678</p>
                        <button type="button" onClick={closeModal}>Chiudi</button>
                    </div>
                </div>
            )}

            {/* Bottone completa l'ordine */}
            <button
                type="submit"
                disabled={loading || cart.length === 0 || !termsAccepted}
            >
                {loading ? "Invio in corso..." : "Completa l'ordine"}
            </button>
        </form>
    );
}

export default OrderForm;