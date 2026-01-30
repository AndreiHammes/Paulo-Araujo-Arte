import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('navigation.home') },
    { to: '/sobre', label: t('navigation.about') },
    { to: '/gravuras', label: t('navigation.gallery') },
    { to: '/contato', label: t('navigation.contact') },
  ];

  return (
    <header className="header">
      <Link to="/" className="header-brand" onClick={() => setIsMenuOpen(false)}>
        Paulo de Araújo
      </Link>
      <button
        type="button"
        className={`hamburger-toggle ${isMenuOpen ? 'is-open' : ''}`}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        aria-label={language === 'pt' ? (isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação') : (isMenuOpen ? 'Close navigation menu' : 'Open navigation menu')}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`header-actions ${isMenuOpen ? 'is-open' : ''}`}>
        <nav id="primary-navigation">
          <ul className="menu">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={location.pathname === link.to ? 'is-active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="language-toggle"
          onClick={() => {
            toggleLanguage();
            setIsMenuOpen(false);
          }}
          aria-label={language === 'pt' ? t('languageToggle.ariaToEnglish') : t('languageToggle.ariaToPortuguese')}
        >
          {language === 'pt' ? t('languageToggle.toEnglish') : t('languageToggle.toPortuguese')}
        </button>
      </div>
    </header>
  );
};

export default Header;
