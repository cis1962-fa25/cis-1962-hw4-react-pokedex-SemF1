import type { Pokemon } from "../types/types";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onCatch: () => void;
}

function PokemonDetails({ pokemon, onCatch }: PokemonDetailsProps) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width="150" />

      <h3>Types:</h3>
      <ul>
        {pokemon.types.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>

      <h3>Stats:</h3>
      <ul>
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <li key={stat}>
            {stat}: {value}
          </li>
        ))}
      </ul>

      <button onClick={onCatch} style={{ marginTop: "10px" }}>
        Catch Pokémon
      </button>
    </div>
  );
}

export default PokemonDetails;
