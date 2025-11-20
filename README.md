# Todo-DevOps-Test

## Technologies utilisées

### Frontend
* Vue.js
* Cypress
* Node.js (pour tooling)

### Backend
* Node.js / Express
* Jest + Supertest
* MySQL

### CI/CD
* GitHub Actions
* Codecov (optionnel)
* SSH deployment

---

## 🧪 Tests

### Tests manuels

* Signup
* Login / Logout
* Profil
* Création / gestion de Todos
* Thème clair/sombre

Classification des bugs :

* **Gravité** : mineur / majeur / critique
* **Priorité** : basse / moyenne / haute

### Tests unitaires backend

* Routes **authentification**
* Routes **utilisateur**
* Routes **todos**
* Framework : Jest + Supertest

### Tests E2E frontend

* Outil : Cypress
* Navigateurs : Chrome, Edge, Firefox

Fonctionnalités testées :

* Signup
* Login / Logout
* Profil
* Création & gestion des Todos
* Navigation & thèmes

### Rapport de coverage

* Backend : Jest coverage
* Frontend : Cypress + Codecov (optionnel)

---

## 🚀 CI/CD – GitHub Actions

### Déclencheurs

* **Push sur main** → déploiement staging automatique
* **Déclenchement manuel** → déploiement production

### Étapes incluses

* Audit des dépendances
* Linting
* Tests unitaires & E2E
* Build
* Déploiement SSH
* Optimisations (cache, jobs parallèles)

### Optionnel

* Workflow vérification conflits PR
* Workflow auto-assignation des issues
* Publication des coverage via Codecov
* Badges ajoutés au README
