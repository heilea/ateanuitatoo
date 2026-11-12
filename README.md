# Ateanui Tattoo — site portfolio

Site d'une seule page pour Ateanui Tattoo (patu tiki). Une liste de projets
défile sur le côté ; les photos du projet sélectionné flottent à l'écran et
s'agrandissent au clic. La réservation se fait par DM Instagram.

Site statique : pas de serveur ni de base de données. Le code est dans `web/`.

## Prérequis

- [Node.js](https://nodejs.org) 20 ou plus récent

## Lancer le site en local

```bash
cd web
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173 et se met à jour à chaque
enregistrement.

## Modifier le contenu

### Ajouter ou renommer un projet

1. Créer un dossier dans `web/public/images/`, par exemple `chest/`.
2. Y déposer les photos nommées `1.jpg`, `2.jpg`, `3.jpg`…
3. Ajouter une ligne dans `web/src/data/projects.js` :

```js
{ name: 'Nom du projet', sub: 'Zone du corps', folder: 'chest', count: 5 },
```

`count` est le nombre de photos du dossier.

### Ajouter des photos à un projet existant

1. Déposer les nouvelles photos dans le dossier du projet, à la suite des
   autres : s'il y a déjà `1.jpg` à `6.jpg`, la suivante s'appelle `7.jpg`.
   Ne pas laisser de trou dans la numérotation.
2. Mettre à jour `count` sur la ligne du projet dans
   `web/src/data/projects.js`.

Six cartes au maximum s'affichent en même temps sur ordinateur. Quand un
dossier contient plus de photos, deux possibilités :

- **Tirage au hasard (réglage par défaut).** Les cartes restent au nombre de
  six, mais les photos sont tirées au hasard dans le dossier à chaque
  sélection du projet. Réglage `RANDOM_PHOTOS` en bas de
  `web/src/data/projects.js` : `true` pour le tirage au hasard, `false`
  pour toujours afficher les premières photos (`1.jpg`, `2.jpg`…).
- **Découper en plusieurs entrées.** Créer un second dossier (par exemple
  `forearm-2/`) et une seconde ligne dans la liste (par exemple
  `Forearm II`). Aucun code à modifier, et chaque photo a sa place fixe.

### Photos

- Format JPG, au moins 1 600 px sur le grand côté pour rester nettes une fois
  agrandies, 300 à 500 Ko chacune.
- Photo de fond : `web/public/images/fond.jpg`.
- Tant qu'une photo manque, un cadre « Photo 1 » la remplace.

### Liens Instagram

Dans `web/src/data/site.js` (`INSTAGRAM_URL` et `DM_URL`).

### Couleurs

À modifier ensemble dans deux fichiers :

- `web/src/styles/tokens.css` : fond, textes, accents ;
- `web/src/data/theme.js` : lumière, fumée, reflet du bouton.

### Effets

Les réglages de la lumière, de la fumée (`intensity`, `trail`, `size`) et du
grain sont dans `web/src/components/Background/Background.jsx`.
Sur téléphone et tablette, la lumière est désactivée et la fumée est en qualité réduite.

## Mettre en ligne

```bash
cd web
npm run build
```

Le dossier `web/dist` contient le site prêt à publier. Le déposer sur un
hébergeur statique (Netlify, Cloudflare Pages, GitHub Pages…).

Avant la mise en ligne, compléter dans `web/index.html` les balises d'aperçu
de partage : `og:url` et `og:image` (adresses complètes en https, image de
1200 × 630 px).

## Organisation du code

```
web/src/
├─ App.jsx        assemble les blocs
├─ data/          projets, liens, couleurs
├─ hooks/         navigation (molette, clavier, glisser)
├─ lib/           utilitaires
├─ styles/        couleurs, polices, règles globales
└─ components/
   ├─ Background/      photo de fond, lumière, fumée, grain
   ├─ Header/          logo et boutons
   ├─ ProjectWheel/    liste des projets
   ├─ FloatingPhotos/  photos flottantes
   ├─ Lightbox/        photo agrandie
   ├─ Hud/             compteur
   └─ reactbits/       composants React Bits, non modifiés
```

## Crédits et licences

- Animations : [React Bits](https://reactbits.dev) — vérifier les conditions
  de leur licence avant toute revente du code.
- Polices : Pirata One et Manrope (SIL Open Font License), via Google Fonts.
- Animations des photos : [GSAP](https://gsap.com).
