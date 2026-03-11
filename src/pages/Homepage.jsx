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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 1️⃣ Prendo tutti i prodotti ordinati per più recenti → nuovi arrivi
        const resAll = await axios.get("http://localhost:3000/api/products", {
          params: { sort: "recent" }
        });
        const allProducts = resAll.data;
        setNewProducts(allProducts.slice(0, 4));

        // 2️⃣ Prendo solo i prodotti in promo → back-end filtra discount > 0
        const resPromo = await axios.get("http://localhost:3000/api/products", {
          params: { promo: "true" }
        });
        setOnSaleWhiskies(resPromo.data);

      } catch (err) {
        console.error(err);
        setNewProducts([]);
        setOnSaleWhiskies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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