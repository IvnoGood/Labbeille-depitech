import { getAllPosts } from "../../lib/posts";
import Link from "next/link";

export default function LorePage() {
    const allLore = getAllPosts("us");

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">
                L'image de la ruche
            </h1>
            <div className="flex flex-row gap-5">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-600/30 w-100 h-fit">
                    <img src="/raw.png" alt="L'Étendard de la Ruche Divine" />
                    <p className="text-center text-gray-400 italic mt-3 text-sm">
                        L'Étendard de la Ruche Divine <br />
                        [BEE] Gilaymsteve
                    </p>
                </div>
                <div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-600/30 w-100">
                        <h1 className="font-bold text-2xl">L'hymne de la ruche</h1>
                        <p className="text-left text-gray-200 mt-3 text-sm">
                            🐝 Hymne du Royaume des Abeilles 🐝 <br />
                            « Par le miel et par les ailes »<br />
                            <br />
                            Couplet 1 <br />
                            Dans l’or du ciel et des jardins, <br />
                            Nous bâtissons l’aube de demain. <br />
                            D’un vol fidèle, d’un cœur vaillant, <br />
                            Nous défendons notre royaume brillant. <br />
                            <br />
                            Refrain <br />
                            Par le miel et par les ailes, <br />
                            Par l’ordre de la Reine éternelle, <br />
                            Nous volons unis, sans peur, sans trêve, <br />
                            Abeilles d’honneur, enfants du rêve. <br />
                            <br />
                            Couplet 2 <br />
                            De fleur en fleur, nous dansons fiers, <br />
                            Messagers doux des vents et terres. <br />
                            Travailleuses d’un empire doré, <br />
                            Ouvrières libres et sacrées. <br />
                            <br />
                            Refrain <br />
                            Par le miel et par les ailes, <br />
                            Par l’ordre de la Reine éternelle, <br />
                            Nous volons unis, sans peur, sans trêve, <br />
                            Abeilles d’honneur, enfants du rêve. <br />
                            <br />
                            Pont <br />
                            Et si l’ombre menace nos nids, <br />
                            Nos dards jailliront dans l’harmonie. <br />
                            Car même un peuple minuscule <br />
                            Porte la force d’un roi majuscule ! <br />
                            <br />
                            Refrain final (plus lent) <br />
                            Par le miel et par les ailes, <br />
                            Par l’ordre de la Reine éternelle, <br />
                            Notre serment vole haut dans le ciel : <br />
                            Vive le royaume, vive le miel. <br />
                        </p>
                        <p className="text-center text-gray-400 italic mt-3 text-sm">
                            [BEE] Marwan Mahadi Broucke
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-15">
                    {allLore.map((lore) => (
                        <Link
                            key={lore.slug}
                            href={`/us/${lore.slug}`}
                            className="block p-6 bg-yellow-400/90 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 min-w-100"
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
        </div>
    );
}
