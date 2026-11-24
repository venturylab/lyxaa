# Notes de projet

## Décisions

- L’anglais porte le site. Le français ne couvre que le dossier de presse, avec une bascule EN / FR sur ces pages.
- La phrase publique est centralisée. Elle sert de ligne d’accueil et de biographie courte. Aucune autre formulation n’est ajoutée.
- La charte de jeudi n’est pas devinée. Le site est noir et blanc, avec des polices système et un wordmark texte, tous remplaçables dans `src/design/`.
- Aucune photographie n’est utilisée. Les cadres gris affichent `PHOTO` et gardent une proportion fixe (`4 / 5`, `4 / 5`, `3 / 2`).
- Les liens d’écoute sont de vraies ancres. Pas de lecteur intégré, pour éviter les cookies et les textes de plateforme.
- Spotify n’a pas d’adresse vérifiée : les champs restent vides et les boutons restent cachés.
- L’absence de Deezer sur Quiet Fire et Keep the Time est confirmée, ce n’est pas un oubli.
- Les dates de parution sont affichées telles quelles.
- Le booking de prévisualisation ne crée pas de compte et n’envoie rien tant qu’une variable d’environnement n’est pas posée.
- L’indexation est coupée par défaut, avec un seul interrupteur pour l’ouverture.

## Ce qui reste provisoire

- Biographie longue, en anglais et en français
- Fiche technique
- Photographies de presse
- Fichier EPK téléchargeable
- Adresse directe de booking
- Mentions légales
- Politique de confidentialité
- Dates de concert
- Adresses Spotify
- Paliers de budget du formulaire
- Logotype, polices et éventuelle palette, à l’arrivée de la charte
- Domaine public et passage de `SITE_INDEXABLE` à vrai

## Captures

Fichiers dans `docs/screenshots/`, largeur puis langue. Le français n’existe que pour le dossier de presse.

- `home-en-1440.png`, `home-en-390.png`
- `music-en-1440.png`, `music-en-390.png`
- `live-en-1440.png`, `live-en-390.png`
- `press-en-1440.png`, `press-en-390.png`
- `press-fr-1440.png`, `press-fr-390.png`
- `legal-en-1440.png`, `legal-en-390.png`
- `privacy-en-1440.png`, `privacy-en-390.png`

Contrôle du formulaire, en plus des pages :

- `live-en-1440-errors.png`
- `live-en-1440-sent.png`
- `live-en-390-sent.png`
