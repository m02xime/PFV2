Portfolio (Next.js App Router) – Maxime KB

## Démarrer

Lancer le serveur de dev :

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

Les pages principales sont dans `app/app/` (App Router).

Ce projet utilise `next/font` (Geist) et un fond animé via `zdog`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Le curseur personnalisé est initialisé globalement dans `app/app/layout.tsx`.
- Le fond `Zdog` est un composant client (`app/app/components/ZdogBackground.tsx`).
