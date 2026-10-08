import { useEffect, useRef, useState } from 'react';
import { useRoute } from 'wouter';
import { Icon } from '../components/Icons';
import { articles, pageCopy } from '../data/content';
import NotFound from './not-found';

export default function ActivityDetailPage() {
  const [, params] = useRoute('/activites/:activityId');
  const activity = articles.find((item) => item.id === params?.activityId);
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activity) document.title = `${activity.title} — ${pageCopy.brand.name}`;
  }, [activity]);

  useEffect(() => {
    if (active === null || !activity) return;
    const oldOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((index) => index === null ? null : (index + 1) % activity.images.length);
      if (event.key === 'ArrowLeft') setActive((index) => index === null ? null : (index - 1 + activity.images.length) % activity.images.length);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [active, activity]);

  if (!activity) return <NotFound />;
  const close = () => {
    setActive(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };
  const move = (direction: number) => setActive((index) => index === null ? null : (index + direction + activity.images.length) % activity.images.length);

  return <div className="activity-page">
    <header className="activity-page-header section-wrap">
      <a className="brand" href="/" aria-label="Retour à l’accueil"><img className="brand-logo" src="/maisondan_logo-nobg.png" alt="Maison d’An" /></a>
      <a className="btn-secondary" href="/#actualites"><Icon name="left" size={16} /> Retour aux activités</a>
    </header>
    <main className="activity-page-main section-wrap">
      <section className="activity-intro">
        <span className="eyebrow">{activity.category}</span>
        <time>{activity.date}</time>
        <h1>{activity.title}</h1>
        <p>{activity.description}</p>
        <span className="activity-photo-count">{activity.images.length} photos</span>
      </section>
      <section className="activity-gallery" aria-labelledby="activity-gallery-title">
        <div className="activity-gallery-heading"><h2 id="activity-gallery-title">Photos de l’activité</h2><span>{activity.date}</span></div>
        <div className="activity-photo-grid">{activity.images.map((image, index) => <button className="activity-photo" key={image} onClick={(event) => { triggerRef.current = event.currentTarget; setActive(index); }} aria-label={`Agrandir la photo ${index + 1}`}><img src={image} alt={`${activity.title} · photo ${index + 1}`} loading="lazy" /><span>Photo {String(index + 1).padStart(2, '0')}</span></button>)}</div>
      </section>
    </main>
    <footer className="gallery-page-footer"><span>{pageCopy.brand.copyright}</span><a href="/#actualites">Retour aux activités</a></footer>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activity.title} · ${activity.date}`} onClick={close}>
      <button className="lightbox-close" onClick={close} aria-label="Fermer"><Icon name="close" /></button>
      <button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Photo précédente"><Icon name="left" /></button>
      <figure onClick={(event) => event.stopPropagation()}><img src={activity.images[active]} alt={`${activity.title} · photo ${active + 1}`} /><figcaption className="lightbox-caption"><div><strong>{activity.title}</strong><p>{activity.description}</p></div><span>{activity.date}</span></figcaption></figure>
      <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Photo suivante"><Icon name="right" /></button>
      <p className="lightbox-hint">← → naviguer · Échap fermer</p>
    </div>}
  </div>;
}
