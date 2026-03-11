import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import WhiskyCard from "../components/WhiskyCard";
import axios from "axios";
import '../valeria.css';

function Homepage() {
  const [newProducts, setNewProducts] = useState([]);
  const [onSaleWhiskies, setOnSaleWhiskies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Prendo i 4 prodotti più recenti
    axios.get("http://localhost:3000/api/products", { params: { sort: "recent" } })
      .then(res => {
        const allProducts = res.data;
        setNewProducts(allProducts.slice(0, 4));
      })
      .catch(err => {
        console.error("Errore nel caricamento nuovi prodotti:", err);
        setNewProducts([]);
      });

    // Prendo solo i prodotti in promozione
    axios.get("http://localhost:3000/api/products", { params: { promo: "true" } })
      .then(res => {
        setOnSaleWhiskies(res.data);
      })
      .catch(err => {
        console.error("Errore nel caricamento prodotti in promo:", err);
        setOnSaleWhiskies([]);
      })
      .finally(() => setLoading(false));

  }, []);

  return (
    <>
      <HeroSection />

      {/* NUOVI ARRIVI */}
      <section className="new-products">
        <h2 className="new-title">ULTIMI ARRIVI IN CANTINA</h2>
        <div className="cards-container">
          {newProducts.map(whisky => (
            <WhiskyCard key={whisky.slug} whisky={whisky} />
          ))}
        </div>
      </section>

      {/* PRODOTTI IN PROMOZIONE */}
      <section className="on-sale-section">
        <h2 className="on-sale-title">I NOSTRI PRODOTTI IN PROMOZIONE</h2>
        <div className="cards-container">
          {onSaleWhiskies.map(whisky => (
            <WhiskyCard key={whisky.slug} whisky={whisky} />
          ))}
        </div>
      </section>

      {loading && <p>Caricamento prodotti...</p>}
    </>
  );
}

export default Homepage;