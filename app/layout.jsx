import { Inter } from 'next/font/google';
import './globals.css';
import { FaDiscord, FaBook, FaFeatherAlt } from 'react-icons/fa';
import { FaLandmarkFlag } from 'react-icons/fa6';
import { MdGroups2 } from "react-icons/md";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const DISCORD_INVITE_LINK = 'https://discord.gg/4B5NTMDM29'; // <-- IMPORTANT: REPLACE THIS!

export const metadata = {
  title: "L'abeille d'Epitech",
  description: 'To bee or not to bee',
};

const Navbar = () => (
  <nav className="bg-yellow-400/90 backdrop-blur-sm sticky top-0 z-50 shadow-md">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-black">
        L'abeille d'Epitech 🐝
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/laws" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FaBook />
          <span>La loi</span>
        </Link>
        <Link href="/lore" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FaFeatherAlt />
          <span>L'histoire</span>
        </Link>
        <Link href="/us" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FaLandmarkFlag />
          <span>Notre image</span>
        </Link>
        <Link href="/team" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <MdGroups2 fontSize={25} />
          <span>Notre équipe</span>
        </Link>
        <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer"
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-indigo-700 transition duration-300">
          <FaDiscord size={20} />
          <span>Rejoins la guilde</span>
        </a>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} L'abeille d'Epitech. All Rights Reserved.</p>
      <p className="mt-2">Construit avec ❤️ pour les abeilles.</p>
    </div>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-yellow-50 text-gray-800 min-h-screen !flex flex-col`}>
        <Navbar />
        <main className='!flex grow flex-col'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
