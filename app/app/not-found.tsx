"use client";

import Link from "next/link";
import { useCustomCursor } from "./useCustomCursor";
import { ZdogBackground } from "./components/ZdogBackground";

export default function NotFound() {
	useCustomCursor();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 py-10 text-zinc-50 md:px-10">
      <ZdogBackground />

      <main className="relative mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-6 text-sm shadow-[0_0_40px_rgba(15,23,42,0.95)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">oups / 404</p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Cette page n&apos;existe pas.
        </h1>
        <p className="text-zinc-300">
          Soit tu as tenté une URL qui n&apos;existe pas, soit j&apos;ai mal branché un
          truc. Dans tous les cas, le plus intéressant reste ce que je sais
          développer côté back.
        </p>

        <div className="mt-2 grid gap-4 md:grid-cols-2">
          <Link
            href="/"
            className="group flex items-center justify-between rounded-2xl border border-sky-500/50 bg-sky-500/10 px-4 py-3 text-sm font-medium text-sky-100 transition hover:-translate-y-1 hover:bg-sky-500/20 hover:shadow-[0_0_35px_rgba(56,189,248,0.9)]"
          >
            <span>Revenir à l&apos;accueil</span>
            <span aria-hidden className="transition group-hover:translate-x-1">
              ↺
            </span>
          </Link>

          <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-xs text-zinc-300">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-zinc-500">
              raccourcis utiles
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="https://github.com/m02xime"
                target="_blank"
                className="rounded-full border border-zinc-700/80 bg-zinc-950/60 px-3 py-1 transition hover:border-sky-400 hover:text-sky-100"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/maxime-kock-bouabid/"
                target="_blank"
                className="rounded-full border border-zinc-700/80 bg-zinc-950/60 px-3 py-1 transition hover:border-sky-400 hover:text-sky-100"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:contact@maxkb02@gmail.com?subject=404%20sur%20ton%20portfolio"
                className="rounded-full border border-zinc-700/80 bg-zinc-950/60 px-3 py-1 transition hover:border-emerald-400 hover:text-emerald-200"
              >
                Me signaler un lien cassé
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
