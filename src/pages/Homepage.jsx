import HeroSection from "../components/HeroSection"
import '../valeria.css'
function Homepage() {

  return (
    <>
      <HeroSection />
      <div className="on-sale-section">
        <h2 className="on-sale-title">I NOSTRI PRODOTTI IN PROMOZIONE</h2>

        <div className="cards-container">
          <div className="whisky-card-mockup"></div>
          <div className="whisky-card-mockup"></div>
          <div className="whisky-card-mockup"></div>
          <div className="whisky-card-mockup"></div>
        </div>
      </div>
    </>

  )
}

export default Homepage
