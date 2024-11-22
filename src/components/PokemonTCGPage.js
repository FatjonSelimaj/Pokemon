import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonTCGPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Stato per la ricerca
    const [page, setPage] = useState(1); // Stato per la paginazione
    const limit = 30; // Numero di carte per pagina

    // Fetch delle carte Pokémon TCG
    useEffect(() => {
        const fetchPokemonTCGData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${limit}`
                );
                setCards((prev) => [...prev, ...response.data.data]); // Aggiungi nuove carte alla lista esistente
            } catch (error) {
                console.error("Errore durante il caricamento delle carte Pokémon TCG:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonTCGData();
    }, [page]);

    // Funzione per gestire la ricerca
    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    // Funzione per caricare più carte (paginazione)
    const loadMoreCards = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Filtra le carte in base alla ricerca
    const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(search)
    );

    return (
        <div style={{ padding: "20px" }}>
            {/* Barra di ricerca */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Cerca Carte Pokémon..."
                    value={search}
                    onChange={handleSearch}
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        width: "100%", // Larghezza dinamica
                        maxWidth: "300px", // Massima larghezza su schermi grandi
                        fontSize: "1rem",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </div>

            {/* Lista delle carte */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                }}
            >
                {filteredCards.map((card) => (
                    <div
                    key={`${card.id}-${Math.random()}`} // Genera una chiave unica combinando id con un valore casuale
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "8px",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >                
                       <img src={card.images.small} alt={card.name} style={{ width: "100%", borderRadius: "5px" }} />
                        <h3 style={{ margin: "10px 0" }}>{card.name}</h3>
                        <p>Serie: {card.set.name}</p>
                    </div>
                ))}
            </div>

            {/* Caricamento progressivo */}
            {loading ? (
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        color: "#007bff",
                    }}
                >
                    Caricamento in corso...
                </p>
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={loadMoreCards}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#ffcb05",
                            color: "#2a75bb",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        Carica altre Carte
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonTCGPage;
