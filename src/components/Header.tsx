import { useEffect, useState } from 'react';
import { navItems, pageCopy } from '../data/content';
import { Icon } from './Icons';

export function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const navigate = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <div className="header-inner">
      <a className="brand" href="#accueil" onClick={(e) => { e.preventDefault(); navigate('accueil'); }} aria-label="Maison d’An, accueil" data-testid="link-brand-home">
        <img className="brand-logo" src="/maisondan_logo.png" alt="Maison d’An" />
      </a>
      <nav className="desktop-nav" aria-label="Navigation principale">{navItems.map((item) => <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} data-testid={`nav-${item.id}`}>{item.label}</a>)}</nav>
      <a className="header-cta" href="#contact" data-testid="link-header-contact">Nous contacter <Icon name="arrow" size={16} /></a>
      <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} data-testid="button-mobile-menu"><Icon name={open ? 'close' : 'menu'} size={23} /></button>
    </div>
    <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <nav aria-label="Navigation mobile">{navItems.map((item, i) => <a key={item.id} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined} style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }} href={`#${item.id}`} onClick={() => setOpen(false)} data-testid={`mobile-nav-${item.id}`}>{item.label}<span>0{i + 1}</span></a>)}
        <a className="mobile-nav-contact" href="#contact" onClick={() => setOpen(false)} data-testid="link-mobile-contact">Nous contacter <Icon name="arrow" /></a>
      </nav>
      <div className="mobile-nav-foot">Créer. Connecter. Promouvoir. <span>Bujumbura, Burundi 🇧🇮</span></div>
    </div>
  </header>;
}
