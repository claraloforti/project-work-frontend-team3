import '../valeria.css'

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
        <button className='hero-btn'>SCOPRI LA NOSTRA CANTINA</button>
        </div>
      </div>


    </>
  )
}

export default HeroSection
