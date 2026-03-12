import '../Valeria.css'
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <Link to={"/"}> <button className='notf-btn'>Torna alla Home</button></Link>
            <h1>404</h1>
            <h2>Oops! Sembra che questo barile sia vuoto.</h2>
            <p>A quanto pare la pagina che stavi cercando non esiste. Ma non rimanere a bocca asciutta.</p>
           <Link to={"/"}><img src="../public/imgs/not-found-nobg.png" alt="Bicchiere vuoto" /></Link> 
           
        </div>
    );
}

export default NotFoundPage;