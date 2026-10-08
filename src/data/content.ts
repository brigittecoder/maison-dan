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
const photoByFileName = (fileName: string) => activityPhotos.find((photo) => photo.path.endsWith(`/${fileName}`))?.image;
export const heroImages = [
  photoByFileName('cf621e31-978e-4ee3-9684-e14d0d76cfa9.JPG'),
  photoByFileName('dc758fa2-fb77-44f8-8cd0-f37564c521f3.JPG'),
  photoByFileName('e5f26d7d-f141-4491-a670-89cdeded4b65.JPG'),
  photoByFileName('29b1946c-1688-4c5f-a9c8-2e6561e6c9d7.JPG'),
  photoByFileName('3b0b7297-b0ee-427e-8af5-191f827d0a72.JPG'),
  photoByFileName('c87a3917-d756-48fc-9498-44b95addc1fb.JPG'),
].filter((image): image is string => Boolean(image));

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
    intro: 'Les activités du BAIP Burundi, classées par date, et les lieux qui nous inspirent.',
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
  { id: 'lancement-baip-2026', category: 'Lancement & casting', date: '16 août 2026', title: 'Lancement officiel du BAIP Burundi 2026', excerpt: 'Le lancement du concours et le casting ont marqué le début de l’aventure BAIP Burundi 2026.', description: 'Le 16 août 2026 a eu lieu le lancement officiel du Beauty of Africa International Pageant Burundi 2026 et le casting des candidates.', images: photosFor('16Aout') },
  { id: 'visite-demi-finalistes', category: 'Culture & tourisme', date: '9 septembre 2026', title: 'Accueil des demi-finalistes et visite du Palais des Arts', excerpt: 'Les demi-finalistes ont été accueillies par la directrice générale du tourisme et ont visité le Palais des Arts.', description: 'Le 9 septembre 2026, les demi-finalistes ont été accueillies par la directrice générale du tourisme. Cette rencontre a aussi été l’occasion de visiter le Palais des Arts.', images: photosFor('9Septembre') },
  { id: 'demi-finale-baip-2026', category: 'Demi-finale', date: '19 septembre 2026', title: 'La demi-finale du BAIP Burundi 2026', excerpt: 'Les demi-finalistes se sont retrouvées au King’s Conference Center pour la demi-finale du concours.', description: 'Le 19 septembre 2026, la demi-finale du Beauty of Africa International Pageant Burundi s’est tenue au King’s Conference Center.', images: photosFor('19septembre') },
];
const activityByFolder = { '16Aout': articles[0], '9Septembre': articles[1], '19septembre': articles[2] };
const activityGalleryItems = activityPhotos.map(({ image, folder, dateLabel, photoNumber }) => ({
    title: `BAIP Burundi · ${dateLabel} · photo ${String(photoNumber).padStart(2, '0')}`,
    category: folder === '16Aout' ? 'Projets' : 'Événements',
    image,
    folder,
    activityId: activityByFolder[folder as keyof typeof activityByFolder]?.id ?? '',
    activity: activityByFolder[folder as keyof typeof activityByFolder]?.title ?? 'Activité BAIP Burundi',
    date: activityByFolder[folder as keyof typeof activityByFolder]?.date ?? `${dateLabel} 2026`,
    description: activityByFolder[folder as keyof typeof activityByFolder]?.description ?? '',
  }));
const activityGalleryPreview = ['16Aout', '9Septembre', '19septembre'].flatMap((folder) => activityGalleryItems.filter((item) => item.folder === folder).slice(0, 3));
const previewPhotoPaths = new Set(activityGalleryPreview.map((item) => item.image));
export const galleryItems = [
  ...activityGalleryPreview,
  ...activityGalleryItems.filter((item) => !previewPhotoPaths.has(item.image)),
  { title: 'Lac Tanganyika', category: 'Tourisme', image: '/images/burundi-lake.jpg', activity: 'Lieux & culture', date: '', activityId: '', description: '' },
  { title: 'Tambours de Gishora', category: 'Culture', image: '/images/gishora-drummers.jpg', activity: 'Lieux & culture', date: '', activityId: '', description: '' },
  { title: 'Collines du Burundi', category: 'Tourisme', image: '/images/kibira-hills.jpg', activity: 'Lieux & culture', date: '', activityId: '', description: '' },
  { title: 'Café burundais', category: 'Culture', image: '/images/burundi-coffee.jpg', activity: 'Lieux & culture', date: '', activityId: '', description: '' },
  { title: 'Bujumbura', category: 'Tourisme', image: '/images/bujumbura.jpg', activity: 'Lieux & culture', date: '', activityId: '', description: '' },
];
export const filters = ['Événements', 'Tourisme', 'Culture', 'Projets', 'Portraits'];
