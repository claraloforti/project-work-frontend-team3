import '../valeria.css'
import { Link } from 'react-router-dom'
function HeroSection() {

  return (
    <>
      <div className='hero-card'>
        <video
          src="../videos/fumo-whiskey.mp4"
          autoPlay
          muted
          loop playsInline
          className='hero-video'
        />
        <div className='hero-overlay'>
          <h1>L'eredità del gusto, distillata.</h1>
          <Link to="/whisky" className='hero-btn'> SCOPRI LA NOSTRA CANTINA </Link>
        </div>
      </div>


    </>
  )
}

export default HeroSection
