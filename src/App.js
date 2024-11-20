import React from "react";
import PokemonList from "./components/PokemonList";
import PokemonCard from './components/PokemoCard';


const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pokémon List</h1>
      <PokemonList />
      <PokemonCard/>
    </div>
  );
};

export default App;
