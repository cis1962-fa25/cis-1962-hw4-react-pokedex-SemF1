import type {
  Pokemon,
  BoxEntry,
  InsertBoxEntry,
  UpdateBoxEntry,
} from "../types/types";

const BASE_URL = "https://hw4.cis1962.esinx.net/api";
//from my email
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJwZW5ua2V5Ijoic2VtZiIsImlhdCI6MTc1OTA5ODIxOCwiaXNzIjoiZWR1OnVwZW5uOnNlYXM6Y2lzMTk2MiIsImF1ZCI6ImVkdTp1cGVubjpzZWFzOmNpczE5NjIiLCJleHAiOjE3NjQyODIyMTh9.vlG3YSdipQxJdFMtk0k9eXQaAKZoFKxcGDTTkjdBd0I";

export default class PokemonAPI {
  static async getPokemonPage(limit: number, offset: number): Promise<Pokemon[]> {
    const res = await fetch(`${BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`, {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
    });
    if (!res.ok) throw new Error("Failed to fetch Pokémon list");
    return res.json();
  }

static async getPokemonByName(name: string): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch Pokémon details");
  return res.json();
}


  static async getBoxIds(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/box/`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error("Failed to fetch Box entries");
    return res.json();
  }

  static async getBoxEntry(id: string): Promise<BoxEntry> {
    const res = await fetch(`${BASE_URL}/box/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch Box entry ${id}`);
    return res.json();
  }

  static async createBoxEntry(entry: InsertBoxEntry): Promise<BoxEntry> {
    const res = await fetch(`${BASE_URL}/box/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error("Failed to create Box entry");
    return res.json();
  }

  static async updateBoxEntry(id: string, entry: UpdateBoxEntry): Promise<BoxEntry> {
    const res = await fetch(`${BASE_URL}/box/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`Failed to update Box entry ${id}`);
    return res.json();
  }

  static async deleteBoxEntry(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/box/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error(`Failed to delete Box entry ${id}`);
  }
}
