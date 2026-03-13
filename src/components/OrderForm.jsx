import { useState } from "react";
import axios from "axios";
import "../clara.css";

function OrderForm({ cart, totalPrice }) {
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
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Aggiorna lo stato quando l'utente scrive
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    // Handler per il checkbox
    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    // Handler per il modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Invia ordine al backend
    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Il carrello è vuoto!");
            return;
        }

        if (!termsAccepted) {
            alert("Accetta i termini e condizioni per procedere.");
            return;
        }

        setLoading(true);

        // Payload con dati dell'ordine
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
                }
            })
            .catch(err => {
                console.error("Errore durante l'invio dell'ordine:", err);
                alert("Si è verificato un errore durante l'invio dell'ordine. Riprova più tardi.");
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
                    pattern="^\+?[0-9]{6,15}$"
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
                    pattern="^\+?[0-9]{6,15}$"
                />
            </div>

            {/* Totale ordine */}
            <p className="total-order-price"><strong>Totale ordine: {totalPrice.toFixed(2)} €</strong></p>

            {/* Checkbox termini e condizioni */}
            <div className="terms-checkbox">
                <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                />
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

                        <p>1. Accettazione dei Termini<br />
                            Effettuando un ordine confermi di aver letto, compreso e accettato questi Termini e Condizioni, la nostra Informativa sulla Privacy e tutte le politiche correlate.</p>

                        <p>2. Descrizione dei Prodotti<br />
                            Vendiamo whisky pregiati, edizioni limitate e prodotti correlati. Ogni prodotto include una descrizione accurata, immagini e prezzo. I prezzi pubblicati includono IVA, ma le spese di spedizione vengono aggiunte al checkout.</p>

                        <p>3. Requisiti Minimi<br />
                            Per acquistare su questo sito devi essere legalmente maggiorenne nel tuo paese (generalmente 18+ o 21+ in base alla legge locale) e avere il diritto e la capacità di stipulare contratti vincolanti.</p>

                        <p>4. Ordini e Pagamenti<br />
                            Quando confermi un ordine, autorizzi il pagamento immediato tramite i metodi accettati. Ci riserviamo il diritto di rifiutare ordini per motivi ragionevoli, tra cui errori di prezzo o disponibilità.</p>

                        <p>5. Consegna e Spedizione<br />
                            Cerchiamo di spedire gli ordini il prima possibile. Le tempistiche di consegna variano in base alla località e al corriere. Non siamo responsabili per ritardi causati da terzi.</p>

                        <p>6. Diritto di Recesso<br />
                            Hai il diritto di recedere dall’acquisto entro 14 giorni dalla ricezione, conformemente alla normativa sui contratti a distanza. Per esercitare questo diritto, contattaci tramite email entro il termine e segui le istruzioni di reso.</p>

                        <p>7. Garanzia e Responsabilità<br />
                            I nostri prodotti sono coperti dalla garanzia legale di conformità. Tuttavia non ci assumiamo responsabilità per danni indiretti dovuti all’uso dei prodotti. Il nostro limite di responsabilità è pari al valore totale dell’ordine.</p>

                        <p>8. Proprietà Intellettuale<br />
                            Contenuti, immagini, marchi e descrizioni presenti su questo sito sono di nostra proprietà o concessi in licenza. È vietata la copia o riproduzione senza autorizzazione.</p>

                        <p>9. Modifiche del Contratto<br />
                            Ci riserviamo il diritto di aggiornare questi Termini e Condizioni in qualsiasi momento. Gli aggiornamenti saranno efficaci dal momento della loro pubblicazione sul sito.</p>

                        <p>10. Contatti<br />
                            Per assistenza ordini o reclami:<br />
                            📧 support@heritagewhiskyreserve.it<br />
                            📞 +39 06 12345678
                        </p>

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