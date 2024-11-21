import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const PokemonCard = ({ name, url }) => {
    const [details, setDetails] = useState(null);
    const [species, setSpecies] = useState(null);
    const [evolutions, setEvolutions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!url) return;
            try {
                const response = await axios.get(url);
                setDetails(response.data);

                // Fetch informazioni sulla specie
                const speciesResponse = await axios.get(response.data.species.url);
                setSpecies(speciesResponse.data);

                // Fetch della catena evolutiva
                const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
                const chain = extractEvolutionChain(evolutionResponse.data.chain);
                setEvolutions(chain);
            } catch (error) {
                console.error(`Errore durante il fetch dei dettagli di ${name}:`, error.message);
            }
        };

        fetchDetails();
    }, [url, name]);

    // Blocca lo scroll della pagina quando l'overlay è visibile
    useEffect(() => {
        document.body.style.overflow = showDetails ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showDetails]);

    // Estrai la catena evolutiva
    const extractEvolutionChain = (chain) => {
        const evolutions = [];
        let current = chain;
        while (current) {
            evolutions.push(current.species.name);
            current = current.evolves_to[0];
        }
        return evolutions;
    };

    if (!details || !species) return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#ff6f61" }}>Caricamento dettagli...</p>;

    // Traduci i tipi
    const traduciTipo = (tipo) => {
        const tipiInItaliano = {
            normal: "Normale",
            fire: "Fuoco",
            water: "Acqua",
            grass: "Erba",
            electric: "Elettrico",
            ice: "Ghiaccio",
            fighting: "Lotta",
            poison: "Veleno",
            ground: "Terra",
            flying: "Volante",
            psychic: "Psico",
            bug: "Coleottero",
            rock: "Roccia",
            ghost: "Spettro",
            dragon: "Drago",
            dark: "Buio",
            steel: "Acciaio",
            fairy: "Folletto",
        };
        return tipiInItaliano[tipo] || tipo;
    };

    // Traduzione della descrizione
    const descrizione = species.flavor_text_entries.find((entry) => entry.language.name === "it")?.flavor_text || "Descrizione non disponibile.";

    return (
        <div style={{ position: "relative", textAlign: "center" }}>
            {/* Card principale */}
            <div
                style={{
                    backgroundColor: "#FFEE93",
                    borderRadius: "15px",
                    padding: "15px",
                    width: "240px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => setShowDetails(true)}
            >
                <img
                    src={details.sprites.front_default}
                    alt={name}
                    style={{ width: "140px", height: "140px", marginBottom: "10px" }}
                />
                <h3>{name.toUpperCase()}</h3>
                <p><strong>Tipo:</strong> {details.types.map(type => traduciTipo(type.type.name)).join(", ")}</p>
            </div>

            {/* Overlay dei dettagli */}
            {showDetails && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#fff",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        backgroundColor: "#222",
                        borderRadius: "15px",
                        padding: "20px",
                        width: "90%",
                        maxWidth: "600px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    }}>
                        <button
                            onClick={() => setShowDetails(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                style={{
                                    fontSize: "2rem",
                                    color: "#ff4d4d",
                                }}
                            />
                        </button>
                        <h2>{details.name.toUpperCase()}</h2>
                        <img src={details.sprites.other["official-artwork"].front_default} alt={details.name} style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }} />
                        <p><strong>Descrizione:</strong> {descrizione}</p>
                        <p><strong>Esperienza Base:</strong> {details.base_experience}</p>
                        <p><strong>Altezza:</strong> {(details.height * 0.1).toFixed(2)} m</p>
                        <p><strong>Peso:</strong> {(details.weight * 0.1).toFixed(2)} kg</p>
                        <p><strong>Statistiche:</strong></p>
                        <ul>
                            {details.stats.map(stat => (
                                <li key={stat.stat.name}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</li>
                            ))}
                        </ul>
                        <p><strong>Abilità:</strong> {details.abilities.map(ability => ability.ability.name).join(", ")}</p>
                        <p><strong>Evoluzioni:</strong> {evolutions.join(" → ")}</p>
                        <p><strong>Habitat:</strong> {species.habitat?.name || "Sconosciuto"}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;
