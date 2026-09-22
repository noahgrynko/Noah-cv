# Noah Grynko — CV interactif & portfolio

CV interactif présentant le profil de Noah Grynko, élève en seconde professionnelle MTNE au lycée Ampère (Josselin), à la recherche d'un stage d'observation en électricité / informatique / réseaux. Toutes les informations du CV (parcours, expériences, compétences, projets, lettre de motivation) sont consultables directement sur le site — le PDF n'est qu'une option secondaire.

Site statique en HTML / CSS / JavaScript, sans framework ni dépendance externe (seul un fichier de police "JetBrains Mono" est chargé depuis Google Fonts pour les accents typographiques), pensé pour être rapide, responsive et accessible.

## Structure du projet

```
.
├── index.html                     # Page unique du site (toutes les sections)
├── css/style.css                  # Design tokens, thèmes clair/sombre, layout, animations
├── js/script.js                   # Thème (+ persistance), nav active au scroll, animations,
│                                   # timeline animée, copier l'email, menu mobile
├── assets/
│   ├── favicon.svg                # Favicon du site
│   └── documents/CV_Noah_Grynko.pdf   # CV en PDF (option secondaire)
├── .github/workflows/deploy.yml   # Déploiement automatique sur GitHub Pages
└── README.md
```

## Fonctionnalités

- **CV interactif complet** : parcours, formation, expériences (timeline animée), compétences catégorisées, projets, et lettre de motivation intégrale — rien n'est caché derrière un PDF.
- **Thèmes clair / sombre / système**, avec choix mémorisé (`localStorage`) et hiérarchie visuelle propre à chaque thème (pas une simple inversion de couleurs).
- **Navigation active au scroll** (scrollspy), barre de progression de lecture, menu mobile plein écran.
- **Animations sobres** : apparition progressive au scroll, timeline qui se construit, micro-interactions sur les boutons/cartes — désactivées automatiquement si `prefers-reduced-motion` est actif.
- **Contenu visible sans JavaScript** (dégradation progressive) et sans erreur console.

## Développer / modifier le site en local

Aucune installation n'est nécessaire, il suffit de servir les fichiers statiques :

```bash
# Depuis la racine du projet
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Pour modifier le contenu :

- **Textes** : directement dans `index.html` (une seule page, sections : Accueil, À propos, Parcours, Expériences, Compétences, Projets, Motivation, Contact).
- **Styles / couleurs** : `css/style.css` — les tokens de couleur sont définis sous `:root` (thème clair) et `:root[data-theme="dark"]` (thème sombre) ; les deux blocs doivent rester cohérents entre eux.
- **Comportement** (thème, menu mobile, animations, scrollspy) : `js/script.js`.
- **CV téléchargeable** : remplacer `assets/documents/CV_Noah_Grynko.pdf` par une nouvelle version (garder le même nom de fichier, ou mettre à jour le lien dans `index.html`). Ce fichier reste secondaire : pense à mettre à jour aussi le contenu correspondant dans `index.html`.

## Déploiement (GitHub Pages)

Le déploiement est automatisé via GitHub Actions (`.github/workflows/deploy.yml`) : chaque push sur la branche par défaut du dépôt (actuellement `claude/noah-cv-site-60yqt6`, ou `main` si le dépôt est réorganisé plus tard) reconstruit et republie le site sur GitHub Pages, sans étape manuelle.

Le site est disponible à l'adresse :

```
https://noahgrynko.github.io/Noah-cv/
```

## Stack technique

- HTML5 sémantique
- CSS3 (variables custom, Grid/Flexbox, `prefers-color-scheme`, `prefers-reduced-motion`)
- JavaScript vanilla (aucune dépendance)
- GitHub Actions + GitHub Pages pour l'hébergement
