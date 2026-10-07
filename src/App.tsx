import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Header } from './components/Header';
import { Icon, WhatsAppIcon } from './components/Icons';
import { About, Gallery, Hero, News, Projects, Services, Tourism } from './components/Sections';
import { Contact } from './components/Contact';
import { navItems, pageCopy, services } from './data/content';

const queryClient = new QueryClient();
function Footer() {
  return <footer className="footer"><div className="section-wrap"><div className="footer-main">
    <div className="footer-brand"><a className="brand" href="#accueil" aria-label="Maison d’An, accueil"><img className="brand-logo" src="/maisondan_logo.png" alt="Maison d’An" /></a><p>{pageCopy.brand.tagline}</p><div className="social-row"><a href={pageCopy.brand.instagramUrl} aria-label="Instagram Maison d’An" target="_blank" rel="noreferrer"><Icon name="instagram" /></a><a href={pageCopy.brand.whatsappUrl} aria-label="WhatsApp Maison d’An" target="_blank" rel="noreferrer"><WhatsAppIcon /></a><a href={`mailto:${pageCopy.brand.email}`} aria-label="Écrire à Maison d’An"><Icon name="mail" /></a></div></div>
    <div className="footer-col"><h3>Explorer</h3>{navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</div>
    <div className="footer-col"><h3>Services</h3>{services.map((item) => <a key={item.title} href="#services">{item.title}</a>)}</div>
    <div className="footer-col footer-contact"><h3>Contact</h3><a href={pageCopy.brand.whatsappUrl}>{pageCopy.brand.phone}</a><a href={`mailto:${pageCopy.brand.email}`}>{pageCopy.brand.email}</a><span>{pageCopy.brand.location}</span><a className="footer-contact-link" href="#contact">Parlons de votre projet <Icon name="arrow" size={14} /></a></div>
  </div><div className="footer-bottom"><span>{pageCopy.brand.copyright}</span><a href="#accueil">Retour en haut ↑</a><span>Fait avec cœur au Burundi</span></div></div></footer>;
}
function Home() {
  const [active, setActive] = useState('accueil');
  useEffect(() => {
    document.title = `${pageCopy.brand.name} — ${pageCopy.brand.tagline}`;
    const initialSection = window.location.hash.slice(1);
    if (initialSection) {
      window.requestAnimationFrame(() => {
        document.getElementById(initialSection)?.scrollIntoView();
      });
    }
    const description = pageCopy.hero.description;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title'); ogTitle.setAttribute('content', `${pageCopy.brand.name} — ${pageCopy.brand.tagline}`);
    if (!ogTitle.parentElement) document.head.appendChild(ogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description'); ogDesc.setAttribute('content', description);
    if (!ogDesc.parentElement) document.head.appendChild(ogDesc);
    const ogImage = document.querySelector('meta[property="og:image"]') ?? document.createElement('meta');
    ogImage.setAttribute('property', 'og:image'); ogImage.setAttribute('content', '/maisondan_logo.png');
    if (!ogImage.parentElement) document.head.appendChild(ogImage);
    const ogLocale = document.querySelector('meta[property="og:locale"]') ?? document.createElement('meta');
    ogLocale.setAttribute('property', 'og:locale'); ogLocale.setAttribute('content', 'fr_FR');
    if (!ogLocale.parentElement) document.head.appendChild(ogLocale);
    const twitter = document.querySelector('meta[name="twitter:card"]') ?? document.createElement('meta');
    twitter.setAttribute('name', 'twitter:card'); twitter.setAttribute('content', 'summary_large_image');
    if (!twitter.parentElement) document.head.appendChild(twitter);
    const html = document.documentElement; html.lang = 'fr';
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-22% 0px -60% 0px', threshold: [0, .15, .35] });
    navItems.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell"><Header active={active} /><main><Hero /><About /><Services /><Tourism /><Projects /><News /><Gallery /><Contact /></main><Footer />
    <a className="whatsapp-float" href={pageCopy.brand.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contacter Maison d’An sur WhatsApp"><WhatsAppIcon size={25} /><span>Discutons</span></a>
  </div>;
}
function GalleryPage() {
  useEffect(() => { document.title = `Galerie — ${pageCopy.brand.name}`; }, []);
  return <div className="gallery-page">
    <header className="gallery-page-header section-wrap"><a className="brand" href="/" aria-label="Retour à l’accueil"><img className="brand-logo" src="/maisondan_logo.png" alt="Maison d’An" /></a><a className="btn-secondary" href="/">Retour au site <Icon name="arrow" size={15} /></a></header>
    <main><Gallery fullPage /></main>
    <footer className="gallery-page-footer"><span>{pageCopy.brand.copyright}</span><a href="/">Retour à l’accueil</a></footer>
  </div>;
}
function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/galerie" component={GalleryPage} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;
