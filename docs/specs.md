# Spécification

## Nom

Une seule valeur, `artistName`, dans `src/site.config.ts`. Le reste du site l'interpole. Aucun domaine n'est écrit. `NEXT_PUBLIC_SITE_URL` est vide par défaut et ne produit pas de balise canonique tant qu'il l'est.

## Langues

Anglais par défaut. Français uniquement pour `/fr/presse`, avec la bascule EN / FR.

## Phrases

Courte, en anglais : Producer and DJ. Black and white. AI is one of the instruments. The sets are real.

Mention, pied de page de chaque page et dossier de presse : Music and visuals made using AI.

Presse française : L'IA est l'un des instruments. Les sets sont réels. Mention : Musique et visuels créés à l'aide de l'IA.

On n'écrit pas que les voix sont humaines. On ne cite pas d'autre projet. On ne montre pas de visage : cadres gris `PHOTO` seulement.

La signature « Light freezes. Fire slows. Time leaves a trace. » apparaît une fois, sur l'accueil, hors de la zone de protection du logo. Ce n'est pas le titre.

## Pages

| Chemin | Rôle |
| --- | --- |
| `/` | Wordmark, phrase courte, signature, TRIPTYQUE |
| `/music` | Trois titres et liens sortants |
| `/live` | DJ set pour clubs et événements de marque, dates vides, formulaire |
| `/press` | Dossier de presse anglais |
| `/fr/presse` | Dossier de presse français |
| `/legal` | Emplacement pour les mentions légales |
| `/privacy` | Emplacement pour la confidentialité |

## TRIPTYQUE

Adresses dans `src/content/links.ts`. Champ vide : bouton masqué. Dates affichées telles quelles.

| N° | Titre | Date | Plateformes |
| --- | --- | --- | --- |
| I | Underneath the Strobe Lights | 11/11/2026 | Apple Music, Deezer, YouTube, TIDAL, Amazon Music. Spotify vide. |
| II | Quiet Fire | 04/11/2026 | Apple Music, YouTube, TIDAL, Amazon Music. Pas de Deezer. Spotify vide. |
| III | Keep the Time | 01/11/2026 | Apple Music, YouTube, TIDAL, Amazon Music. Pas de Deezer. Spotify vide. |

## Visuel

Fond `#0B0B0C`. Surface `#2B2B2A`. Texte secondaire `#8C8A85`. Filets `#D8D5CE`. Texte et logo `#F4F1EA`. Pas de blanc pur hors d'une photo. Pas de couleur d'accent.

Titres et navigation : Mona Sans étroite élargie (largeur 125, graisse 300), capitales, approche 0,24 em. Texte long : Newsreader. Lignes de crédit : Mona Sans. Les deux polices sont locales, avec leurs licences OFL.

Wordmark fendu à partir de 60 px de haut de capitale. Version petites tailles en dessous. Favicon : carré fendu, y compris les variantes sombres et l'icône 180 px.

## Formulaire et indexation

Mêmes champs qu'avant. Mode prévisualisation sans prestataire. `noindex` et `robots.txt` en refus tant que `SITE_INDEXABLE` n'est pas `true`. Pas de mesure d'audience.
