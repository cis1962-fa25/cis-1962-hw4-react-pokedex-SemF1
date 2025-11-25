import type { BoxEntry, Pokemon } from "../types/types";
import BoxCard from "./BoxCard";

interface BoxListProps {
  entries: BoxEntry[];
  getPokemonForEntry: (entry: BoxEntry) => Pokemon | null;
  onEdit: (entry: BoxEntry) => void;
  onDelete: (id: string) => void;
}

export default function BoxList({
  entries,
  getPokemonForEntry,
  onEdit,
  onDelete,
}: BoxListProps) {
  if (entries.length === 0) return <p>No Pokémon caught yet.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        margin: "20px",
      }}
    >
      {entries.map((entry) => (
        <BoxCard
          key={entry.id}
          entry={entry}
          pokemon={getPokemonForEntry(entry)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
