# Noah Grynko — Site portfolio / CV

Site personnel présentant le profil de Noah Grynko, élève en seconde professionnelle MTNE au lycée Ampère (Josselin), à la recherche d'un stage d'observation en électricité / informatique / réseaux.

Site statique en HTML / CSS / JavaScript, sans framework ni dépendance externe, pensé pour être rapide, responsive et accessible.

## Structure du projet

```
.
├── index.html                     # Page unique du site
├── css/style.css                  # Styles (design responsive, thème clair/sombre)
├── js/script.js                   # Menu mobile, animations d'apparition, année du footer
├── assets/
│   ├── favicon.svg                # Favicon du site
│   └── documents/CV_Noah_Grynko.pdf   # CV téléchargeable
├── .github/workflows/deploy.yml   # Déploiement automatique sur GitHub Pages
└── README.md
```

## Développer / modifier le site en local

Aucune installation n'est nécessaire, il suffit de servir les fichiers statiques :

```bash
# Depuis la racine du projet
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Pour modifier le contenu :

- **Textes** : directement dans `index.html` (une seule page, sections commentées : Hero, À propos, Expériences, Formation, Compétences, Projets, Motivation, Contact).
- **Styles** : `css/style.css` (variables de couleurs en haut du fichier sous `:root`).
- **Comportement** (menu mobile, animations) : `js/script.js`.
- **CV téléchargeable** : remplacer `assets/documents/CV_Noah_Grynko.pdf` par une nouvelle version (garder le même nom de fichier, ou mettre à jour le lien dans `index.html`).

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
