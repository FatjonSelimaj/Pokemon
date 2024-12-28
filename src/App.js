import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";
import PokemonCategory from "./components/PokemonCategory";
import GameUpdates from "./components/GameUpdates";
import PokemonTCGPage from "./components/PokemonTCGPage";

const App = () => {
    return (
        <Router>
            <div style={{
                backgroundImage: "linear-gradient(45deg, #FFDD94, #FFA69E, #AAE3F5, #FF9CEE)",
                backgroundSize: "cover",
                minHeight: "100vh",
                padding: "20px",
                userSelect: "none",
            }}>
                {/* Barra di navigazione */}
                <nav style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    backgroundColor: "#ffcb05",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}>
                    <Link to="/" style={{
                        textDecoration: "none",
                        color: "#2a75bb",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}>
                        Home
                    </Link>
                    <Link to="/categorie" style={{
                        textDecoration: "none",
                        color: "#2a75bb",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}>
                        Categorie
                    </Link>
                    <Link to="/pokemontcg" style={{
                        textDecoration: "none",
                        color: "#2a75bb",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}>
                        Carte Pokémon
                    </Link>
                    <Link to="/giochi" style={{
                        textDecoration: "none",
                        color: "#2a75bb",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}>
                        Free-To-Play
                    </Link>
                </nav>

                <h1 style={{
                    textAlign: "center",
                    fontFamily: "Pokemon, sans-serif",
                    fontSize: "3rem",
                    color: "#333",
                    textShadow: "2px 2px #fff",
                    userSelect: "none",
                }}>
                    Pokémon Explorer
                </h1>

                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/categorie" element={<Home />} />
                    <Route path="/categorie/:type" element={<PokemonCategory />} />
                    <Route path="/pokemontcg" element={<PokemonTCGPage />} />
                    <Route path="/giochi" element={<GameUpdates />} />
                    <Route path="/card-categories" element={<PokemonTCGPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
