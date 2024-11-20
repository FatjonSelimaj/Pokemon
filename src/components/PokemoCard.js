import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const PokemonCard = ({ name, url }) => {
    const [details, setDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // Stato per mostrare/nascondere i dettagli

    useEffect(() => {
        const fetchDetails = async () => {
            if (!url) {
                console.error("URL non valido o non definito:", url);
                return;
            }
            try {
                const response = await axios.get(url);
                setDetails(response.data);
            } catch (error) {
                console.error(`Errore durante il fetch dei dettagli di ${name}:`, error.message);
            }
        };

        fetchDetails();
    }, [url, name]);

    if (!details) return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#ff6f61" }}>Caricamento dettagli...</p>;

    // Genera un colore di sfondo casuale per ogni card
    const randomBackground = () => {
        const colors = ["#FFEE93", "#FFA69E", "#AAE3F5", "#C8A2C8", "#B1E693", "#FF9CEE"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div style={{ position: "relative", textAlign: "center" }}>
            {/* Card principale */}
            <div
                style={{
                    backgroundColor: randomBackground(),
                    borderRadius: "15px",
                    padding: "15px",
                    width: "240px",
                    textAlign: "center",
                    color: "#333",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                }}
                onClick={() => setShowDetails(true)} // Mostra i dettagli al clic
            >
                <img
                    src={details.sprites.front_default}
                    alt={name}
                    style={{ width: "140px", height: "140px", marginBottom: "10px" }}
                />
                <h3>{name.toUpperCase()}</h3>
                <p style={{
                    margin: "5px 0",
                    fontSize: "1rem",
                    color: "#444",
                    fontWeight: "bold",
                    backgroundColor: "#ffffffaa",
                    padding: "5px",
                    borderRadius: "8px",
                    display: "inline-block"
                }}>
                    <strong>Tipo:</strong> {details.types.map(type => type.type.name).join(", ")}
                </p>
            </div>

            {/* Overlay dei dettagli */}
            {showDetails && (
                <div style={{
                    position: "fixed", // Copre l'intero schermo
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#fff",
                    padding: "20px",
                    zIndex: 1000, // Garantisce la priorità sopra altri elementi
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <h2>{details.name.toUpperCase()}</h2>
                        <img
                            src={details.sprites.other["official-artwork"].front_default}
                            alt={details.name}
                            style={{ width: "250px", height: "250px", margin: "20px 0" }}
                        />
                        <p><strong>Base Experience:</strong> {details.base_experience}</p>
                        <p><strong>Altezza:</strong> {details.height}</p>
                        <p><strong>Peso:</strong> {details.weight}</p>
                        <p><strong>Abilità:</strong> {details.abilities.map(ability => ability.ability.name).join(", ")}</p>
                        <p><strong>Tipi:</strong> {details.types.map(type => type.type.name).join(", ")}</p>
                    </div>

                    {/* Icona di chiusura al centro in fondo */}
                    <button
                        onClick={() => setShowDetails(false)} // Nascondi i dettagli al clic
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            marginBottom: "20px",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            style={{
                                fontSize: "3rem", // Icona grande
                                color: "#ff4d4d", // Colore rosso acceso
                            }}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;
