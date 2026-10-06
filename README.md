# Maison d’An

Site vitrine one-page en français pour Maison d’An, maison créative burundaise.

## Modifier le contenu

Le contenu éditorial et les données de cartes sont centralisés dans `src/data/content.ts` : navigation, services, destinations, projets, actualités, galerie et filtres. Pour ajouter un projet, ajoutez une entrée au tableau `projects` et placez son image dans `public/images/`.

## Remplacer les images

Les images locales se trouvent dans `public/images/` et sont appelées par leur chemin `/images/...` dans `src/data/content.ts` et les sections. Remplacez les fichiers en conservant leur nom ou changez les chemins. Les images sont chargées à la demande; aucun service d’images externe n’est requis.

## Formulaire et livraison e-mail

Le formulaire utilise le hook généré `useCreateContactRequest` de `@workspace/api-client-react` et envoie les demandes à `/api/contact`. Les requêtes sont persistées côté serveur. La livraison e-mail n’est pas encore configurée : l’équipe backend peut relier l’acceptation de la requête à Resend ou Nodemailer, configurer les secrets et retourner le résultat `{ accepted, message }`. Aucun appel API manuel n’est effectué côté interface.

## Développement et déploiement

Installez les dépendances avec `npm install`, puis lancez le site avec `npm run dev`. Vérifiez les types avec `npm run typecheck`. Le formulaire envoie ses demandes à `/api/contact`; une API compatible doit être disponible à cette adresse.

Pour le publier avec Replit, utilisez l’action de publication du projet afin que le site et l’API partagée restent accessibles ensemble. Pour Vercel, publiez le site comme application Vite statique et configurez une réécriture `/api/*` vers une instance séparément hébergée de l’API Express. Cette instance doit utiliser la même base de données et ses propres variables d’environnement.
