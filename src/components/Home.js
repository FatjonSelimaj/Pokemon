import React from "react";
import { Link } from "react-router-dom";

const categories = [
    "fuoco", "acqua", "terra", "volante", "erba", "elettro", "ghiaccio",
    "veleno", "psico", "spettro", "drago", "buio", "acciaio", "folletto",
    "normale", "lotta", "coleottero", "roccia",
];

const Home = () => {
    return (
        <div
            style={{
                padding: "20px",
                userSelect: "none", // Impedisce la selezione accidentale
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    userSelect: "none", // Impedisce la selezione del titolo
                }}
            >
                Seleziona una Categoria Pokémon
            </h1>
            <nav
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "10px",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                {categories.map((category) => (
                    <Link
                        key={category}
                        to={`/categorie/${category}`}
                        style={{
                            textDecoration: "none",
                            backgroundColor: "#2a75bb",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            outline: "none", // Rimuove il bordo di focus
                        }}
                        tabIndex={-1} // Disabilita il focus
                    >
                        {category.toUpperCase()}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Home;
