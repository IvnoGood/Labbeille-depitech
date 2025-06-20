#!/bin/bash

# This script automates the setup of "The Honeycomb Hub" website
# on a fresh Next.js + Tailwind CSS boilerplate.
# It should be run from the root of the project directory.

# Stop the script if any command fails
set -e

# --- Color Codes for Better Output ---
COLOR_GREEN='\033[0;32m'
COLOR_YELLOW='\033[1;33m'
COLOR_BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${COLOR_BLUE}--- Starting Honeycomb Hub Setup ---${NC}"

# --- 1. Install Dependencies ---
echo -e "${COLOR_BLUE}Step 1: Installing required packages...${NC}"
npm install gray-matter next-mdx-remote react-icons
npm install -D @tailwindcss/typography
echo -e "${COLOR_GREEN}Packages installed successfully.${NC}"

# --- 2. Configure Tailwind CSS for Typography ---
echo -e "${COLOR_BLUE}Step 2: Configuring Tailwind CSS...${NC}"
# Overwrite the tailwind.config.js to include the typography plugin
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
EOF
echo -e "${COLOR_GREEN}Tailwind config updated.${NC}"

# --- 3. Create Directory Structure ---
echo -e "${COLOR_BLUE}Step 3: Creating directory structure...${NC}"
mkdir -p content/laws content/lore lib app/lore/[slug] app/laws/[slug]
echo -e "${COLOR_GREEN}Directories created.${NC}"

# --- 4. Create Files with Content ---
echo -e "${COLOR_BLUE}Step 4: Creating project files...${NC}"

# LIB/POSTS.JS
cat > lib/posts.js << 'EOF'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getContentDirectory = (type) => path.join(process.cwd(), 'content', type);

export function getAllPostSlugs(type) {
  const contentDir = getContentDirectory(type);
  const filenames = fs.readdirSync(contentDir);
  return filenames.map(filename => ({
    slug: filename.replace(/\.mdx$/, '')
  }));
}

export function getAllPosts(type) {
  const slugs = fs.readdirSync(getContentDirectory(type));
  const posts = slugs.map(slug => {
    const fullPath = path.join(getContentDirectory(type), slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: slug.replace(/\.mdx$/, ''),
      ...data,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(type, slug) {
  const fullPath = path.join(getContentDirectory(type), `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    ...data,
    content,
  };
}
EOF
echo "  ✓ Created lib/posts.js"

# APP/LAYOUT.JS
cat > app/layout.js << 'EOF'
import { Inter } from 'next/font/google';
import './globals.css';
import { FaDiscord, FaBook, FaFeatherAlt } from 'react-icons/fa';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const DISCORD_INVITE_LINK = 'https://discord.gg/your-invite-code'; // <-- IMPORTANT: REPLACE THIS!

export const metadata = {
  title: 'The Honeycomb Hub',
  description: 'A community for bee enthusiasts, keepers, and conservationists.',
};

const Navbar = () => (
  <nav className="bg-yellow-400/90 backdrop-blur-sm sticky top-0 z-50 shadow-md">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-black">
        The Honeycomb Hub 🐝
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/laws" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FaBook />
          <span>The Law</span>
        </Link>
        <Link href="/lore" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FaFeatherAlt />
          <span>The Lore</span>
        </Link>
        <a href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer" 
           className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-indigo-700 transition duration-300">
          <FaDiscord size={20} />
          <span>Join the Swarm</span>
        </a>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} The Honeycomb Hub. All Rights Reserved.</p>
      <p className="mt-2">Built with ❤️ for bees.</p>
    </div>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-yellow-50 text-gray-800`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
EOF
echo "  ✓ Replaced app/layout.js"

# APP/PAGE.JS (Home Page)
cat > app/page.js << 'EOF'
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

const DISCORD_INVITE_LINK = 'https://discord.gg/your-invite-code'; // <-- IMPORTANT: REPLACE THIS!

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center -mt-16 px-4">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-yellow-100 opacity-50"
        style={{ backgroundImage: 'url("/honeycomb-pattern.svg")', backgroundSize: '300px' }}
      ></div>
      
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 drop-shadow-md">
          Welcome to the <span className="text-yellow-500">Hive</span>.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
          Whether you're a seasoned beekeeper, a curious nature lover, or a conservation champion, you've found your community.
        </p>
        <a 
          href={DISCORD_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center space-x-3">
            <FaDiscord size={28} />
            <span>Join our Discord Server</span>
          </div>
        </a>

        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/laws" className="p-6 bg-white/70 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">The Law of the Hive</h2>
            <p>Explore essential beekeeping laws, regulations, and best practices to become a responsible apiarist.</p>
          </Link>
          <Link href="/lore" className="p-6 bg-white/70 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">Whispers of the Hive</h2>
            <p>Discover fascinating bee mythology, amazing facts, and the incredible stories that make up bee lore.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF
echo "  ✓ Replaced app/page.js"

# APP/LORE/PAGE.JS
cat > app/lore/page.js << 'EOF'
import { getAllPosts } from '../../lib/posts';
import Link from 'next/link';

export default function LorePage() {
  const allLore = getAllPosts('lore');

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Whispers of the Hive</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allLore.map(lore => (
          <Link key={lore.slug} href={`/lore/${lore.slug}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{lore.title}</h2>
            <p className="text-gray-600 mb-4">{lore.summary}</p>
            <span className="text-indigo-600 font-semibold">Read More &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF
echo "  ✓ Created app/lore/page.js"

# APP/LORE/[SLUG]/PAGE.JS
cat > app/lore/[slug]/page.js << 'EOF'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getAllPostSlugs('lore');
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug('lore', params.slug);
  return { title: `${post.title} | The Honeycomb Hub` };
}

export default async function LorePostPage({ params }) {
  const { title, date, author, content } = await getPostBySlug('lore', params.slug);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <article className="prose lg:prose-xl bg-white/50 p-8 rounded-lg shadow-lg">
        <h1>{title}</h1>
        <div className="text-gray-500 mb-8">
          By {author} on {new Date(date).toLocaleDateString()}
        </div>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
EOF
echo "  ✓ Created app/lore/[slug]/page.js"

# APP/LAWS/PAGE.JS
cat > app/laws/page.js << 'EOF'
import { getAllPosts } from '../../lib/posts';
import Link from 'next/link';

export default function LawsPage() {
  const allLaws = getAllPosts('laws');

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">The Law of the Hive</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allLaws.map(law => (
          <Link key={law.slug} href={`/laws/${law.slug}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{law.title}</h2>
            <p className="text-gray-600 mb-4">{law.summary}</p>
            <span className="text-indigo-600 font-semibold">Read More &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF
echo "  ✓ Created app/laws/page.js"

# APP/LAWS/[SLUG]/PAGE.JS
cat > app/laws/[slug]/page.js << 'EOF'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getAllPostSlugs('laws');
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug('laws', params.slug);
  return { title: `${post.title} | The Honeycomb Hub` };
}

export default async function LawPostPage({ params }) {
  const { title, date, author, content } = await getPostBySlug('laws', params.slug);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <article className="prose lg:prose-xl bg-white/50 p-8 rounded-lg shadow-lg">
        <h1>{title}</h1>
        <div className="text-gray-500 mb-8">
          By {author} on {new Date(date).toLocaleDateString()}
        </div>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
EOF
echo "  ✓ Created app/laws/[slug]/page.js"

# --- 5. Create Sample Content and Assets ---
echo -e "${COLOR_BLUE}Step 5: Creating sample content...${NC}"

# LORE FILE
cat > content/lore/the-waggle-dance.mdx << 'EOF'
---
title: 'The Amazing Waggle Dance'
date: '2024-06-15'
author: 'Nature Nerd'
summary: 'How honeybees communicate distance and direction to food sources with a complex dance.'
---

The waggle dance is one of the most fascinating examples of animal communication. When a forager bee returns to the hive after finding a rich source of nectar, she performs a dance to tell her sisters exactly where to go.

### How it Works

The dance is a figure-eight pattern. The "waggle run" in the middle is the key:
- **Direction:** The angle of the waggle run relative to the vertical axis inside the dark hive corresponds to the angle of the food source relative to the sun.
- **Distance:** The duration of the waggle run tells the other bees how far away the food is. A longer waggle means a longer flight!
EOF
echo "  ✓ Created sample lore file."

# LAW FILE
cat > content/laws/urban-beekeeping-basics.mdx << 'EOF'
---
title: 'Urban Beekeeping: The Basics'
date: '2024-06-16'
author: 'Apiary Expert'
summary: 'Key regulations and best practices for keeping bees in a city environment.'
---

## Checking Local Ordinances

Before you buy a single bee, your first step is to check with your city or municipality. Many cities have specific bylaws regarding:
- Maximum number of hives allowed.
- Required distance from property lines.
- Mandatory registration with a local beekeeping association.

## Hive Placement
In a dense urban environment, hive placement is crucial for the safety of both your bees and your neighbors.
- **Flight Path:** Ensure the hive entrance doesn't point directly at a neighbor's window, door, or high-traffic area.
- **Water Source:** Provide a water source (like a bird bath with pebbles) so your bees don't use your neighbor's swimming pool.
EOF
echo "  ✓ Created sample law file."

# HONEYCOMB SVG PATTERN
cat > public/honeycomb-pattern.svg << 'EOF'
<svg width="100" height="86.6" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="honeycomb" width="100" height="86.6" patternUnits="userSpaceOnUse">
      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#fefce8" stroke-width="2"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#honeycomb)"/>
</svg>
EOF
echo "  ✓ Created honeycomb background SVG."

# --- Final Instructions ---
echo
echo -e "${COLOR_GREEN}--- Honeycomb Hub setup is complete! ---${NC}"
echo
echo -e "${COLOR_YELLOW}IMPORTANT NEXT STEPS:${NC}"
echo -e "1. Open ${COLOR_BLUE}app/layout.js${NC} and ${COLOR_BLUE}app/page.js${NC}."
echo -e "2. Replace the placeholder ${COLOR_YELLOW}'https://discord.gg/your-invite-code'${NC} with your actual Discord server link."
echo
echo -e "To start your development server, run:"
echo -e "${COLOR_GREEN}   npm run dev${NC}"
echo
