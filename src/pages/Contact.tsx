import { useState } from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, Instagram, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
    success: string;
  }>('contact.form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(formTexts.success);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subjectOptions = formTexts.subjectOptions ?? [];
  const whatsappPhoneLink = 'https://wa.me/5551984846665';

  return (
    <Layout>
      {/* Header */}
      <section style={{ padding: '28px 25px 20px', backgroundColor: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', marginBottom: '15px', textTransform: 'uppercase' }}>
          {t('contact.title')}
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          {t('contact.intro')}
        </p>
      </section>

      {/* Content */}
      <section style={{ padding: '24px 25px 38px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
            }}
          >
            {/* Contact Info */}
            <div className="contact-info">
              <h2
                className="contact-info-title"
                style={{ fontSize: '26px', fontWeight: '300', marginBottom: '20px', textTransform: 'uppercase' }}
              >
                {t('contact.talkToMe')}
              </h2>

              {/* WhatsApp CTA */}
              <a
                  href="https://wa.me/5551984846665"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-whatsapp whatsapp-btn text-lg mb-10 inline-flex"
              >
                <MessageCircle size={24} />
                {t('contact.whatsappCta')}
              </a>

              <div className="contact-info-items space-y-5 mb-8">
                <a
                  href={`mailto:${t('contact.emailValue')}`}
                  className="contact-info-item flex items-start gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div className="contact-info-item-text">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      {t('contact.emailLabel')}
                    </span>
                    <span>{t('contact.emailValue')}</span>
                  </div>
                </a>

                <a
                  href={whatsappPhoneLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item flex items-start gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div className="contact-info-item-text">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      {t('contact.phoneLabel')}
                    </span>
                    <span>{t('contact.phoneValue')}</span>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="contact-social">
                <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  {t('contact.socialTitle')}
                </h3>
                <div className="contact-social-links flex gap-4">
                  <a
                    href="https://www.instagram.com/atelierpaulodearaujo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-6 lg:p-8 rounded-sm">
              <h2 className="text-2xl font-light tracking-wider mb-6">{formTexts.title}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {formTexts.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder={formTexts.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {formTexts.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder={formTexts.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {formTexts.subjectLabel}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  >
                    <option value="">{formTexts.subjectPlaceholder}</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {formTexts.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder={formTexts.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Send size={18} />
                  {formTexts.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;