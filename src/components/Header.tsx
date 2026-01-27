import { Link, useLocation } from 'react-router-dom';
import assinatura from '@/assets/assinatura.png';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { to: '/sobre', label: t('navigation.about') },
    { to: '/gravuras', label: t('navigation.gallery') },
    { to: '/contato', label: t('navigation.contact') },
  ];

  return (
    <header className="header">
      <Link to="/">
        <img src={assinatura} alt={t('about.signatureAlt')} />
      </Link>
      <div className="header-actions">
        <nav>
          <ul className="menu">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={location.pathname === link.to ? 'is-active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="language-toggle"
          onClick={toggleLanguage}
          aria-label={language === 'pt' ? t('languageToggle.ariaToEnglish') : t('languageToggle.ariaToPortuguese')}
        >
          {language === 'pt' ? t('languageToggle.toEnglish') : t('languageToggle.toPortuguese')}
        </button>
      </div>
    </header>
  );
};

export default Header;
