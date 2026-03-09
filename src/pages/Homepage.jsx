import HeroSection from "../components/HeroSection"
import WhiskyCard from "../components/WhiskyCard"
import whiskies from "../data/whiskies"

import '../valeria.css'

function Homepage() {

  // filtro solo quelli in sconto
  const onSaleWhiskies = whiskies.filter(
    whisky => whisky.discount > 0
  )

  return (
    <>
      <HeroSection />

      <div className="on-sale-section">
        <h2 className="on-sale-title">
          I NOSTRI PRODOTTI IN PROMOZIONE
        </h2>

        <div className="cards-container">

          {
            onSaleWhiskies.map(whisky => (
              <WhiskyCard
                key={whisky.slug}
                whisky={whisky}
              />
            ))
          }

        </div>
      </div>
    </>
  )
}

export default Homepage