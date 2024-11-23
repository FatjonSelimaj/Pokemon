import React, { useState, useEffect } from "react";
import axios from "axios";

const GameUpdates = () => {
    const [games, setGames] = useState([]); // Tutti i giochi caricati
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Stato per la ricerca
    const [offset, setOffset] = useState(0); // Stato per la paginazione
    const limit = 20; // Numero di giochi caricati per volta

    // Fetch giochi dall'API RAWG
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.rawg.io/api/games?key=146eb233b6f141a3af57ddc969341fce&page_size=${limit}&page=${
                        offset / limit + 1
                    }`
                );
                setGames((prevGames) => [...prevGames, ...response.data.results]); // Aggiungi nuovi giochi alla lista esistente
            } catch (error) {
                console.error("Errore durante il fetch dei giochi:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [offset]);

    // Funzione per gestire la ricerca
    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    // Filtra i giochi in base alla ricerca
    const filteredGames = games.filter((game) =>
        game.name?.toLowerCase().includes(search) // RAWG utilizza `name` per il nome del gioco
    );

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
                        width: "100%",
                        maxWidth: "300px",
                        fontSize: "1rem",
                        textAlign: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </div>

            {/* Lista dei giochi */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {filteredGames.length > 0 ? (
                    filteredGames.map((game, index) => (
                        <div
                            key={`${game.id}-${index}`} // Chiave unica combinando id e indice
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                maxWidth: "300px",
                            }}
                        >
                            <img
                                src={game.background_image} // RAWG utilizza `background_image` per le immagini di sfondo
                                alt={game.name}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                            />
                            <h3 style={{ margin: "10px 0" }}>{game.name}</h3>
                            <p>
                                <strong>Generi:</strong>{" "}
                                {game.genres.map((genre) => genre.name).join(", ")} {/* RAWG utilizza `genres` */}
                            </p>
                            <p>
                                <strong>Rilasciato:</strong> {game.released} {/* Data di rilascio */}
                            </p>
                            <a
                                href={`https://rawg.io/games/${game.slug}`} // RAWG non fornisce URL diretto, ma puoi costruirlo con `slug`
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: "none",
                                    color: "#007bff",
                                    fontWeight: "bold",
                                }}
                            >
                                Maggiori informazioni
                            </a>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "red" }}>Nessun gioco trovato.</p>
                )}
            </div>

            {/* Caricamento progressivo */}
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#007bff" }}>Caricamento in corso...</p>
            ) : (
                !search && (
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
