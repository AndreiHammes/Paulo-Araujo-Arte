import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Artwork, formatPrice } from '@/data/artworks';
import { useLanguage } from '@/context/LanguageContext';

const SIZE_OPTIONS = [
  { id: '80', label: '80 x 80 cm', multiplier: 0.8 },
  { id: '90', label: '90 x 90 cm', multiplier: 1 },
  { id: '100', label: '100 x 100 cm', multiplier: 1.25 },
] as const;

type SizeOptionId = typeof SIZE_OPTIONS[number]['id'];

interface ArtworkModalProps {
  artwork: Artwork;
  currency: 'brl' | 'usd';
  onClose: () => void;
}

const ArtworkModal = ({ artwork, currency, onClose }: ArtworkModalProps) => {
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<SizeOptionId>('90');

  const activeSize = SIZE_OPTIONS.find((option) => option.id === selectedSize) ?? SIZE_OPTIONS[1];
  const adjustedPrices = {
    original: Math.round(artwork.prices.original[currency] * activeSize.multiplier),
    copy: Math.round(artwork.prices.copy[currency] * activeSize.multiplier),
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse na obra "${artwork.title}" (${artwork.year}). Gostaria de mais informações.`
  );
  const whatsappLink = `https://wa.me/5551984846665?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4 animate-fade-in-scale"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-background max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-charcoal/80 text-warm-white rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative flex items-center justify-center bg-transparent p-2 md:p-4">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
            />
          </div>

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
                    {t('artworkModal.dimensions')}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map((option) => {
                      const isActive = option.id === activeSize.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedSize(option.id)}
                          className={`px-3 py-2 text-sm border rounded-sm transition-colors ${
                            isActive ? 'bg-charcoal text-white border-charcoal' : 'border-border text-foreground hover:border-charcoal'
                          }`}
                          aria-pressed={isActive}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    Técnica
                  </span>
                  <p className="text-foreground">{artwork.technique}</p>
                </div>
              </div>

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
                      {formatPrice(adjustedPrices.original, currency)}
                    </span>
                  </div>
                  <div className="bg-muted p-4 rounded-sm">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Cópia Assinada
                    </span>
                    <span className="text-xl font-medium text-foreground">
                      {formatPrice(adjustedPrices.copy, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn justify-center text-base self-start"
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
