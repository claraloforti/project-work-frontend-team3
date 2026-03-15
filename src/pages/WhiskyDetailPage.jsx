import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WhiskyDetailCard from "../components/WhiskyDetailCard";
import NotFoundPage from "./NotFoundPage";

function WhiskyDetailPage() {

    const { slug } = useParams();

    const [whisky, setWhisky] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/api/products/${slug}`)
            .then(res => {
                setWhisky(res.data);
            })
            .catch(err => {
                if (err.response?.status === 404) {
                    setNotFound(true);
                } else {
                    console.error(err);
                }
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <p>Caricamento...</p>;

    if (notFound) return <NotFoundPage />;



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