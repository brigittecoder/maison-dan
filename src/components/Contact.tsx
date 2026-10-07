import { pageCopy } from '../data/content';
import { Icon, WhatsAppIcon } from './Icons';

export function Contact() {
  return <section className="contact-section section-wrap" id="contact">
    <div className="contact-panel contact-panel-direct">
      <div className="contact-copy">
        <span className="eyebrow">Contact</span>
        <h2 className="section-title">{pageCopy.contact.title}<br /><em>{pageCopy.contact.titleAccent}</em></h2>
        <p>{pageCopy.contact.intro}</p>
      </div>
      <div className="contact-links">
        <h3>Choisissez votre moyen de contact</h3>
        <div className="contact-details">
          <div className="contact-detail contact-card"><span className="contact-icon"><Icon name="location" /></span><div><strong>{pageCopy.brand.name}</strong><span>{pageCopy.brand.location}</span></div></div>
          <a className="contact-detail contact-card contact-card-primary" href={pageCopy.brand.whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><span className="contact-icon"><WhatsAppIcon /></span><div><strong>WhatsApp</strong><span>{pageCopy.brand.phone}</span></div><Icon name="arrow" className="contact-link-arrow" size={17} /></a>
          <a className="contact-detail contact-card" href={`mailto:${pageCopy.brand.email}`} data-testid="link-contact-email"><span className="contact-icon"><Icon name="mail" /></span><div><strong>E-mail</strong><span>{pageCopy.brand.email}</span></div><Icon name="arrow" className="contact-link-arrow" size={17} /></a>
          <a className="contact-detail contact-card" href={pageCopy.brand.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><span className="contact-icon"><Icon name="instagram" /></span><div><strong>Instagram</strong><span>{pageCopy.brand.instagramHandle}</span></div><Icon name="arrow" className="contact-link-arrow" size={17} /></a>
        </div>
      </div>
    </div>
  </section>;
}
