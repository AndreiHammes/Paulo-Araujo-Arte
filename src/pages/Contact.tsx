import { useState } from 'react';
import Layout from '@/components/Layout';
import {
  AlertCircle,
  CheckCircle2,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import contactHero from '@/assets/gravura01.jpg?w=1800&format=webp&quality=68';

/**
 * FormSubmit entrega as mensagens direto na caixa do ateliê, sem backend.
 * O primeiro envio dispara um e-mail de ativação que precisa ser confirmado uma única vez.
 */
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/paulodearaujo.arte@gmail.com';

const WHATSAPP_LINK = 'https://wa.me/5551984846665';
const INSTAGRAM_LINK = 'https://www.instagram.com/atelierpaulodearaujo/';
const INSTAGRAM_HANDLE = '@atelierpaulodearaujo';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const { t, tObject } = useLanguage();
  const formTexts = tObject<{
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    subjectOptions: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    successTitle: string;
    errorTitle: string;
    error: string;
    privacyNote: string;
  }>('contact.form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const subjectOptions = formTexts.subjectOptions ?? [];
  const artistEmail = t('contact.emailValue');

  const selectedSubjectLabel =
    subjectOptions.find((option) => option.value === formData.subject)?.label ?? formData.subject;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Campo isca: se estiver preenchido, foi um robô — descarta sem enviar.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Site Paulo de Araújo — ${selectedSubjectLabel}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email,
          Nome: formData.name,
          Email: formData.email,
          Assunto: selectedSubjectLabel,
          Mensagem: formData.message,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || String(result?.success) !== 'true') {
        throw new Error(result?.message ?? 'Falha no envio');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isSending = status === 'sending';
  const mailtoFallback = `mailto:${artistEmail}?subject=${encodeURIComponent(
    selectedSubjectLabel || t('contact.title'),
  )}&body=${encodeURIComponent(formData.message)}`;

  return (
    <Layout>
      {/* Hero */}
      <section className="contact-hero">
        <img src={contactHero} alt="" aria-hidden="true" className="contact-hero-bg" />
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">{t('contact.title')}</h1>
          <span className="contact-hero-rule" aria-hidden="true" />
          <p className="contact-hero-intro">{t('contact.intro')}</p>
        </div>
      </section>

      {/* Content */}
      <section className="contact-section">
        <div className="contact-layout">
          {/* Contact Info */}
          <aside className="contact-info">
            <h2 className="contact-info-title">{t('contact.talkToMe')}</h2>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-whatsapp whatsapp-btn"
            >
              <MessageCircle size={22} />
              {t('contact.whatsappCta')}
            </a>
            <p className="contact-whatsapp-note">{t('contact.whatsappNote')}</p>

            <h3 className="contact-eyebrow">{t('contact.directTitle')}</h3>

            <div className="contact-info-items">
              <a href={`mailto:${artistEmail}`} className="contact-info-item">
                <span className="contact-info-icon">
                  <Mail size={20} />
                </span>
                <span className="contact-info-item-text">
                  <span className="contact-info-item-label">{t('contact.emailLabel')}</span>
                  <span className="contact-info-item-value">{artistEmail}</span>
                </span>
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item"
              >
                <span className="contact-info-icon">
                  <Phone size={20} />
                </span>
                <span className="contact-info-item-text">
                  <span className="contact-info-item-label">{t('contact.phoneLabel')}</span>
                  <span className="contact-info-item-value">{t('contact.phoneValue')}</span>
                </span>
              </a>

              <div className="contact-info-item is-static">
                <span className="contact-info-icon">
                  <MapPin size={20} />
                </span>
                <span className="contact-info-item-text">
                  <span className="contact-info-item-label">{t('contact.studioLabel')}</span>
                  <span className="contact-info-item-value">{t('contact.mapCity')}</span>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-social">
              <h3 className="contact-eyebrow">{t('contact.socialTitle')}</h3>
              <div className="contact-social-links">
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  <span className="contact-info-icon">
                    <Instagram size={20} />
                  </span>
                  <span className="contact-info-item-value">{INSTAGRAM_HANDLE}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">{formTexts.title}</h2>

            <div className="contact-status-region" aria-live="polite">
              {status === 'success' && (
                <div className="contact-status is-success">
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>{formTexts.successTitle}</strong>
                    <p>{formTexts.success}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="contact-status is-error">
                  <AlertCircle size={20} />
                  <div>
                    <strong>{formTexts.errorTitle}</strong>
                    <p>{formTexts.error}</p>
                    <p className="contact-status-links">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        {t('contact.whatsappCta')}
                      </a>
                      <span aria-hidden="true">·</span>
                      <a href={mailtoFallback}>{artistEmail}</a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="_honey"
                className="contact-honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="contact-field">
                <label htmlFor="name">{formTexts.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder={formTexts.namePlaceholder}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email">{formTexts.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder={formTexts.emailPlaceholder}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="subject">{formTexts.subjectLabel}</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">{formTexts.subjectPlaceholder}</option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">{formTexts.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={formTexts.messagePlaceholder}
                />
              </div>

              <button type="submit" className="contact-submit" disabled={isSending}>
                {isSending ? (
                  <Loader2 size={18} className="contact-spinner" />
                ) : (
                  <Send size={18} />
                )}
                {isSending ? formTexts.sending : formTexts.submit}
              </button>

              <p className="contact-privacy">{formTexts.privacyNote}</p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
