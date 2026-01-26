import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-charcoal text-warm-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-light tracking-wide italic text-primary">
              P. de Araújo
            </Link>
            <p className="mt-4 text-warm-white/70 text-sm leading-relaxed">
              Arte que conecta tradição e inovação, explorando a essência da natureza interior 
              através de formas geométricas e símbolos universais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-warm-white/90">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-warm-white/70 hover:text-primary transition-colors text-sm">
                Início
              </Link>
              <Link to="/sobre" className="text-warm-white/70 hover:text-primary transition-colors text-sm">
                Sobre o Artista
              </Link>
              <Link to="/gravuras" className="text-warm-white/70 hover:text-primary transition-colors text-sm">
                Gravuras
              </Link>
              <Link to="/contato" className="text-warm-white/70 hover:text-primary transition-colors text-sm">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-warm-white/90">
              Contato
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:contato@paulodearaujo.art.br" className="flex items-center gap-3 text-warm-white/70 hover:text-primary transition-colors text-sm">paulodearaujo.arte@gmail.com <Mail size={16} />
                contato@paulodearaujo.art.br
              </a>
              <a href="https://wa.me/5551999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-warm-white/70 hover:text-primary transition-colors text-sm">+55 51 98484-6665<Phone size={16} />
                +55 51 99999-9999
              </a>
              <p className="flex items-center gap-3 text-warm-white/70 text-sm">
                <MapPin size={16} />
                Porto Alegre, RS - Brasil
              </p>
              <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-warm-white/70 hover:text-primary transition-colors text-sm" href="https://www.instagram.com/atelierpaulodearaujo/">@atelierpaulodearaujo<Instagram size={16} />
                @paulodearaujo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-white/10 md:flex-row justify-between items-center gap-4 flex flex-row">
          <p className="text-warm-white/50 text-xs tracking-wide">
            © {currentYear} Paulo de Araújo. Todos os direitos reservados.
          </p>
          <p className="text-warm-white/50 text-xs tracking-wide">
            Arte Brasileira Contemporânea
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;