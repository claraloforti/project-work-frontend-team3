import { useState, useEffect } from "react";
import axios from "axios";
import WhiskyCard from "../components/WhiskyCard.jsx";
import "../clara.css";

function WhiskyPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [promoFilter, setPromoFilter] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [whiskies, setWhiskies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carica le categorie dal BE
    useEffect(() => {
        axios.get("http://localhost:3000/api/products/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Errore nel caricamento categorie:", err));
    }, []);

    // Ricerca prodotti
    const handleSearch = () => {
        if (!searchTerm && !categoryFilter && !promoFilter && !sortOption) {
            setWhiskies([]);
            return;
        }

        setLoading(true);

        const params = {
            searchTerm: searchTerm || undefined,
            category: categoryFilter || undefined,
            promo: promoFilter ? "true" : undefined,
            sort: sortOption || undefined,
        };

        axios.get("http://localhost:3000/api/products", { params })
            .then(res => setWhiskies(res.data))
            .catch(err => {
                console.error("Errore nel caricamento prodotti:", err);
                setWhiskies([]);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="whisky-page container">
            <h1>La nostra collezione</h1>

            {/* Barra ricerca + Bottone Cerca */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Toggle griglia/lista */}
            <div className="view-toggle">
                <i className="fa-solid fa-grip" onClick={() => setViewMode("grid")}></i>
                <i className="fa-solid fa-bars" onClick={() => setViewMode("list")}></i>
            </div>

            {/* Lista prodotti */}
            {loading && <p>Caricamento...</p>}
            <div className={`cards-container ${viewMode}`}>
                {!loading && whiskies.length === 0 && <p>Avvia la ricerca per vedere i prodotti.</p>}
                {whiskies.map((w) => (
                    <WhiskyCard key={w.slug} whisky={w} />
                ))}
            </div>
        </div>
    );
}

export default WhiskyPage;