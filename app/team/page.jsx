// pages/equipe-de-la-ruche.js

import Head from 'next/head';
import { SparklesIcon, UserGroupIcon, ShieldCheckIcon, CodeBracketIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { GiPoliceOfficerHead, GiBee } from "react-icons/gi";

// --- Données de l'équipe (à personnaliser) ---
const PROPHETE = {
    name: "[BEE] Marwan",
    role: "Le dieu des abeilles",
    description: "Notre prophète, notre guide, notre dieu.",
    avatarUrl: "/profilesPictures/dieu.webp", // Remplacez par le vrai avatar
};

const ENCADRANTS = [
    {
        name: "[BEE] DD", role: "Lieutnant", description: "Assure le bon déroulements des opérations", avatarUrl: "/profilesPictures/DD.webp"
    },
    { name: "[BEE] Navarro", role: "Vice Président", description: "Assure la bom maintien de notre peuple.", avatarUrl: "/profilesPictures/Navarro.webp" },
    { name: "[BEE] Paul parmentier", role: "jsp...", description: "Même moi je sais pas 🤷‍♂️", avatarUrl: "/profilesPictures/paul.webp" },
];

const CORPS_DE_METIER = [
    {
        name: "Officiers",
        icon: GiPoliceOfficerHead,
        description: "Ceux qui veillent. Ils protègent nos canaux, modèrent les échanges et repoussent le chaos.",
        members: ["[BEE] Gilaymsteve", "[BEE] light_w4rior", "BEE ʕ•́ᴥ•̀ʔっ", "Bee Catarina", "[BEE] Mariamm", "[BEE] Noah", "Ugo Lancien"],
    },
    {
        name: "Le Corps des Bâtisseurs",
        icon: CodeBracketIcon,
        description: "Ceux qui créent. Ils codent nos outils, construisent nos systèmes et étendent notre influence.",
        members: ["MaPartD'Œuf"],
    },
    {
        name: "Les abeilles",
        icon: GiBee,
        description: "Les membres de notre colonie",
        members: ["[BEE] Sachimy",
            "[Bee]MMatis",
            "[Taupe] Zerrias",
            "┐ LyXx ┌",
            "BEE",
            "BEE",
            "Bee Catarina",
            "Bee Catarina",
            "bee orosto91",
            "BEE ʕ•ᴥ•ʔ",
            "Bee95",
            "Korobako",
            "oscar_lvl",
            "oumimii'",
            "Sacha Deragne",
            "Sasanchyn Denys",
            "tomare",
            "Ugo Lancien",
            "Valérian CLEMENT",
            "Zenkaai"],
    },
];
// --- Fin des données ---


// Composant réutilisable pour une carte de membre
const MemberCard = ({ name, role, description, avatarUrl, isLeader = false }) => (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform hover:scale-105 border ${isLeader ? 'border-yellow-500/50' : 'border-gray-700'} `}>
        <img src={avatarUrl} alt={`Avatar de ${name} `} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-yellow-600" />
        <h3 className="text-xl font-bold text-yellow-400">{name}</h3>
        <p className="text-yellow-200/80 italic">{role}</p>
        <p className="text-gray-400 mt-2 text-sm">{description}</p>
    </div>
);


const EquipeDeLaRuchePage = () => {
    return (
        <>
            <Head>
                <title>L'Ordre de la Ruche | Notre Équipe</title>
                <meta name="description" content="Découvrez la hiérarchie et les membres de l'Ordre de la Ruche, du Prophète aux Corps de métier." />
            </Head>

            <main className="bg-gray-900 text-gray-300 min-h-screen p-4 sm:p-8">
                <div className="max-w-7xl mx-auto space-y-16">

                    {/* === SECTION TITRE === */}
                    <header className="text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 tracking-wider">
                            L'Ordre de la Ruche
                        </h1>
                        <p className="text-xl text-gray-400 mt-2">La Hiérarchie de notre dynastie</p>
                    </header>

                    <hr className="border-yellow-600/20" />

                    {/* === ARBORESCENCE === */}
                    <section className="space-y-12 flex flex-col items-center">

                        {/* --- NIVEAU 1 : Le Prophète --- */}
                        <div className="w-full max-w-sm">
                            <MemberCard {...PROPHETE} isLeader={true} />
                        </div>

                        {/* Ligne de connexion */}
                        <div className="w-px h-16 bg-yellow-600/30"></div>

                        {/* --- NIVEAU 2 : Les Encadrants --- */}
                        <div className="w-full">
                            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8 flex items-center justify-center gap-3">
                                <UserGroupIcon className="h-8 w-8" />
                                Les sbires de la rène
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {ENCADRANTS.map(membre => (
                                    <MemberCard key={membre.name} {...membre} />
                                ))}
                            </div>
                        </div>

                        {/* Ligne de connexion */}
                        <div className="w-px h-16 bg-yellow-600/30"></div>

                        {/* --- NIVEAU 3 : Les Corps de métier --- */}
                        <div className="w-full">
                            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">Les Corps de la Ruche</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                {CORPS_DE_METIER.map((corps) => {
                                    const Icon = corps.icon;
                                    return (
                                        <div key={corps.name} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                            <h3 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center gap-3">
                                                <Icon className="h-7 w-7 text-yellow-500" />
                                                {corps.name}
                                            </h3>
                                            <p className="text-gray-400 italic mb-6 text-sm">{corps.description}</p>
                                            <ul className="space-y-2">
                                                {corps.members.map(member => (
                                                    <li key={member} className="flex items-center gap-3 text-gray-300">
                                                        <span className="h-2 w-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
                                                        {member}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </section>

                    <footer className="text-center pt-8">
                        <p className="text-gray-500">
                            Chaque membre est un rouage essentiel de la grande ruche.
                        </p>
                    </footer>

                </div>
            </main>
        </>
    );
};

export default EquipeDeLaRuchePage;