import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Characters() {
  // List of characters
  const [characters, setCharacters] = useState([]);

  // Selected character details
  const [selected, setSelected] = useState(null);

  // Loading states
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // Search text
  const [search, setSearch] = useState("");

  // 1) Load characters list
  async function loadCharacters() {
    setLoadingList(true);
    setError("");
    setSelected(null);
    setSearch("");

    try {
      const response = await fetch(
        "https://swapi.tech/api/people?page=1&limit=12"
      );

      if (response.ok) {
        const data = await response.json();
        // data.results is an array of characters
        setCharacters(data.results);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (e) {
      setError(e.message || "Failed to load characters.");
    } finally {
      setLoadingList(false);
    }
  }

  // Load list once when page opens
  useEffect(() => {
    loadCharacters();
  }, []);

  // 2) Load details for 1 character
  async function loadCharacterDetails(uid) {
    setLoadingDetails(true);
    setError("");

    try {
      const response = await fetch(`https://swapi.tech/api/people/${uid}`);

      if (response.ok) {
        const data = await response.json();
        setSelected(data.result); // result has properties inside
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (e) {
      setError(e.message || "Failed to load character details.");
      setSelected(null);
    } finally {
      setLoadingDetails(false);
    }
  }

  // The actual details are inside selected.properties
  const details = selected?.properties;

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Characters</h2>

          <div className="flex items-center gap-4">
            <Link className="text-blue-400 underline" to="/">
              Home
            </Link>

            <Link className="text-blue-400 underline" to="/films">
              Go to Films →
            </Link>

            <button
              onClick={loadCharacters}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/15 border border-white/15"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Pick a character</h3>

              <input
                className="w-full border rounded-lg px-4 py-2 mb-3"
                placeholder="Search characters (ex: luke)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {loadingList ? (
                <p className="text-gray-600">Loading characters...</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredCharacters.map((c) => (
                    <li key={c.uid}>
                      <button
                        onClick={() => loadCharacterDetails(c.uid)}
                        className="w-full text-left border rounded-lg p-3 hover:bg-slate-50 transition"
                      >
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-gray-500">
                          Click to view details
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {!loadingList && filteredCharacters.length === 0 && (
                <p className="text-gray-600">No matching characters found.</p>
              )}
            </div>
          </div>
          <div>
            <div className="bg-black/10 border border-white/15 rounded-xl shadow p-4 min-h-[260px]">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Character Details
              </h3>

              {loadingDetails && (
                <p className="text-gray-300">Loading details...</p>
              )}

              {!loadingDetails && !selected && (
                <p className="text-gray-300">
                  Select a character to load details...
                </p>
              )}

              {!loadingDetails && details && (
                <div className="space-y-2 text-gray-200">
                  <p>
                    <span className="font-semibold text-white">Name:</span>{" "}
                    {details.name}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Gender:</span>{" "}
                    {details.gender}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Birth year:</span>{" "}
                    {details.birth_year}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Height:</span>{" "}
                    {details.height}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Mass:</span>{" "}
                    {details.mass}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Eye color:</span>{" "}
                    {details.eye_color}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Data powered by SWAPI.Tech
        </div>
      </div>
    </div>
  );
}

export default Characters;
