"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ZdogBackground } from "./components/ZdogBackground";
import { useCustomCursor } from "./useCustomCursor";

const FEATURE_CARDS = [
	{
		title: "Projets",
		description:
			"Des API, services et scripts back qui résolvent des vrais problèmes.",
		href: "https://github.com/m02xime",
		label: "Voir quelques repos",
	},
	{
		title: "Façon de bosser",
		description:
			"Je préfère les boucles courtes : comprendre le besoin, poser une archi simple, livrer souvent.",
		href: "https://www.linkedin.com/in/maxime-kock-bouabid/",
		label: "Voir mon parcours",
	},
	{
		title: "Contact",
		description:
			"Tu as un produit, une idée, ou juste une curiosité ? Parlons-en.",
		href: "mailto:contact@maxkb02@gmail.com?subject=Contact%20depuis%20ton%20portfolio",
		label: "M’écrire directement",
	},
];

const STACK_GROUPS = [
	{
		title: "Back & APIs",
		items: ["PHP", "Symfony", "Laravel", "Node.js", "Express", "FastAPI"],
	},
	{
		title: "Données & intégrations",
		items: [
			"PostgreSQL",
			"MySQL",
			"MongoDB",
			"Redis",
			"RabbitMQ",
			"Intégrations tiers",
		],
	},
	{
		title: "Qualité & outils",
		items: [
			"Tests automatisés",
			"Docker",
			"CI/CD",
			"Monitoring basique",
			"Refactor d'existant",
		],
	},
];

export default function Home() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			const { innerWidth, innerHeight } = window;
			const x = (event.clientX / innerWidth - 0.5) * 2;
			const y = (event.clientY / innerHeight - 0.5) * 2;
			setMousePos({ x, y });
		};

		window.addEventListener("pointermove", handler);
		return () => window.removeEventListener("pointermove", handler);
	}, []);


	useCustomCursor();

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#020617] text-zinc-50">
			<ZdogBackground />

			<main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-10 md:px-10 md:py-16">
				{/* Hero */}
				<section className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
					<div className="space-y-5">
						<p className="text-xs uppercase tracking-[0.3em] text-sky-400">
							maxime kb / développeur back
						</p>
						<h1 className="text-3xl font-semibold tracking-tight md:text-5xl motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]">
							Je conçois et branche des backends
							<span className="bg-linear-to-r from-sky-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
								{" "}
								 solides
							</span>
							, sans sur-ingénierie.
						</h1>
						<p className="max-w-xl text-sm text-zinc-300 md:text-base motion-safe:animate-[fadeInUp_0.7s_ease-out_forwards]">
							Je travaille surtout avec PHP, Python et JavaScript, mais je
							m’adapte facilement à l’écosystème d’une équipe. Mon truc : des
							services qui tiennent la route, lisibles, testables, et qui ne
							rendent pas fous celles et ceux qui les maintiendront après moi.
						</p>
						<div className="flex flex-wrap gap-3 text-xs md:text-sm motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards]">
							<span className="rounded-full border border-sky-500/60 bg-sky-500/10 px-3 py-1 text-sky-100">
								PHP / Symfony / Laravel
							</span>
							<span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-100">
								Python / FastAPI / scripts
							</span>
							<span className="rounded-full border border-indigo-500/60 bg-indigo-500/10 px-3 py-1 text-indigo-100">
								Node.js / TypeScript / APIs
							</span>
						</div>
					</div>
					<div className="mt-2 space-y-3 rounded-2xl border border-sky-500/50 bg-zinc-900/80 p-4 text-sm text-zinc-300 shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(59,130,246,0.9)] md:mt-0 md:p-5">
						<p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
							en une phrase
						</p>
						<p>
							Je suis avant tout développeur back : je fais parler les bases de
							données, les APIs et les services entre eux, proprement.
						</p>
						<p className="text-xs text-zinc-400">
							Ce site est volontairement simple : l’important, c’est ce que je
							sais construire, pas les effets de vitrine.
						</p>
					</div>
				</section>

				{/* Bande de cartes */}
				<section className="space-y-4">
					<p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
						en bref
					</p>
					<div className="grid gap-4 opacity-100 transition-all duration-500 ease-out md:grid-cols-3"
					>
						{FEATURE_CARDS.map((card) => (
							<Link
								key={card.title}
								href={card.href}
								target={card.href.startsWith("http") ? "_blank" : undefined}
								className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm shadow-[0_0_20px_rgba(15,23,42,0.7)] transition duration-300 hover:-translate-y-1 hover:border-sky-400/80 hover:bg-zinc-900 hover:shadow-[0_0_45px_rgba(56,189,248,0.55)] md:p-5"
								style={{
									transform: `translate3d(${mousePos.x * 4}px, ${mousePos.y * 2}px, 0)`,
								}}
							>
								<div className="space-y-2">
									<h2 className="text-base font-medium text-zinc-50 md:text-lg">
										{card.title}
									</h2>
									<p className="text-xs text-zinc-300 md:text-sm">
										{card.description}
									</p>
								</div>
								<span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sky-300 group-hover:text-sky-200">
									{card.label}
									<span aria-hidden>↗</span>
								</span>
							</Link>
						))}
					</div>
				</section>

				{/* Stacks & outils */}
				<section className="mt-4 space-y-4">
					<p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
						stacks & outils
					</p>
					<div className="grid gap-4 opacity-100 transition-all duration-500 ease-out md:grid-cols-3"
					>
						{STACK_GROUPS.map((group) => (
							<div
								key={group.title}
								className="rounded-2xl border border-zinc-800 bg-linear-to-b from-zinc-900/80 via-zinc-900 to-zinc-950 p-4 text-sm shadow-[0_0_25px_rgba(15,23,42,0.8)] md:p-5"
							>
								<h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
									{group.title}
								</h3>
								<ul className="mt-3 flex flex-wrap gap-2">
									{group.items.map((item) => (
										<li
											key={item}
											className="rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
										>
											{item}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				{/* Mini bloc de contexte perso */}
				<section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-[0_0_45px_rgba(15,23,42,1)] backdrop-blur md:p-6">
					<p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
						la version courte
					</p>
					<p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
						Je suis Maxime, développeur back polyvalent. Je suis à l’aise avec
						plusieurs stacks (PHP, Python, JS) et j’aime surtout comprendre ce
						qu’il y a vraiment à construire avant de sortir une solution &quot;tech
						pour la tech&quot;. Si tu cherches quelqu’un pour poser des bases
					 solides, reprendre un existant ou faire évoluer une plateforme,
						on peut en parler.
					</p>
				</section>

				{/* Ce que j'aime faire */}
				<section className="mt-4 grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 text-sm text-zinc-200 shadow-[0_0_40px_rgba(56,189,248,0.25)] md:grid-cols-[1.4fr_1fr] md:p-6">
					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
							ce que j’aime faire
						</p>
						<ul className="space-y-2">
							<li>
								• Repenser une API pour la rendre plus claire et prévisible.
							</li>
							<li>
								• Nettoyer et structurer un vieux code back pour qu’il redevienne
								maintenable.
							</li>
							<li>
								• Brancher des services entre eux (paiement, auth, emails, outils
								métier).
							</li>
							<li>
								• Mettre en place des scripts ou petits outils qui font gagner du
								temps à l’équipe.
							</li>
						</ul>
					</div>
					<div className="space-y-3 rounded-xl border border-sky-500/40 bg-linear-to-b from-sky-500/10 via-emerald-500/5 to-transparent p-4 text-xs text-zinc-300">
						<p className="text-xs uppercase tracking-[0.25em] text-sky-300">
							actuellement
						</p>
						<p>
							J’expérimente autour de petites APIs, de scripts et d’outils perso
							pour automatiser des tâches du quotidien (import/export de données,
							monitoring simple, etc.).
						</p>
						<p>
							Si tu as un cas concret en tête, tu peux m’envoyer deux lignes de
							contexte, et on voit ce qui est faisable.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}
