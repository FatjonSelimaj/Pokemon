import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import Home from "./components/Home";
import PokemonCategory from "./components/PokemonCategory";

const App = () => {
    return (
        <Router>
            <div style={{
                backgroundImage: "linear-gradient(45deg, #FFDD94, #FFA69E, #AAE3F5, #FF9CEE)",
                backgroundSize: "cover",
                minHeight: "100vh",
                padding: "20px",
            }}>
                {/* Barra di navigazione */}
                <nav style={{
                    display: "flex",
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
                </nav>

                <h1 style={{
                    textAlign: "center",
                    fontFamily: "Pokemon, sans-serif",
                    fontSize: "3rem",
                    color: "#333",
                    textShadow: "2px 2px #fff",
                }}>
                    Pokémon Explorer
                </h1>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/categorie" element={<Home />} />
                    <Route path="/categorie/:type" element={<PokemonCategory />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
