# Spécification — site LYXAA

## Identité

Le seul nom public est LYXAA.

Phrase anglaise, utilisée comme ligne d’introduction et comme biographie courte. C’est la seule formulation autorisée sur ce sujet :

> LYXAA is the audiovisual project of a producer and DJ, augmented by AI.

Phrase française, réservée au dossier de presse :

> LYXAA, le projet audiovisuel d'une productrice et DJ, augmenté par l'IA.

Le contrôle `scripts/check-public-identity.mjs` vérifie que ces phrases vivent dans `src/content/public-line.ts`, et qu’aucun prénom ni nom civil n’apparaît ailleurs que dans ce script (valeurs encodées).

## Langues

- Anglais par défaut : accueil, musique, live, presse, mentions légales, confidentialité.
- Français : uniquement `/fr/presse`.
- Bascule discrète EN / FR sur les deux pages de presse. Le pied de page propose aussi « Presse ».

## Pages

| Chemin | Rôle |
| --- | --- |
| `/` | Hero LYXAA, phrase publique, introduction, TRIPTYQUE, liens vers les autres pages |
| `/music` | TRIPTYQUE, trois morceaux, liens sortants, pages artiste |
| `/live` | Set DJ voilé pour clubs et événements de marque, dates vides, formulaire |
| `/press` | Dossier de presse anglais |
| `/fr/presse` | Dossier de presse français |
| `/legal` | Emplacement pour les mentions légales |
| `/privacy` | Emplacement pour la politique de confidentialité |

## TRIPTYQUE

Les adresses canoniques sont dans `src/content/links.ts`. Un champ vide masque le bouton. Les dates ne sont pas réinterprétées.

| N° | Titre | Date affichée | Plateformes |
| --- | --- | --- | --- |
| I | Underneath the Strobe Lights | 11/11/2026 | Apple Music, Deezer, YouTube, TIDAL, Amazon Music. Spotify vide. |
| II | Quiet Fire | 04/11/2026 | Apple Music, YouTube, TIDAL, Amazon Music. Pas de Deezer. Spotify vide. |
| III | Keep the Time | 01/11/2026 | Apple Music, YouTube, TIDAL, Amazon Music. Pas de Deezer. Spotify vide. |

Pages artiste : Apple Music et Deezer, dans le même fichier. Le libellé de plateforme est « YouTube », pas un autre nom. Liens simples, nouvel onglet, `rel="noopener noreferrer"`. Pas de lecteur intégré.

## Formulaire

Champs : nom, société ou lieu, e-mail, type d’événement, date, ville, fourchette de budget optionnelle, message, case de consentement, pot de miel `website`.

Le budget propose des paliers provisoires en euros, modifiables dans `src/content/en.ts`. Ce n’est pas une grille tarifaire publiée.

Validation commune navigateur et serveur. Sans `BOOKING_WEBHOOK_URL` ni `RESEND_API_KEY`, succès de prévisualisation, aucun envoi, aucun stockage.

## Visuel

Noir et blanc strict jusqu’à la charte de jeudi. Gris uniquement pour le texte secondaire et les rectangles `PHOTO`. Pas de dégradé, pas de photographie, pas d’image générée de l’artiste. Jetons dans `src/design/brand.css`. Wordmark texte dans `src/design/Wordmark.tsx`.

## Technique

Next.js (App Router), TypeScript, Tailwind. Pages statiques, sauf `POST /api/booking`. Déployable sur Vercel sans fichier de configuration supplémentaire.

`SITE_INDEXABLE` est le seul interrupteur d’indexation. Non défini : `noindex, nofollow`, en-tête `X-Robots-Tag`, et `robots.txt` en `Disallow: /`. Pas d’analytics, pas de cookies, pas de domaine inventé.
