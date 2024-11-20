import React from "react";
import PokemonList from "./components/PokemonList";

const App = () => {
    return (
        <div style={{
            backgroundImage: "linear-gradient(45deg, #FFDD94, #FFA69E, #AAE3F5, #FF9CEE)",
            backgroundSize: "cover",
            minHeight: "100vh",
            padding: "20px",
        }}>
            <h1 style={{
                textAlign: "center",
                fontFamily: "Pokemon, sans-serif",
                fontSize: "3rem",
                color: "#333",
                textShadow: "2px 2px #fff",
            }}>
                Pokémon Explorer
            </h1>
            <PokemonList />
        </div>
    );
};

export default App;
