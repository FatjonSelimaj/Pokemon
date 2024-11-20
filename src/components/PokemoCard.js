import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = ({ name, url }) => {
    const [details, setDetails] = useState(null);

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
        <div style={{
            backgroundColor: randomBackground(),
            borderRadius: "15px",
            padding: "15px",
            width: "240px",
            textAlign: "center",
            color: "#333",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
        >
            <img
                src={details.sprites.front_default}
                alt={name}
                style={{ width: "140px", height: "140px", marginBottom: "10px" }}
            />
            <h3 style={{
                fontSize: "1.5rem",
                color: "#333",
                margin: "10px 0",
                textShadow: "1px 1px #fff",
            }}>
                {name.toUpperCase()}
            </h3>
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
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px"
            }}>
                <p style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    padding: "5px 10px",
                    borderRadius: "8px",
                }}>
                    <strong>Altezza:</strong> {details.height}
                </p>
                <p style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    padding: "5px 10px",
                    borderRadius: "8px",
                }}>
                    <strong>Peso:</strong> {details.weight}
                </p>
            </div>
        </div>
    );
};

export default PokemonCard;
