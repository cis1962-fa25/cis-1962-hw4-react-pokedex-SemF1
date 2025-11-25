import type { Pokemon } from "../types/types";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemon: Pokemon[];
  onPokemonClick: (p: Pokemon) => void;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PokemonList({
  pokemon,
  onPokemonClick,
  currentPage,
  onPrev,
  onNext,
}: PokemonListProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          margin: "20px",
        }}
      >
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} onClick={() => onPokemonClick(p)} />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onPrev} disabled={currentPage === 0}>
          Previous
        </button>
        <span style={{ margin: "0 15px" }}>Page {currentPage + 1}</span>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
