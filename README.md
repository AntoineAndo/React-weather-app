# React Weather App

## Sujet de projet

Développement d'une application météo avec React

## Objectif

Développer une application météo permettant à l'utilisateur de rechercher la météo actuelle et les prévisions pour une ville ou un pays de son choix, avec une interface moderne et responsive.

## Fonctionnalités

- Possibilité de chercher le nom d'une ville ou d'un pays.
- Le formulaire propose suggestions automatiques en fonction de la saisie.
- Gestion des erreurs (ville/pays non valide ou non trouvé).
- Affichage de la température actuelle, des conditions météorologiques (ensoleillé, nuageux, etc.), de l'humidité et du vent.
- Prévision météo pour les 5 prochains jours avec un résumé pour chaque jour.
- Gestion du thème light/dark
- Responsive pour desktop, tablette et mobile

## Erreurs connues

- Les icônes qui représentent les conditions météo sont pixélisées sur les grands affichages.
  La raison est que ces icônes sont fournies directement par l'API de météo et comme ce sont des PNG, ils ne scalent pas correctement.

## Installation

Pour installer et lancer l'application, suivez les étapes ci-dessous :

```bash
git clone https://github.com/AntoineAndo/React-weather-app
cd react-weather-app
npm install
npm run dev
```

**Note:** Assurez-vous d'avoir ajouté le fichier `.env` fourni par mail qui contient les variables d'environnement indispensables au fonctionnement de l'application

## Utilisation

Ouvrez votre navigateur et accédez à `http://localhost:5173/` pour utiliser l'application.
