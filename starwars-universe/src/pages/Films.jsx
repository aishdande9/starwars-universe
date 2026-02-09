// Import hooks from React
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

export default function Films() {

  // Store list of films
  const [films, setFilms] = useState([]);

  // Store selected film details
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Loading states
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Search input value
  const [searchText, setSearchText] = useState("");

  // Function to load all films
  async function fetchFilms() {
    setIsLoadingFilms(true);
    setErrorMessage("");
    setSelectedFilm(null);
    setSearchText("");
    

    try {
      const response = await fetch("https://swapi.tech/api/films");

      // If API fails, throw error
      if (!response.ok) {
        throw new Error("Failed to fetch films");
      }

      const data = await response.json();

      // Save films list in state
      setFilms(data.result || []);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingFilms(false);
    }
  }

  // Load films when page loads
  useEffect(() => {
    fetchFilms();
  }, []);

  // Function to load selected film details
  async function fetchFilmDetails(filmId) {
    setIsLoadingDetails(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://swapi.tech/api/films/${filmId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch film details");
      }

      const data = await response.json();
      setSelectedFilm(data.result);
    } catch (error) {
      setErrorMessage(error.message);
      setSelectedFilm(null);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  // Shortcut to film properties
  const filmDetails = selectedFilm?.properties;

  // Filter films based on search text
  const filteredFilms = films.filter((film) =>
    (film.properties?.title || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Films</h2>

          <div className="flex gap-4">
            <Link to="/" className="text-blue-400 underline">
              Home
            </Link>

            <Link to="/characters" className="text-blue-400 underline">
              ← Back to Characters
            </Link>

            <button
              onClick={fetchFilms}
              className="bg-white/10 text-white px-4 py-2 rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Film list */}
          <div className="lg:col-span-2 bg-black p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Pick a film</h3>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search films"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            {/* Loading films */}
            {isLoadingFilms && <p>Loading films...</p>}

            {/* Film list */}
            {!isLoadingFilms && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredFilms.map((film) => (
                  <li key={film.uid}>
                    <button
                      onClick={() => fetchFilmDetails(film.uid)}
                      className="border p-3 rounded w-full text-left hover:bg-gray-100"
                    >
                      <p className="font-semibold">
                        {film.properties?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Episode {film.properties?.episode_id}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!isLoadingFilms && filteredFilms.length === 0 && (
              <p>No films found</p>
            )}
          </div>

          {/* Film details */}
          <div className="bg-white/10 text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Film Details</h3>

            {isLoadingDetails && <p>Loading details...</p>}

            {!isLoadingDetails && !filmDetails && (
              <p>Select a film to see details</p>
            )}

            {!isLoadingDetails && filmDetails && (
              <div className="space-y-2">
                <p><b>Title:</b> {filmDetails.title}</p>
                <p><b>Episode:</b> {filmDetails.episode_id}</p>
                <p><b>Director:</b> {filmDetails.director}</p>
                <p><b>Producer:</b> {filmDetails.producer}</p>
                <p><b>Release Date:</b> {filmDetails.release_date}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-8">
          Data powered by SWAPI.Tech
        </p>
      </div>
    </div>
  );
}
