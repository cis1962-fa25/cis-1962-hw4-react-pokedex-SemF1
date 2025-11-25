import type { BoxEntry, Pokemon } from "../types/types";

interface BoxCardProps {
  entry: BoxEntry;
  pokemon: Pokemon | null;
  onEdit: (entry: BoxEntry) => void;
  onDelete: (id: string) => void;
}

export default function BoxCard({ entry, pokemon, onEdit, onDelete }: BoxCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      {pokemon ? (
        <>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width="100"
            height="100"
          />
          <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
        </>
      ) : (
        <p>Loading Pokémon...</p>
      )}

      <p><strong>Location:</strong> {entry.location}</p>
      <p><strong>Level:</strong> {entry.level}</p>
      <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
      {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}

      <button onClick={() => onEdit(entry)}>Edit</button>
      <button onClick={() => onDelete(entry.id)} style={{ marginLeft: "8px" }}>
        Delete
      </button>
    </div>
  );
}
