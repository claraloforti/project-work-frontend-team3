import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WhiskyDetailCard from "../components/WhiskyDetailCard";

function WhiskyDetailPage() {

    const { slug } = useParams();

    const [whisky, setWhisky] = useState(null);

    useEffect(() => {

        axios.get(`http://localhost:3000/api/products/${slug}`)
            .then(res => {
                setWhisky(res.data);
            })
            .catch(err => {
                console.error(err);
            });

    }, [slug]);

    if (!whisky) {
        return (
            <div className="product-not-found">
                <p>Prodotto non trovato.</p>

                <Link to="/whisky">
                    <button className="back-btn">
                        ← TORNA ALLA COLLEZIONE
                    </button>
                </Link>
            </div>
        );
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