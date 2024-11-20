import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemoCard";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30");
                console.log("Risultati API:", response.data.results); // Logga i dati per verificare
                setPokemon(response.data.results);
            } catch (error) {
                console.error("Errore durante il fetch dei Pokémon:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);


    if (loading) return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#007bff" }}>Caricamento in corso...</p>;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "20px" }}>
            {pokemon.map((poke, index) => {
                console.log("Oggetto Pokémon:", poke); // Aggiungi un log per ogni Pokémon
                return <PokemonCard key={index} name={poke.name} url={poke.url} />;
            })}
        </div>
    );

};

export default PokemonList;
