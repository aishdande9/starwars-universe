import { Link } from "react-router-dom";
import hero from "../assets/images/hero.png"

const FormContent = () => {
  return (
    <div className="bg-black/95 backdrop-blur-sm rounded-[25px] border border-gray-200 shadow-lg p-8 w-full">
      <h1 className="font-bold text-white mb-3 text-center text-4xl">
        Star Wars Universe
      </h1>

      <p className="text-gray-300 text-center mb-6 text-lg">
        Explore Star Wars characters and films from a galaxy far, far away.
        Discover iconic heroes, epic stories, and timeless adventures.
      </p>

      <div className="flex justify-center">
        <Link to="/characters">
          <button
            type="button"
            className="bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md px-6 py-3 text-base"
          >
            Explore Star Wars
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function Landing() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 flex items-center justify-center p-8">
      <div className="flex items-center gap-10 w-full max-w-6xl">
        <div className="w-1/2 h-[500px]">
          <img
            src={hero}
            alt="Star Wars Universe"
            className="w-full h-full object-cover rounded-[40px]"
          />
        </div>

        <div className="w-1/2">
          <FormContent />
        </div>
      </div>
    </div>
  );
}
