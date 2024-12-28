import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonTCGPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null); // Stato per la carta selezionata
    const limit = 30;

    useEffect(() => {
        const fetchPokemonTCGData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${limit}`
                );
                setCards((prev) => [...prev, ...response.data.data]);
            } catch (error) {
                console.error("Errore durante il caricamento delle carte Pokémon TCG:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonTCGData();
    }, [page]);

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const loadMoreCards = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const translateInfo = (field, value) => {
        const translations = {
            types: {
                Fire: "Fuoco",
                Water: "Acqua",
                Grass: "Erba",
                Electric: "Elettrico",
                Psychic: "Psico",
                Dark: "Buio",
                Fighting: "Lotta",
                Normal: "Normale",
                Steel: "Acciaio",
                Dragon: "Drago",
                Fairy: "Folletto",
                Ice: "Ghiaccio",
                Ground: "Terra",
                Flying: "Volante",
                Bug: "Coleottero",
                Ghost: "Spettro",
                Rock: "Roccia",
                Poison: "Veleno",
            },
            rarity: {
                Common: "Comune",
                Uncommon: "Non Comune",
                Rare: "Rara",
                "Rare Holo": "Rara Olografica",
                "Rare Holo GX": "Rara Olografica GX",
                "Rare Secret": "Rara Segreta",
                "Rare Ultra": "Rara Ultra",
            },
        };

        return translations[field]?.[value] || value;
    };

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
                        width: "100%",
                        maxWidth: "300px",
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
                        key={card.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "8px",
                            textAlign: "center",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedCard(card)} // Mostra l'overlay
                    >
                        <img
                            src={card.images.small}
                            alt={card.name}
                            style={{ width: "100%", borderRadius: "5px" }}
                        />
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

            {/* Overlay per i dettagli della carta */}
            {selectedCard && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#222",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "90%",
                            maxWidth: "600px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                            overflowY: "auto",
                            maxHeight: "90vh",
                            textAlign: "center",
                        }}
                    >
                        <button
                            onClick={() => setSelectedCard(null)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#ff4d4d",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            &times;
                        </button>
                        <img
                            src={selectedCard.images.large}
                            alt={selectedCard.name}
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                borderRadius: "5px",
                                marginBottom: "20px",
                            }}
                        />
                        <h2>{selectedCard.name}</h2>
                        <p>
                            <strong>Serie:</strong> {selectedCard.set.name}
                        </p>
                        <p>
                            <strong>Tipo:</strong>{" "}
                            {selectedCard.types?.map((type) =>
                                translateInfo("types", type)
                            ).join(", ") || "Sconosciuto"}
                        </p>
                        <p>
                            <strong>Rarità:</strong>{" "}
                            {translateInfo("rarity", selectedCard.rarity || "Sconosciuta")}
                        </p>
                        <p>
                            <strong>HP:</strong> {selectedCard.hp || "N/A"}
                        </p>
                        <p>
                            <strong>Artista:</strong> {selectedCard.artist || "Non disponibile"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonTCGPage;
