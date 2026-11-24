# Site de l'artiste

Site de présentation. L'anglais est la langue du site. Le français est réservé au dossier de presse (`/fr/presse`). Cette version est une prévisualisation protégée : pas de domaine, pas d'indexation, pas de mesure d'audience, pas de cookies.

Le nom de scène n'est écrit que dans `src/site.config.ts`. Partout ailleurs, le site le lit. Voir `docs/RENAME.md`.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Vérifier

```bash
npm run check:identity
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` exécute le contrôle d'identité avant Next.js.

## Où modifier les textes

- `src/content/lines.ts` — la phrase courte, la position sur les instruments, et la mention légale
- `src/content/en.ts` — les textes anglais, y compris le formulaire
- `src/content/fr-press.ts` — le dossier de presse français
- `src/content/links.ts` — titres, numéros, dates de parution et adresses sortantes
- `src/content/press-photos.ts` — cadres des photographies

La phrase courte est : « Producer and DJ. Black and white. AI is one of the instruments. »

La mention, au pied de chaque page et dans le dossier de presse : « Music and visuals made using AI. »

Sur la page de presse française, et sur la page des mentions légales : « Musique et visuels réalisés au moyen de l'IA. » La biographie française est : « Productrice et DJ. Noir et blanc. L'IA fait partie des instruments. »

On n'écrit pas que les voix sont humaines. On ne nomme pas d'autre projet.

## Charte

`src/design/brand.css` : les cinq couleurs, les rôles, et les noms de police. Les fichiers sont dans `public/fonts/`, `public/brand/` et `public/favicon/`. Les licences sont dans `src/fonts/`. `src/design/Wordmark.tsx` affiche le dessin.

Le wordmark fendu est utilisé quand la hauteur de capitale atteint 60 px. En dessous, c'est la version pour petites tailles. Le fond du site est noir. Le gris des cadres `PHOTO` n'est pas un blanc pur.

## Liens d'écoute

Une chaîne vide dans `src/content/links.ts` masque le bouton. Spotify reste vide. Deux titres n'ont pas de lien Deezer. Les dates s'affichent telles qu'elles ont été données. Chaque lien est une ancre, `target="_blank"` et `rel="noopener noreferrer"`. Aucun lecteur n'est intégré.

## Formulaire de booking

`POST /api/booking`. Validation commune au navigateur et au serveur. Champ pot de miel `website`.

Sans `BOOKING_WEBHOOK_URL` ni `RESEND_API_KEY`, la route valide et répond `{ "ok": true, "mode": "preview" }`. Rien n'est stocké, rien n'est transmis.

Webhook : `BOOKING_WEBHOOK_URL` en https. Resend : `RESEND_API_KEY`, `BOOKING_FROM_EMAIL`, `BOOKING_TO_EMAIL`. Aucun compte n'est créé ici. Le modèle est `.env.example`.

## Prévisualisation protégée

1. Importer le projet. Laisser la commande de build sur `npm run build`.
2. Ne pas attacher de domaine.
3. Laisser `NEXT_PUBLIC_SITE_URL` vide. Aucune balise canonique ne doit pointer vers un domaine.
4. Activer Deployment Protection.
5. Laisser `SITE_INDEXABLE` non défini. `/robots.txt` contient `Disallow: /`. Les pages portent `noindex, nofollow`.

## Liste avant l'ouverture

- Décision sur le nom, puis `docs/RENAME.md` si le nom change
- Textes provisoires : biographie longue, fiche technique, photographies, EPK
- Mentions légales et confidentialité
- Adresses Spotify seulement si elles sont vérifiées
- Dates de concert
- Branchement du booking, puis description du traitement dans la page confidentialité
- `SITE_INDEXABLE=true` seulement à l'ouverture publique

## Contrôles

`scripts/check-public-identity.mjs` échoue si un prénom ou un nom civil apparaît, si le nom de scène est recopié hors de la config, des tests et des noms de fichiers de wordmark, si une adresse de domaine reprend ce nom, ou si le texte affirme des voix humaines ou cite un autre projet.
