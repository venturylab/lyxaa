# LYXAA

Site de présentation de LYXAA. L’anglais est la langue du site. Le français est réservé au dossier de presse (`/fr/presse`). Cette version est une prévisualisation protégée : pas de domaine public, pas d’indexation, pas de mesure d’audience, pas de cookies.

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

`npm run build` exécute le contrôle d’identité avant Next.js. C’est aussi la commande de build sur Vercel.

## Où modifier les textes

- `src/content/public-line.ts` — les deux phrases publiques officielles
- `src/content/en.ts` — tous les textes anglais, y compris le formulaire
- `src/content/fr-press.ts` — le dossier de presse français
- `src/content/links.ts` — titres, numéros, dates de parution et toutes les adresses sortantes
- `src/content/press-photos.ts` — cadres des photographies, avec des proportions stables

Phrase anglaise, seule formulation autorisée sur ce sujet :

> LYXAA is the audiovisual project of a producer and DJ, augmented by AI.

Phrase française, seule formulation autorisée sur ce sujet :

> LYXAA, le projet audiovisuel d'une productrice et DJ, augmenté par l'IA.

Ne pas en écrire une autre, ni la paraphraser.

## Charte graphique

Tout passe par `src/design/brand.css` (couleurs, polices, espacements) et `src/design/Wordmark.tsx` (logotype). La charte définitive arrive jeudi. En attendant : noir et blanc strict, polices système, wordmark en texte brut. Le gris est réservé au texte secondaire et aux emplacements photographiques. Ces emplacements affichent exactement `PHOTO`.

## Liens d’écoute

Une chaîne vide dans `src/content/links.ts` masque le bouton. Il ne faut pas inventer d’adresse. Spotify reste vide tant qu’une adresse vérifiée n’est pas fournie. Quiet Fire et Keep the Time n’ont pas de page Deezer : leur champ Deezer reste vide. Les dates s’affichent telles qu’elles ont été données (`11/11/2026`, `04/11/2026`, `01/11/2026`), sans conversion. Chaque lien est une ancre simple, `target="_blank"` et `rel="noopener noreferrer"`. Aucun lecteur n’est intégré.

## Formulaire de booking

La page Live envoie `POST /api/booking`. Le navigateur et le serveur valident les mêmes règles (`src/lib/booking-validate.ts`). Un champ caché, `website`, sert de pot de miel : s’il est rempli, la route répond comme en prévisualisation et n’envoie rien.

Sans variable d’envoi, la route valide la demande et répond `{ "ok": true, "mode": "preview" }`. Rien n’est stocké, rien n’est transmis.

Pour brancher un prestataire plus tard, sans créer de compte dans le dépôt :

1. Webhook. Définir `BOOKING_WEBHOOK_URL` avec une adresse `https`. La route poste ce JSON :

```json
{
  "name": "",
  "company": "",
  "email": "",
  "eventType": "club",
  "date": "2026-12-12",
  "city": "",
  "budget": "",
  "message": ""
}
```

`eventType` vaut `club`, `brand`, `festival`, `private` ou `other`. `budget` vaut une des clés de `src/content/en.ts`, ou une chaîne vide.

2. Resend. Définir `RESEND_API_KEY`, `BOOKING_FROM_EMAIL` et `BOOKING_TO_EMAIL`. La route appelle l’API HTTPS de Resend. Si la clé est présente mais qu’un des deux e-mails manque, la route renvoie une erreur de configuration et n’annonce pas un envoi.

Les deux peuvent être définis ensemble. Un échec d’envoi renvoie une erreur. Le modèle est dans `.env.example`. Ne pas committer de secret.

## Prévisualisation protégée sur Vercel

Aucun fichier de configuration Vercel n’est nécessaire pour builder.

1. Importer le projet. Laisser la commande de build sur `npm run build`.
2. Ne pas attacher de domaine public.
3. Activer Deployment Protection (authentification Vercel ou mot de passe).
4. Laisser `SITE_INDEXABLE` non défini.
5. Vérifier `/robots.txt` : `Disallow: /`. Vérifier qu’une page porte `noindex, nofollow`.

`SITE_INDEXABLE=true` lève le blocage d’indexation (métadonnées, en-tête `X-Robots-Tag`, et `robots.txt`). Ne le faire qu’à l’ouverture publique, puis redéployer.

## Liste avant l’ouverture publique

- Remplacer la charte dans `src/design/`
- Faire relire les textes anglais et le dossier de presse français
- Remplacer les textes provisoires : biographie longue, fiche technique, photographies, EPK
- Faire rédiger les mentions légales et la confidentialité
- Ajouter les adresses Spotify seulement quand elles sont vérifiées
- Publier les dates de concert
- Brancher le booking, puis décrire ce traitement dans la page confidentialité avant l’ouverture
- Confirmer qu’aucune image de l’artiste n’a été générée
- Lancer `npm run check:identity`
- Passer `SITE_INDEXABLE=true` seulement au moment de l’ouverture, et retirer la protection de déploiement seulement à ce moment-là

## Identité publique

`scripts/check-public-identity.mjs` échoue si un prénom ou un nom civil apparaît dans le dépôt, en dehors de ce script. Les valeurs y sont encodées. Ne pas les écrire dans le code, les commentaires, les textes, les textes alternatifs ou ce fichier.

## Captures

Les captures de pages sont dans `docs/screenshots/`. Les notes et la spécification sont dans `docs/notes.md` et `docs/specs.md`.
