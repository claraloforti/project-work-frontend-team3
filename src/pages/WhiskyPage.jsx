import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import WhiskyCard from "../components/WhiskyCard.jsx";


function WhiskyPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
    const [promoFilter, setPromoFilter] = useState(searchParams.get("promo") === "true");
    const [sortOption, setSortOption] = useState(searchParams.get("sort") || "");
    const [viewMode, setViewMode] = useState("grid");
    const [whiskies, setWhiskies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Carica le categorie dal BE
    useEffect(() => {
        axios.get("http://localhost:3000/api/products/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Errore nel caricamento categorie:", err));
    }, []);

    // Ricerca prodotti
    const handleSearch = () => {
        setLoading(true);

        // Se tutto è vuoto, svuota i risultati
        if (!searchTerm && !categoryFilter && !promoFilter && !sortOption) {
            setWhiskies([]);
            setHasSearched(false);
            setLoading(false);
            return;
        }

        const params = {
            searchTerm: searchTerm || undefined,
            category: categoryFilter || undefined,
            promo: promoFilter ? "true" : undefined,
            sort: sortOption || undefined,
        };

        // Aggiorna URL con i parametri di ricerca
        setSearchParams({
            search: searchTerm || "",
            category: categoryFilter || "",
            promo: promoFilter ? "true" : "",
            sort: sortOption || ""
        });

        axios.get("http://localhost:3000/api/products", { params })
            .then(res => {
                setWhiskies(res.data);
                setHasSearched(true);
            })
            .catch(err => {
                console.error("Errore nel caricamento prodotti:", err);
                setWhiskies([]);
                setHasSearched(true);
            })
            .finally(() => setLoading(false));
    };

    // FILTRI AUTOMATICI (categoria, promo, sort)
    useEffect(() => {
        // Se non ci sono filtri e la barra di ricerca è vuota, svuota i risultati
        if (!categoryFilter && !promoFilter && !sortOption && !searchTerm) {
            setWhiskies([]);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);

            // Aggiorna URL quando cambiano i filtri
            setSearchParams({
                search: searchTerm || "",
                category: categoryFilter || "",
                promo: promoFilter ? "true" : "",
                sort: sortOption || ""
            });

            axios.get("http://localhost:3000/api/products", {
                params: {
                    searchTerm: searchTerm || undefined,
                    category: categoryFilter || undefined,
                    promo: promoFilter ? "true" : undefined,
                    sort: sortOption || undefined,
                },
            })
                .then(res => setWhiskies(res.data))
                .catch(err => {
                    console.error("Errore nel caricamento prodotti:", err);
                    setWhiskies([]);
                })
                .finally(() => setLoading(false));
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [categoryFilter, promoFilter, sortOption]);

    return (
        <div className="whisky-page container">
            <h1>La nostra collezione</h1>

            {/* Barra ricerca + Bottone cerca */}
            {/* Bottone cerca funziona anche tramite invio dalla tastiera */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setHasSearched(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    className="search-input"
                />
                <button
                    onClick={handleSearch}
                    className="search-btn"
                    disabled={!searchTerm && !categoryFilter && !promoFilter && !sortOption}
                >
                    Cerca
                </button>
            </div>

            {/* Filtro promo */}
            <div className="promo-filter">
                <label>
                    <input
                        type="checkbox"
                        checked={promoFilter}
                        onChange={(e) => setPromoFilter(e.target.checked)}
                    />
                    In promozione
                </label>
            </div>

            {/* Filtro categoria */}
            <div className="categories-filter">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Tutte le categorie</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Ordinamento */}
            <div className="sort-options">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Ordina per...</option>
                    <option value="name-asc">Nome: A → Z</option>
                    <option value="name-desc">Nome: Z → A</option>
                    <option value="price-asc">Prezzo: dal più basso</option>
                    <option value="price-desc">Prezzo: dal più alto</option>
                    <option value="recent">Più recenti</option>
                </select>
            </div>

            {/* Pulsante Reset Filtri */}
            <div className="reset-filters">
                <button
                    onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("");
                        setPromoFilter(false);
                        setSortOption("");
                        setWhiskies([]);
                        setHasSearched(false);
                    }}
                    className="reset-btn"
                >
                    Reset Filtri
                </button>
            </div>

            {/* Toggle griglia/lista */}
            <div className="view-toggle">
                <i className="fa-solid fa-grip" onClick={() => setViewMode("grid")}></i>
                <i className="fa-solid fa-bars" onClick={() => setViewMode("list")}></i>
            </div>

            {/* Lista prodotti */}
            {loading && <p>Caricamento...</p>}
            <div className={`cards-container ${viewMode}`}>
                {/* Messaggio iniziale */}
                {!loading && !hasSearched && whiskies.length === 0 && (
                    <p>Avvia la ricerca per vedere i prodotti.</p>
                )}
                {/* Nessun prodotto trovato: solo se hai cercato e risultati vuoti */}
                {!loading && hasSearched && whiskies.length === 0 && (
                    <p>Nessun prodotto trovato.</p>
                )}
                {whiskies.map((w) => (
                    <WhiskyCard key={w.slug} whisky={w} />
                ))}
            </div>
        </div>
    );
}

export default WhiskyPage;