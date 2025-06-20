import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

const DISCORD_INVITE_LINK = "https://discord.gg/4B5NTMDM29"; // <-- IMPORTANT: REPLACE THIS!

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center -mt-16 px-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-yellow-200 opacity-50"
        style={{
          backgroundImage: 'url("/honeycomb-pattern.svg")',
          backgroundSize: "300px",
        }}
      ></div>

      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 drop-shadow-md">
          Bienvenue a la <span className="text-yellow-500">Ruche</span>.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
          To bee or not to bee
        </p>
        <a
          href={DISCORD_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center space-x-3">
            <FaDiscord size={28} />
            <span>Rejoins notre serveur discord</span>
          </div>
        </a>

        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/laws"
            className="p-6 bg-yellow-400/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl text-gray-700 font-bold mb-2">Les lois de la ruche</h2>
            <p className="text-gray-700">
              Explore les lois fondamentales de la ruche, regulations, et les meilleures pratiques pour devenir une bonne abbeille.
            </p>
          </Link>
          <Link
            href="/lore"
            className="p-6 bg-yellow-400/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl text-gray-700 font-bold mb-2">L'histoire de la ruche</h2>
            <p className="text-gray-700">
              Découvre les mythes fascinants, les faits amazants et les histoires incroyable que la reine et ses ouvrières on vécues
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
