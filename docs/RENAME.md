# Changer le nom de scène

Compter environ cinq minutes, plus le remplacement des SVG.

1. Ouvrir `src/site.config.ts`.
2. Remplacer la seule valeur `artistName`. Ne l'écrire nulle part ailleurs.
3. Les pages, les métadonnées, les textes alternatifs et les chemins de wordmark lisent cette valeur.
4. Déposer les nouveaux wordmarks dans `public/brand/`, avec les mêmes suffixes :
   - `-wordmark-fendu-blanc.svg`
   - `-wordmark-fendu-noir.svg`
   - `-wordmark-plein-petites-tailles-blanc.svg`
   - `-wordmark-plein-petites-tailles-noir.svg`
5. Le nom de fichier commence par la nouvelle valeur de `artistName`. Supprimer les anciens SVG.
6. Les favicons du carré fendu, dans `public/favicon/`, ne contiennent pas de lettre. Les garder, sauf si le symbole change.
7. Mettre à jour l'assertion du nom dans `tests/site.test.ts`.
8. Lancer `npm run check:identity`, puis `npm test` et `npm run build`.

`NEXT_PUBLIC_SITE_URL` reste vide tant qu'il n'y a pas de domaine. Ne pas inventer d'adresse.
