// src/components/BoxForm.tsx
import React, { useState } from "react";
import type { Pokemon } from "../types/types";
import type { InsertBoxEntry } from "../types/types";

interface BoxFormProps {
  pokemon: Pokemon;
  onSubmit: (entry: InsertBoxEntry) => void;
  onCancel: () => void;
}

export default function BoxForm({ pokemon, onSubmit, onCancel }: BoxFormProps) {
  const [level, setLevel] = useState<number>(1);
  const [location, setLocation] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: InsertBoxEntry = {
      createdAt: new Date().toISOString(),
      level,
      location,
      notes,
      pokemonId: pokemon.id,
    };
    onSubmit(entry);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Catch {pokemon.name}</h2>

      <label>
        Level:
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          min="1"
          style={{ width: "100%", padding: "6px", borderRadius: "6px" }}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          style={{ width: "100%", padding: "6px", borderRadius: "6px" }}
        />
      </label>

      <label>
        Notes:
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes"
          rows={3}
          style={{ width: "100%", padding: "6px", borderRadius: "6px" }}
        />
      </label>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button type="submit" style={{ background: "#222", color: "#fff", borderRadius: "8px", padding: "8px 16px" }}>
          Catch!
        </button>
        <button type="button" onClick={onCancel} style={{ background: "#444", color: "#fff", borderRadius: "8px", padding: "8px 16px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
