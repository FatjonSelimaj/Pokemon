import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemoCard";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Stato per la ricerca
    const [offset, setOffset] = useState(0); // Stato per la paginazione
    const limit = 30; // Numero di Pokémon caricati per volta

    // Fetch dei Pokémon
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
                setPokemon((prev) => [...prev, ...response.data.results]); // Aggiungi nuovi Pokémon alla lista esistente
            } catch (error) {
                console.error("Errore durante il fetch dei Pokémon:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [offset]);

    // Funzione per gestire la ricerca
    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    // Funzione per caricare più Pokémon (infinite scroll)
    const loadMorePokemon = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    // Filtra i Pokémon in base alla ricerca
    const filteredPokemon = pokemon.filter((poke) => poke.name.includes(search));

    return (
        <div style={{ padding: "20px" }}>
            {/* Barra di ricerca */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Cerca Pokémon..."
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

            {/* Lista dei Pokémon */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {filteredPokemon.map((poke, index) => (
                    <PokemonCard key={index} name={poke.name} url={poke.url} />
                ))}
            </div>

            {/* Caricamento progressivo */}
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#007bff" }}>Caricamento in corso...</p>
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={loadMorePokemon}
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
                        Carica altri Pokémon
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
