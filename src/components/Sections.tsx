import { useEffect, useRef, useState } from 'react';
import { articles, filters, galleryItems, pageCopy, projects, services, tourismDestinations } from '../data/content';
import { Icon } from './Icons';

function Photo({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return <div className={`photo-frame ${loaded ? 'loaded' : 'image-skeleton'} ${className}`}><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} /></div>;
}
function SlideshowPhoto({ images, alt, className = '' }: { images: string[]; alt: string; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % images.length), 3800);
    return () => window.clearInterval(timer);
  }, [images.length]);
  if (!images.length) return null;
  return <Photo key={images[index]} src={images[index]} alt={alt} className={`slideshow-photo ${className}`} />;
}
export function Hero() {
  return <section id="accueil" className="hero section-wrap">
    <div className="hero-copy fade-up">
      <span className="hero-pill"><i /> {pageCopy.hero.badge}</span>
      <h1>{pageCopy.hero.title}<br />D’<em>{pageCopy.hero.titleAccent}</em></h1>
      <h2>{pageCopy.hero.tagline}</h2>
      <p>{pageCopy.hero.description}</p>
      <a className="btn-primary" href="#apropos" data-testid="link-hero-about">{pageCopy.hero.cta} <Icon name="arrow" className="arrow" size={18} /></a>
      <div className="hero-caption"><span className="caption-line" /> {pageCopy.hero.caption}</div>
    </div>
    <div className="hero-visual">
      <Photo src="/images/burundi-lake.jpg" alt="Le lac Tanganyika et les collines du Burundi à la lumière du soir" className="hero-image" eager />
      <div className="hero-location"><span className="hero-location-dot" aria-hidden="true" /><span>{pageCopy.brand.location}<b>{pageCopy.brand.coordinates}</b></span></div>
    </div>
    <div className="stats-row">{pageCopy.hero.stats.map(([num, label]) => <div className="stat-item" key={label}><strong>{num}</strong><span>{label}</span></div>)}</div>
  </section>;
}
export function About() {
  return <section id="apropos" className="about-section section-wrap">
    <div className="about-heading">
      <div><span className="eyebrow">À propos</span><h2 className="section-title">{pageCopy.about.title}<br /><em>{pageCopy.about.titleAccent}</em></h2></div>
      <div className="about-text">{pageCopy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
    <div className="about-cards">
      <article className="about-card vision"><Photo src="/images/kibira-hills.jpg" alt="Collines verdoyantes du Burundi" /><div className="about-overlay" /><span className="round-icon"><Icon name="location" size={21} /></span><div className="about-card-copy"><small>Notre vision</small><h3>{pageCopy.about.vision}</h3><span className="card-index">01 / 02</span></div></article>
      <article className="about-card mission"><Photo src="/images/gishora-drummers.jpg" alt="Les tambours traditionnels du Burundi" /><div className="about-overlay" /><span className="round-icon"><Icon name="crown" size={21} /></span><div className="about-card-copy"><small>Notre mission</small><h3>{pageCopy.about.mission}</h3><span className="card-index">02 / 02</span></div></article>
    </div>
  </section>;
}
export function Services() {
  return <section id="services" className="services-section">
    <div className="section-wrap"><div className="section-head centered"><span className="eyebrow">Services</span><h2 className="section-title">{pageCopy.servicesSection.title} <em>{pageCopy.servicesSection.titleAccent}</em></h2><p className="body-copy">{pageCopy.servicesSection.intro}</p></div>
      <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title} data-testid={`card-service-${index + 1}`}><div className="service-top"><span className="service-icon"><Icon name={service.icon} size={25} /></span><span className="service-number">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><a href="#contact" aria-label={`En savoir plus sur ${service.title}`} data-testid={`link-service-${index + 1}`}>En savoir plus <Icon name="arrow" size={16} /></a></article>)}</div>
    </div>
  </section>;
}
export function Tourism() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...tourismDestinations, ...tourismDestinations];
  const slide = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.destination-card');
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 260) + 18), behavior: 'smooth' });
  };
  const next = () => slide(1);
  const prev = () => slide(-1);
  return <section id="tourisme" className="tourism-section">
    <div className="tourism-backdrop"><Photo src="/images/burundi-lake.jpg" alt="" /><div className="tourism-shade" /></div>
    <div className="tourism-content section-wrap">
      <div className="tourism-intro"><div><span className="eyebrow light">Tourisme</span><h2>{pageCopy.tourism.title}<br />{pageCopy.tourism.titleSecondLine} <em>{pageCopy.tourism.titleAccent}</em></h2></div><div className="tourism-quote"><span>“</span><blockquote>{pageCopy.tourism.quote}</blockquote><p>{pageCopy.tourism.intro}</p></div></div>
      <div className="tourism-tags">{pageCopy.tourism.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="destination-head"><div><small>Nos paysages, nos histoires</small><h3>{pageCopy.tourism.subheading}</h3></div><div className="carousel-controls"><button aria-label="Destination précédente" onClick={prev} data-testid="button-destination-previous"><Icon name="left" /></button><button aria-label="Destination suivante" onClick={next} data-testid="button-destination-next"><Icon name="right" /></button></div></div>
      <div className="destination-window"><div className="destination-track" ref={trackRef}>{items.map((place, i) => <article className="destination-card" key={`${place.name}-${i}`}><Photo src={place.image} alt={place.name} /><span className="destination-category">{place.category}</span><h4>{place.name}</h4></article>)}</div></div>
      <a href="#contact" className="tourism-cta" data-testid="link-tourism-contact">{pageCopy.tourism.cta} <Icon name="arrow" size={16} /></a>
    </div>
  </section>;
}
export function Projects() {
  return <section id="projets" className="projects-section section-wrap">
    <div className="section-topline"><div><span className="eyebrow">Projets</span><h2 className="section-title">{pageCopy.projects.title} <em>{pageCopy.projects.titleAccent}</em></h2><p className="body-copy">{pageCopy.projects.intro}</p></div><span className="projects-mark">M’A<br /><small>PORTFOLIO</small></span></div>
    <div className="project-grid">{projects.map((project) => <article className="featured-project" key={project.title}><SlideshowPhoto images={project.images} alt={`Photos du ${project.title}`} /><div className="project-overlay" /><span className="project-category">{project.category}</span><div className="project-copy"><small>Projet vedette · Burundi</small><h3>{project.title}</h3><p>{project.subtitle}</p></div><span className="project-arrow"><Icon name="arrow" size={21} /></span></article>)}<article className="project-coming"><span className="coming-symbol">+</span><small>La suite s’écrit ensemble</small><h3>{pageCopy.projects.placeholder}</h3><a href="#contact">Proposez un projet <Icon name="arrow" size={15} /></a></article></div>
  </section>;
}
export function News() {
  return <section id="actualites" className="news-section">
    <div className="section-wrap"><div className="news-head"><div><span className="eyebrow">Actualités</span><h2 className="section-title">{pageCopy.news.title} <em>{pageCopy.news.titleAccent}</em></h2></div><p className="body-copy">{pageCopy.news.intro}</p></div>
      <div className="news-grid">{articles.map((article, index) => <article className={`news-card news-${index + 1}`} key={article.title} data-testid={`card-news-${index + 1}`}><div className="news-image-link"><SlideshowPhoto images={article.images} alt={article.title} /></div><div className="news-meta"><span>{article.category}</span><time>{article.date}</time></div><h3>{article.title}</h3><p>{article.excerpt}</p></article>)}</div>
    </div>
  </section>;
}
export function Gallery({ fullPage = false }: { fullPage?: boolean }) {
  const [filter, setFilter] = useState('Tous');
  const [active, setActive] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const shownItems = fullPage ? galleryItems : galleryItems.slice(0, 8);
  const visible = shownItems.map((item, originalIndex) => ({ ...item, originalIndex })).filter((item) => !fullPage || filter === 'Tous' || item.category === filter);
  const close = () => { setActive(null); window.setTimeout(() => triggerRef.current?.focus(), 0); };
  const move = (direction: number) => { if (active === null) return; const current = visible.findIndex((item) => item.originalIndex === active); const next = (current + direction + visible.length) % visible.length; setActive(visible[next].originalIndex); };
  useEffect(() => {
    if (active === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'Tab') {
        const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? []);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', key); document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [active, visible.length]);
  const current = active === null ? null : galleryItems[active];
  return <section id="galerie" className={`gallery-section section-wrap ${fullPage ? 'gallery-full-section' : ''}`}>
    <div className="gallery-heading"><div><span className="eyebrow">Galerie</span><h2 className="section-title">{fullPage ? 'Toutes nos' : pageCopy.gallery.title} <em>{fullPage ? 'photos' : pageCopy.gallery.titleAccent}</em></h2></div><p>{pageCopy.gallery.intro}</p></div>
    {fullPage && <div className="gallery-filters" role="group" aria-label="Filtrer la galerie">{[pageCopy.gallery.allFilter, ...filters].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'selected' : ''} aria-pressed={filter === item} data-testid={`button-gallery-filter-${item}`}>{item}</button>)}</div>}
    <div className="gallery-grid">{visible.map((item, index) => <button className={`gallery-item gallery-item-${index % 8 + 1}`} key={item.title} onClick={(event) => { triggerRef.current = event.currentTarget; setActive(item.originalIndex); }} aria-label={`Ouvrir : ${item.title}`} data-testid={`button-gallery-item-${item.originalIndex}`}><Photo src={item.image} alt={item.title} /><span className="gallery-hover"><Icon name="expand" size={22} /><small>{item.title}</small></span></button>)}</div>
    {!fullPage && <a className="gallery-view-all" href="/galerie">Voir toute la galerie <Icon name="arrow" size={17} /></a>}
    {current && <div className="lightbox" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`Galerie : ${current.title}`} onClick={close} onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current !== null && Math.abs(e.changedTouches[0].clientX - touchStart.current) > 55) move(e.changedTouches[0].clientX < touchStart.current ? 1 : -1); touchStart.current = null; }}><button className="lightbox-close" onClick={close} aria-label="Fermer" data-testid="button-lightbox-close"><Icon name="close" /></button><button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Image précédente" data-testid="button-lightbox-previous"><Icon name="left" /></button><figure onClick={(e) => e.stopPropagation()}><img src={current.image} alt={current.title} /><figcaption>{current.title}<span>{current.category}</span></figcaption></figure><button className="lightbox-next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Image suivante" data-testid="button-lightbox-next"><Icon name="right" /></button><p className="lightbox-hint">← → naviguer · Échap fermer</p></div>}
  </section>;
}
