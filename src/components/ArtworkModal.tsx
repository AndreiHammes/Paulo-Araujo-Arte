import { X, MessageCircle } from 'lucide-react';
import { Artwork, formatPrice } from '@/data/artworks';

interface ArtworkModalProps {
  artwork: Artwork;
  currency: 'brl' | 'usd';
  onClose: () => void;
}

const ArtworkModal = ({ artwork, currency, onClose }: ArtworkModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse na obra "${artwork.title}" (${artwork.year}). Gostaria de mais informações.`
  );
  const whatsappLink = `https://wa.me/5551999999999?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4 animate-fade-in-scale"
      onClick={handleBackdropClick}
    >
      <div className="bg-background max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-charcoal/80 text-warm-white rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex-1">
              {artwork.type === 'original' && (
                <span className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1 tracking-wider uppercase mb-4">
                  Original
                </span>
              )}
              
              <h2 className="text-2xl lg:text-3xl font-light tracking-wide mb-2">
                {artwork.title}
              </h2>
              <p className="text-muted-foreground mb-6">{artwork.year}</p>

              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    Dimensões
                  </span>
                  <p className="text-foreground">{artwork.dimensions}</p>
                </div>
                <div>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    Técnica
                  </span>
                  <p className="text-foreground">{artwork.technique}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {artwork.description}
              </p>

              {/* Prices */}
              <div className="border-t border-border pt-6 mb-8">
                <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  Valores
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-sm">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Original
                    </span>
                    <span className="text-xl font-medium text-foreground">
                      {formatPrice(artwork.prices.original[currency], currency)}
                    </span>
                  </div>
                  <div className="bg-muted p-4 rounded-sm">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Cópia Assinada
                    </span>
                    <span className="text-xl font-medium text-foreground">
                      {formatPrice(artwork.prices.copy[currency], currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn justify-center text-base"
            >
              <MessageCircle size={20} />
              Consultar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
