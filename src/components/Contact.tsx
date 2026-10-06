import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { pageCopy } from '../data/content';
import { Icon, WhatsAppIcon } from './Icons';

const subjectOptions = ['Communication', 'Marketing', 'Événementiel', 'Image & Pageantry', 'Tourisme', 'Autre'] as const;
type FormFields = { name: string; email: string; subject: string; message: string };
const initial: FormFields = { name: '', email: '', subject: '', message: '' };

export function Contact() {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [resultMessage, setResultMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const request = useMutation<{ accepted: boolean; message: string }, Error, FormFields>({
    mutationFn: async (data) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Contact request failed');
      return response.json();
    },
  });
  const update = (key: keyof FormFields, value: string) => setFields((current) => ({ ...current, [key]: value }));
  const validate = () => {
    const next: Partial<FormFields> = {};
    if (fields.name.trim().length < 2 || fields.name.length > 120) next.name = 'Veuillez saisir votre nom (2 caractères minimum).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) next.email = 'Veuillez saisir une adresse e-mail valide.';
    if (!subjectOptions.includes(fields.subject as (typeof subjectOptions)[number])) next.subject = 'Veuillez choisir un sujet.';
    if (fields.message.trim().length < 10 || fields.message.length > 5000) next.message = 'Votre message doit contenir au moins 10 caractères.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setResultMessage(''); setAccepted(false);
    if (!validate()) return;
    request.mutate({ ...fields, name: fields.name.trim(), message: fields.message.trim(), subject: fields.subject as typeof subjectOptions[number] }, {
      onSuccess: (result) => { setAccepted(result.accepted); setResultMessage(result.message); if (result.accepted) { setFields(initial); setErrors({}); } },
      onError: () => setResultMessage('Une erreur est survenue. Veuillez réessayer dans un instant.'),
    });
  };
  return <section className="contact-section section-wrap" id="contact">
    <div className="contact-panel">
      <div className="contact-copy">
        <span className="eyebrow">Contact</span>
        <h2 className="section-title">{pageCopy.contact.title}<br /><em>{pageCopy.contact.titleAccent}</em></h2>
        <p>{pageCopy.contact.intro}</p>
        <div className="contact-details">
          <div className="contact-detail"><span className="contact-icon"><Icon name="location" /></span><div><strong>{pageCopy.brand.name}</strong><span>{pageCopy.brand.location}</span></div></div>
          <a className="contact-detail" href={pageCopy.brand.whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><span className="contact-icon"><WhatsAppIcon /></span><div><strong>WhatsApp</strong><span>{pageCopy.brand.phone}</span></div></a>
          <a className="contact-detail" href={`mailto:${pageCopy.brand.email}`} data-testid="link-contact-email"><span className="contact-icon"><Icon name="mail" /></span><div><strong>E-mail</strong><span>{pageCopy.brand.email}</span></div></a>
          <a className="contact-detail" href={pageCopy.brand.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><span className="contact-icon"><Icon name="instagram" /></span><div><strong>Instagram</strong><span>{pageCopy.brand.instagramHandle}</span></div></a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-heading"><span>{pageCopy.contact.formTitle}</span><p>{pageCopy.contact.formIntro}</p></div>
        <label>Nom<input data-testid="input-name" value={fields.name} onChange={(e) => update('name', e.target.value)} placeholder="Votre nom" aria-invalid={!!errors.name} />{errors.name && <small className="field-error">{errors.name}</small>}</label>
        <label>E-mail<input data-testid="input-email" type="email" value={fields.email} onChange={(e) => update('email', e.target.value)} placeholder="vous@exemple.com" aria-invalid={!!errors.email} />{errors.email && <small className="field-error">{errors.email}</small>}</label>
        <label>Sujet<select data-testid="select-subject" value={fields.subject} onChange={(e) => update('subject', e.target.value)} aria-invalid={!!errors.subject}><option value="">Choisir un sujet</option>{subjectOptions.map((option) => <option key={option}>{option}</option>)}</select>{errors.subject && <small className="field-error">{errors.subject}</small>}</label>
        <label>Message<textarea data-testid="input-message" rows={4} value={fields.message} onChange={(e) => update('message', e.target.value)} placeholder="Parlez-nous de votre projet..." aria-invalid={!!errors.message} />{errors.message && <small className="field-error">{errors.message}</small>}</label>
        {resultMessage && <div className={`form-result ${accepted ? 'success' : 'error'}`} role="status" data-testid="status-contact-result">{resultMessage}</div>}
        <button className="form-submit" type="submit" disabled={request.isPending} data-testid="button-submit-contact">{request.isPending ? <><span className="submit-pulse" />Envoi en cours…</> : <>NOUS CONTACTER <Icon name="arrow" size={17} /></>}</button>
        <small className="form-note">{pageCopy.contact.note}</small>
      </form>
    </div>
  </section>;
}
