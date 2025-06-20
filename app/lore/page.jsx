import { getAllPosts } from "../../lib/posts";
import Link from "next/link";

export default function LorePage() {
  const allLore = getAllPosts("lore");

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Les murmures de la ruche
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allLore.map((lore) => (
          <Link
            key={lore.slug}
            href={`/lore/${lore.slug}`}
            className="block p-6 bg-yellow-400/90 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold mb-2">{lore.title}</h2>
            <p className="text-white mb-4">{lore.summary}</p>
            <span className="text-indigo-600 font-semibold">
              Lis plus &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
