import { useState } from "react";
import whiskies from "../data/whiskies";
import WhiskyCard from "../components/WhiskyCard";
import "../clara.css";

function WhiskyPage() {
    // Stato per input di ricerca
    const [searchTerm, setSearchTerm] = useState("");
    // Stato per filtro categorie    
    const [categoryFilter, setCategoryFilter] = useState("");
    // Stato per visualizzazione in griglia di default
    const [viewMode, setViewMode] = useState("grid");
    // Stato per opzioni di ordinamento 
    const [sortOption, setSortOption] = useState("");

    // Lista categorie
    const categories = [];
    whiskies.forEach(w => {
        if (!categories.includes(w.category)) {
            categories.push(w.category);
        }
    });

    // Filtra i whisky in base a input e categoria
    const filteredWhiskies = whiskies.filter((w) => {
        const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? w.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    // Ordina in base alla scelta dell'utente
    const sortedWhiskies = [...filteredWhiskies].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "name-asc") return a.name.localeCompare(b.name);
        if (sortOption === "name-desc") return b.name.localeCompare(a.name);
        if (sortOption === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });

    return (
        <div className="whisky-page container">
            <h1>La nostra collezione</h1>

            {/* Barra ricerca */}
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Opzioni di ordinamento per prezzo, nome, recenti */}
            <div className="sort-options">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Ordina per...</option>
                    <option value="price-asc">Prezzo: dal più basso</option>
                    <option value="price-desc">Prezzo: dal più alto</option>
                    <option value="name-asc">Nome: A → Z</option>
                    <option value="name-desc">Nome: Z → A</option>
                    <option value="recent">Più recenti</option>
                </select>
            </div>
            {/* Filtro categorie */}
            <div className="categories-filter">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Tutte le categorie</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Toggle visualizzazione griglia o lista */}
            <div className="view-toggle">
                <i
                    className="fa-solid fa-grip"
                    onClick={() => setViewMode("grid")}
                ></i>

                <i
                    className="fa-solid fa-bars"
                    onClick={() => setViewMode("list")}
                ></i>
            </div>

            {/* Card whisky */}
            <div className={`cards-container ${viewMode}`}>
                {sortedWhiskies.length > 0 ? (
                    sortedWhiskies.map(w => (
                        <WhiskyCard key={w.slug} whisky={w} />
                    ))
                ) : (
                    <p>Nessun prodotto trovato.</p>
                )}
            </div>
        </div>
    )
}

export default WhiskyPage;