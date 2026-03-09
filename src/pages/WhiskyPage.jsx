import { useState } from "react";
import whiskies from "../data/whiskies";
import WhiskyCard from "../components/WhiskyCard";
import "../clara.css";

function WhiskyPage() {
    // Stato per input di ricerca
    const [searchTerm, setSearchTerm] = useState("");
    // Stato per filtro categorie    
    const [categoryFilter, setCategoryFilter] = useState("");

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

            {/* Card whisky */}
            <div className="cards-container">
                {filteredWhiskies.length > 0 ? (
                    filteredWhiskies.map(w => (
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