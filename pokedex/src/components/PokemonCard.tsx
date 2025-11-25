import type { Pokemon } from "../types/types";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
      <p>
        {pokemon.types.map((t) => (
          <span key={t.name} style={{ marginRight: "4px" }}>
            {t.name}
          </span>
        ))}
      </p>
    </div>
  );
}
