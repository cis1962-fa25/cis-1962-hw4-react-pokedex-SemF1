// src/App.tsx
import { useState, useEffect } from "react";
import PokemonAPI from "./api/PokemonAPI";
import type { Pokemon, BoxEntry, InsertBoxEntry } from "./types/types";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Modal from "./components/Modal";
import BoxForm from "./components/BoxForm";
import BoxList from "./components/BoxList";
import "./App.css";

function App() {
  const [view, setView] = useState<"pokemon" | "box">("pokemon");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [boxEntries, setBoxEntries] = useState<BoxEntry[]>([]);
  const [idToName, setIdToName] = useState<Map<number, string>>(new Map());
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<BoxEntry | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBoxForm, setShowBoxForm] = useState(false);

  const limit = 10;
  //fetch pokemon
  
  useEffect(() => {
    if (view !== "pokemon") return;
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const offset = currentPage * limit;
        const data = await PokemonAPI.getPokemonPage(limit, offset);
        setPokemon(data);
        const map = new Map<number, string>();
        data.forEach((p) => map.set(p.id, p.name));
        setIdToName(map);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [currentPage, view]);

  const fetchBox = async () => {
    try {
      setLoading(true);
      const ids = await PokemonAPI.getBoxIds();
      const entries = await Promise.all(ids.map((id) => PokemonAPI.getBoxEntry(id)));
      setBoxEntries(entries);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "box") fetchBox();
  }, [view]);

  const handleCreateBoxEntry = async (entry: InsertBoxEntry) => {
    try {
      setLoading(true);
      await PokemonAPI.createBoxEntry(entry);
      setShowBoxForm(false);
      alert("Pokémon added to your Box!");
      if (view === "box") fetchBox();
    } catch (err) {
      alert(`Failed to catch Pokémon: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEntry = async (entry: InsertBoxEntry) => {
    if (!selectedEntry) return;
    try {
      setLoading(true);
      await PokemonAPI.updateBoxEntry(selectedEntry.id, entry);
      setShowBoxForm(false);
      setSelectedEntry(null);
      await fetchBox();
    } catch (err) {
      alert(`Failed to update Box entry: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!window.confirm("Delete this Pokémon?")) return;
    try {
      setLoading(true);
      await PokemonAPI.deleteBoxEntry(id);
      await fetchBox();
    } catch (err) {
      alert(`Failed to delete: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonForEntry = (entry: BoxEntry): Pokemon | null => {
    const name = idToName.get(entry.pokemonId);
    const match = pokemon.find((p) => p.name === name);
    return match || null;
  };

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setView("pokemon")}
          disabled={view === "pokemon"}
        >
          All Pokémon
        </button>
        <button
          onClick={() => setView("box")}
          disabled={view === "box"}
          style={{ marginLeft: "10px" }}
        >
          My Box
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {view === "pokemon" && !loading && !error && (
        <PokemonList
          pokemon={pokemon}
          onPokemonClick={(poke) => {
            setSelectedPokemon(poke);
            setShowDetailsModal(true);
          }}
          currentPage={currentPage}
          onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
          onNext={() => setCurrentPage((p) => p + 1)}
        />
      )}

      {view === "box" && !loading && !error && (
        <BoxList
          entries={boxEntries}
          getPokemonForEntry={getPokemonForEntry}
          onEdit={(entry) => {
            setSelectedEntry(entry);
            setShowBoxForm(true);
          }}
          onDelete={handleDeleteEntry}
        />
      )}

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      >
        {selectedPokemon && (
          <PokemonDetails
            pokemon={selectedPokemon}
            onCatch={() => {
              setShowDetailsModal(false);
              setShowBoxForm(true);
            }}
          />
        )}
      </Modal>

      <Modal isOpen={showBoxForm} onClose={() => setShowBoxForm(false)}>
        {selectedPokemon && !selectedEntry && (
          <BoxForm
            pokemon={selectedPokemon}
            onSubmit={handleCreateBoxEntry}
            onCancel={() => setShowBoxForm(false)}
          />
        )}
        {selectedEntry && (
          <BoxForm
            pokemon={getPokemonForEntry(selectedEntry)!}
            onSubmit={handleEditEntry}
            onCancel={() => {
              setSelectedEntry(null);
              setShowBoxForm(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
