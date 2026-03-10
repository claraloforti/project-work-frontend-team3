import HeroSection from "../components/HeroSection"
import WhiskyCard from "../components/WhiskyCard"
import whiskies from "../data/whiskies"
import '../valeria.css'

function Homepage() {
  //filtro nuovi arrivi
  const newProducts = [...whiskies]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  // filtro solo quelli in saldo
  const onSaleWhiskies = whiskies.filter(
    whisky => whisky.discount > 0
  );

  return (
    <>
      <HeroSection />
      
      {/* SEZIONE NUOVI ARRIVI */}
      <section className="new-products">
        <h2 className="new-title">ULTIMI ARRIVI IN CANTINA</h2>
        <div className="cards-container">
          {newProducts.map((whisky) => (
            
            <WhiskyCard 
            key={whisky.slug}
             whisky={whisky} />
          ))}
        </div>
      </section>

      {/* SEZIONE PRODOTTI IN SALDO */}
      <section className="on-sale-section">
        <h2 className="on-sale-title">
          I NOSTRI PRODOTTI IN PROMOZIONE
        </h2>

        <div className="cards-container">
          {onSaleWhiskies.map(whisky => (
            <WhiskyCard
              key={whisky.slug}
              whisky={whisky}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Homepage