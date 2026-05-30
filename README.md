# TODO LIST PWA — React + Vite

Application de gestion de tâches (PWA) construite avec React et Vite.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou v20 LTS (recommandé)
- [PHP](https://www.php.net/) (optionnel, pour servir le build en local)

---

## Installation

```bash
npm install
```

---

## Lancer le projet en développement

> Démarre les deux serveurs en parallèle — l'app React **et** l'API.

**1. Démarrer l'API**

```bash
npm run api:start
```

**2. Démarrer l'app React (dans un autre terminal)**

```bash
npm run dev
```

L'application est accessible sur : `http://localhost:5173`  
L'API est accessible sur : `http://localhost:7000/todos`

---

## Restaurer les données de l'API

```bash
npm run api:restore
```

---

## Build de production

```bash
npm run build
```

Les fichiers compilés sont générés dans le dossier `dist/`.

---

## Tester le build en local

```bash
# Avec Vite (recommandé)
npm run preview

# Avec PHP
npm run serve
```

## Récapitulatif des commandes

| Commande | Description |
|---|---|
| `npm install` | Installe les dépendances |
| `npm run dev` | Lance l'app en mode développement |
| `npm run api:start` | Lance l'API locale (port 7000) |
| `npm run api:restore` | Remet les données de l'API à zéro |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build avec Vite |
| `npm run serve` | Prévisualise le build avec PHP |
| `npm run lint` | Vérifie la qualité du code |