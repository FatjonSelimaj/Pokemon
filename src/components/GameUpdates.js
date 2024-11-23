import React, { useState, useEffect } from "react";
import axios from "axios";

const GameUpdates = () => {
    const [games, setGames] = useState([]); // Inizializza come array
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Stato per la ricerca
    const [offset, setOffset] = useState(0); // Stato per la paginazione
    const limit = 20; // Numero di giochi caricati per volta

    // Fetch giochi dall'API FreeToGame
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/games`);
                // Assicurati che la risposta sia un array
                if (Array.isArray(response.data)) {
                    setGames(response.data);
                } else {
                    console.error("La risposta non è un array:", response.data);
                    setGames([]);
                }
            } catch (error) {
                console.error("Errore durante il fetch dei giochi:", error.message);
                setGames([]); // Imposta come array vuoto in caso di errore
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Funzione per gestire la ricerca
    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    // Filtra i giochi in base alla ricerca
    const filteredGames = games
        .filter((game) => game.title?.toLowerCase().includes(search)) // Assicurati che `title` esista
        .slice(0, offset + limit); // Carica progressivamente i giochi

    // Funzione per caricare più giochi (infinite scroll)
    const loadMoreGames = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Barra di ricerca */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Cerca Giochi..."
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

            {/* Lista dei giochi */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {filteredGames.map((game, index) => (
                    <div
                        key={`${game.id || index}`} // Chiave unica
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={game.thumbnail}
                            alt={game.title}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                        />
                        <h3 style={{ margin: "10px 0" }}>{game.title}</h3>
                        <p>
                            <strong>Genere:</strong> {game.genre}
                        </p>
                        <p>
                            <strong>Piattaforma:</strong> {game.platform}
                        </p>
                        <a
                            href={game.game_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: "none",
                                color: "#007bff",
                                fontWeight: "bold",
                            }}
                        >
                            Gioca ora
                        </a>
                    </div>
                ))}
            </div>

            {/* Caricamento progressivo */}
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#007bff" }}>Caricamento in corso...</p>
            ) : (
                filteredGames.length < games.length && ( // Mostra il bottone solo se ci sono più giochi da caricare
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button
                            onClick={loadMoreGames}
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
                            Carica altri Giochi
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default GameUpdates;
