import { useParams, Link } from "react-router-dom";
import whiskies from "../data/whiskies";
import WhiskyDetailCard from "../components/WhiskyDetailCard";

function WhiskyDetailPage() {

    const { slug } = useParams();

    const whisky = whiskies.find(w => w.slug === slug);

    if (!whisky) {
        return <p>Prodotto non trovato</p>;
    }

    return (
        <div className="container">
            <WhiskyDetailCard whisky={whisky} />

            {/* Bottone torna ai prodotti */}
            <Link to="/whisky">
                <button className="back-btn">
                    ← TORNA ALLA COLLEZIONE
                </button>
            </Link>
        </div>
    );
}

export default WhiskyDetailPage;