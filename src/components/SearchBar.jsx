import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    );
    const data = await res.json();
    if (data?.results?.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      onSearch({ latitude, longitude, name, country });
    } else {
      alert("City not found");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 justify-center my-4 transition-all duration-300"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="input input-bordered w-full sm:w-64 focus:ring-2 focus:ring-blue-400
        hover:border-blue-400 transition-all duration-200"
      />
      <button
        className="btn btn-primary hover:scale-105 active:scale-95 transition-transform duration-200"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
