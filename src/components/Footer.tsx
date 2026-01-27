import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Signature from "@/assets/assinatura.png";
import { useLanguage } from "@/context/LanguageContext";

const navLinks: { href: string; labelKey: string }[] = [
  { href: "/", labelKey: "navigation.home" },
  { href: "/sobre", labelKey: "navigation.about" },
  { href: "/gravuras", labelKey: "navigation.gallery" },
  { href: "/contato", labelKey: "navigation.contact" },
];

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column footer-brand">
          <Link to="/">
            <img src={Signature} alt={t("about.signatureAlt")}
            />
          </Link>
          <p>{t("footer.description")}</p>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">{t("footer.navigationTitle")}</h4>
          <div className="footer-navigation">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">{t("footer.contactTitle")}</h4>
          <a className="footer-contact-item" href="mailto:paulodearaujo.arte@gmail.com">
            <Mail aria-hidden="true" />
            <span>{t("contact.emailValue")}</span>
          </a>
          <a className="footer-contact-item" href="tel:+5551984846665">
            <Phone aria-hidden="true" />
            <span>{t("contact.phoneValue")}</span>
          </a>
          <a
            className="footer-contact-item"
            href="https://www.instagram.com/atelierpaulodearaujo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram aria-hidden="true" />
            <span>@atelierpaulodearaujo</span>
          </a>
          <div className="footer-contact-item" aria-label={t("contact.mapCity")}>
            <MapPin aria-hidden="true" />
            <span>{t("contact.mapCity")}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t("footer.rights").replace("{year}", currentYear)}</span>
        <span>{t("footer.tagline")}</span>
      </div>
    </footer>
  );
}

export default Footer;