import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "./PokemoCard";

const traduciTipoInInglese = (tipo) => {
    const tipiInglese = {
        fuoco: "fire",
        acqua: "water",
        terra: "ground",
        volante: "flying",
        erba: "grass",
        elettro: "electric",
        ghiaccio: "ice",
        veleno: "poison",
        psico: "psychic",
        spettro: "ghost",
        drago: "dragon",
        buio: "dark",
        acciaio: "steel",
        folletto: "fairy",
        normale: "normal",
        lotta: "fighting",
        coleottero: "bug",
        roccia: "rock",
    };
    return tipiInglese[tipo] || tipo;
};

const PokemonCategory = () => {
    const { type } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonByType = async () => {
            try {
                setLoading(true);
                const typeInEnglish = traduciTipoInInglese(type);
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeInEnglish}`);
                const pokemons = response.data.pokemon.map((p) => ({
                    name: p.pokemon.name,
                    url: p.pokemon.url,
                }));
                setPokemon(pokemons);
            } catch (error) {
                console.error(`Errore durante il fetch dei Pokémon per il tipo ${type}:`, error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonByType();
    }, [type]);

    return (
        <div
            style={{
                padding: "20px",
                userSelect: "none", // Evita la selezione accidentale
            }}
        >
            {/* Link per tornare alla pagina principale */}
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "#fff",
                        backgroundColor: "#2a75bb",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        marginRight: "10px",
                        outline: "none", // Rimuove eventuali bordi di focus
                    }}
                    tabIndex={-1} // Disabilita il focus
                >
                    Torna alla Home
                </Link>

                {/* Link per tornare alla lista di tutte le categorie */}
                <Link
                    to="/categorie"
                    style={{
                        textDecoration: "none",
                        color: "#fff",
                        backgroundColor: "#ffcb05",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        outline: "none", // Rimuove eventuali bordi di focus
                    }}
                    tabIndex={-1} // Disabilita il focus
                >
                    Torna alle Categorie
                </Link>
            </div>

            {/* Titolo della categoria */}
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    textTransform: "capitalize",
                    userSelect: "none", // Impedisce la selezione
                }}
            >
                Pokémon di Tipo {type.toUpperCase()}
            </h2>

            {/* Elenco dei Pokémon */}
            {loading ? (
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        color: "#007bff",
                        userSelect: "none", // Impedisce la selezione
                    }}
                >
                    Caricamento in corso...
                </p>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    {pokemon.length > 0 ? (
                        pokemon.map((poke) => (
                            <PokemonCard key={poke.name} name={poke.name} url={poke.url} />
                        ))
                    ) : (
                        <p
                            style={{
                                textAlign: "center",
                                color: "#ff6f61",
                                userSelect: "none", // Impedisce la selezione
                            }}
                        >
                            Nessun Pokémon trovato per questa categoria.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PokemonCategory;
