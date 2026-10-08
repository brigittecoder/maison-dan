const activityPhotoModules = import.meta.glob<string>('../assets/activity_*/*.JPG', { eager: true, query: '?url', import: 'default' });
const folderPhotoCounts: Record<string, number> = {};
const activityOrder: Record<string, number> = { '16Aout': 0, '9Septembre': 1, '19septembre': 2 };
const activityPhotos = Object.entries(activityPhotoModules).sort(([left], [right]) => {
  const leftFolder = left.match(/activity_(.*?)\//)?.[1] ?? '';
  const rightFolder = right.match(/activity_(.*?)\//)?.[1] ?? '';
  return (activityOrder[leftFolder] ?? 9) - (activityOrder[rightFolder] ?? 9) || left.localeCompare(right);
}).map(([path, image]) => {
  const folder = path.match(/activity_(.*?)\//)?.[1] ?? 'activité';
  const dateLabel = folder === '16Aout' ? '16 août' : folder === '9Septembre' ? '9 septembre' : '19 septembre';
  folderPhotoCounts[folder] = (folderPhotoCounts[folder] ?? 0) + 1;
  return { path, image, folder, dateLabel, photoNumber: folderPhotoCounts[folder] };
});
const photosFor = (folder: string) => activityPhotos.filter((photo) => photo.folder === folder).map((photo) => photo.image);

export const pageCopy = {
  hero: {
    badge: 'Communication • Événementiel • Tourisme',
    title: 'MAISON',
    titleAccent: 'AN',
    tagline: 'Créer. Connecter. Promouvoir.',
    description: 'Maison d’An est une maison créative burundaise spécialisée dans la communication, le marketing, l’événementiel, l’image et la promotion du tourisme.',
    cta: 'Découvrir Maison d’An',
    caption: 'Une maison créative, au cœur du Burundi',
    stats: [['5+', 'Services'], ['1', 'Vision'], ['100%', 'Burundi'], ['∞', 'Créativité']],
  },
  about: {
    title: 'À propos de',
    titleAccent: 'Maison d’An',
    paragraphs: [
      'Maison d’An accompagne les entreprises, organisations, événements et initiatives dans leur communication, leur visibilité et leur développement.',
      'Nous créons des idées, des expériences et des connexions qui contribuent à valoriser les talents, les projets et l’image du Burundi.',
    ],
    vision: 'Voir un Burundi développé.',
    mission: 'Promouvoir la créativité, les talents, les femmes, les entreprises, les événements et la beauté du Burundi à travers la communication et des expériences significatives.',
  },
  servicesSection: {
    title: 'Ce que',
    titleAccent: 'nous faisons',
    intro: 'Des idées aux expériences, nous donnons vie aux projets qui font rayonner le Burundi.',
  },
  tourism: {
    title: 'DÉCOUVREZ',
    titleSecondLine: 'LE',
    titleAccent: 'BURUNDI',
    quote: 'Découvrez la beauté, la culture et les histoires du Burundi.',
    intro: 'Maison d’An contribue à promouvoir le Burundi en mettant en avant :',
    tags: ['Culture', 'Nature', 'Patrimoine', 'Gastronomie', 'Peuple', 'Expériences'],
    subheading: 'À découvrir',
    cta: 'EXPLORER LE BURUNDI',
  },
  projects: {
    title: 'Nos',
    titleAccent: 'projets',
    intro: 'Découvrez les projets réalisés par Maison d’An.',
    placeholder: 'Prochainement',
  },
  news: {
    title: 'Dernières',
    titleAccent: 'actualités',
    intro: 'Retour sur les temps forts du BAIP Burundi 2026 : du lancement et casting à la demi-finale.',
  },
  gallery: {
    title: 'Notre',
    titleAccent: 'galerie',
    intro: 'Un regard sur les lieux, les histoires et les moments qui nous inspirent.',
    allFilter: 'Tous',
  },
  contact: {
    title: 'TRAVAILLONS',
    titleAccent: 'ENSEMBLE',
    intro: 'Pour toute demande de collaboration ou d’information, contactez-nous directement par WhatsApp, e-mail ou Instagram.',
  },
  brand: {
    name: 'Maison d’An',
    tagline: 'Créer. Connecter. Promouvoir.',
    location: 'Bujumbura, Burundi',
    phone: '+25765087149',
    email: 'ndikumanaannielauriane@gmail.com',
    instagramHandle: "@maisond'an257",
    instagramUrl: 'https://www.instagram.com/maisondan257/',
    whatsappUrl: 'https://wa.me/25765087149',
    coordinates: '03°22′S · 29°22′E',
    copyright: '© 2025 Maison d’An. Tous droits réservés. Bujumbura, Burundi',
  },
};

export const navItems = [
  { label: 'Accueil', id: 'accueil' }, { label: 'À propos', id: 'apropos' },
  { label: 'Services', id: 'services' }, { label: 'Tourisme', id: 'tourisme' },
  { label: 'Projets', id: 'projets' }, { label: 'Actualités', id: 'actualites' },
  { label: 'Galerie', id: 'galerie' }, { label: 'Contact', id: 'contact' },
];
export const services = [
  { title: 'Communication', description: 'Stratégie de communication, réseaux sociaux et relations publiques.', icon: 'message' },
  { title: 'Marketing', description: 'Promotion des marques, visibilité et marketing digital.', icon: 'chart' },
  { title: 'Événementiel', description: 'Organisation et coordination d’événements professionnels et culturels.', icon: 'calendar' },
  { title: 'Image & Pageantry', description: 'Image, représentation et accompagnement des événements de beauté.', icon: 'crown' },
  { title: 'Promotion touristique', description: 'Valorisation des destinations, de la culture et du patrimoine burundais.', icon: 'location' },
];
export const tourismDestinations = [
  { name: 'Gishora', category: 'Culture', image: '/images/gishora-drummers.jpg' },
  { name: 'Lac Tanganyika', category: 'Nature', image: '/images/burundi-lake.jpg' },
  { name: 'Chutes de Karera', category: 'Nature', image: '/images/chutes-de-karera.jpg' },
  { name: 'Kibira', category: 'Nature', image: '/images/kibira-hills.jpg' },
  { name: 'Gitega', category: 'Patrimoine', image: '/images/gitega.jpeg' },
  { name: 'Bujumbura', category: 'Ville', image: '/images/bujumbura.jpg' },
  { name: 'Café burundais', category: 'Gastronomie', image: '/images/burundi-coffee.jpg' },
  { name: 'Culture et traditions burundaises', category: 'Culture', image: '/images/culture-burundaise.jpg' },
];
export const projects = [
  { title: 'BAIP Burundi 2026', subtitle: 'Beauty of Africa International Pageant — Burundi', category: 'Image & Pageantry', images: photosFor('19septembre') },
];
export const articles = [
  { category: 'Lancement & casting', date: '16 août 2026', title: 'Lancement officiel du BAIP Burundi 2026', excerpt: 'Le lancement du concours et le casting ont marqué le début de l’aventure BAIP Burundi 2026.', images: photosFor('16Aout') },
  { category: 'Culture & tourisme', date: '9 septembre 2026', title: 'Rencontre avec la directrice générale du tourisme', excerpt: 'Les demi-finalistes ont été accueillies par la directrice générale du tourisme et ont visité le Palais des Arts.', images: photosFor('9Septembre') },
  { category: 'Demi-finale', date: '19 septembre 2026', title: 'La demi-finale du BAIP Burundi 2026', excerpt: 'Les demi-finalistes se sont retrouvées au King’s Conference Center pour la demi-finale du concours.', images: photosFor('19septembre') },
];
const activityGalleryItems = activityPhotos.map(({ image, folder, dateLabel, photoNumber }) => ({
    title: `BAIP Burundi · ${dateLabel} · photo ${String(photoNumber).padStart(2, '0')}`,
    category: folder === '16Aout' ? 'Projets' : 'Événements',
    image,
    folder,
  }));
const activityGalleryPreview = ['16Aout', '9Septembre', '19septembre'].flatMap((folder) => activityGalleryItems.filter((item) => item.folder === folder).slice(0, 3));
const previewPhotoPaths = new Set(activityGalleryPreview.map((item) => item.image));
export const galleryItems = [
  ...activityGalleryPreview,
  ...activityGalleryItems.filter((item) => !previewPhotoPaths.has(item.image)),
  { title: 'Lac Tanganyika', category: 'Tourisme', image: '/images/burundi-lake.jpg' },
  { title: 'Tambours de Gishora', category: 'Culture', image: '/images/gishora-drummers.jpg' },
  { title: 'BAIP Burundi 2026 · King’s Conference Center', category: 'Projets', image: photosFor('19septembre')[0] },
  { title: 'Collines du Burundi', category: 'Tourisme', image: '/images/kibira-hills.jpg' },
  { title: 'Café burundais', category: 'Culture', image: '/images/burundi-coffee.jpg' },
  { title: 'Bujumbura', category: 'Tourisme', image: '/images/bujumbura.jpg' },
];
export const filters = ['Événements', 'Tourisme', 'Culture', 'Projets', 'Portraits'];
