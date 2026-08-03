import { Link } from "react-router-dom";
import LogoAtelier from "@/assets/novo logo atelier.png?w=360&format=webp&quality=82";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/">
            <img src={LogoAtelier} alt={t("about.signatureAlt")}
            />
          </Link>
        </div>

        <div className="footer-links" aria-label={t("footer.contactTitle")}>
          <a className="footer-link" href="mailto:paulodearaujo.arte@gmail.com">
            {t("contact.emailValue")}
          </a>
          <a className="footer-link" href="https://wa.me/5551984846665" target="_blank" rel="noopener noreferrer">
            {t("contact.phoneValue")}
          </a>
          <a
            className="footer-link"
            href="https://www.instagram.com/atelierpaulodearaujo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @atelierpaulodearaujo
          </a>
          <span className="footer-link footer-link-static">{t("contact.mapCity")}</span>
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