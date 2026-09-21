import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Artwork, COPY_SIZES, CopySizeId, formatPrice } from '@/data/artworks';
import { useLanguage } from '@/context/LanguageContext';
import { useUsdRate } from '@/hooks/use-usd-rate';

interface ArtworkModalProps {
  artwork: Artwork;
  currency: 'brl' | 'usd';
  onClose: () => void;
}

const ArtworkModal = ({ artwork, currency, onClose }: ArtworkModalProps) => {
  const { language, t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<CopySizeId>('90');
  const { rate: usdBrlRate, isLive: isLiveRate } = useUsdRate();

  // a obra original tem tamanho fixo (150 x 150 cm); os tamanhos selecionáveis são cópias
  const activeSize = COPY_SIZES.find((option) => option.id === selectedSize) ?? COPY_SIZES[1];
  const prices = {
    original: artwork.priceBrl,
    copy: activeSize.priceBrl,
  };

  const formattedRate = usdBrlRate.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: 'BRL',
  });

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
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-charcoal/85 text-warm-white rounded-full flex items-center justify-center border border-white/15 shadow-lg backdrop-blur-sm hover:bg-charcoal transition-colors"
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
                <div className="border border-charcoal/20 bg-muted/60 p-4 rounded-sm">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    {t('artworkModal.originalSizeLabel')}
                  </span>
                  <p className="text-lg font-medium text-foreground">{artwork.dimensions}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('artworkModal.originalSizeNote')}
                  </p>
                </div>
                <div>
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    {t('artworkModal.dimensions')}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('artworkModal.dimensionsNote')}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {COPY_SIZES.map((option) => {
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
                    <span className="text-xl font-medium text-foreground block">
                      {formatPrice(prices.original, currency, usdBrlRate)}
                    </span>
                    <span className="text-xs text-muted-foreground">{artwork.dimensions}</span>
                  </div>
                  <div className="bg-muted p-4 rounded-sm">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground block mb-1">
                      Cópia Assinada
                    </span>
                    <span className="text-xl font-medium text-foreground block">
                      {formatPrice(prices.copy, currency, usdBrlRate)}
                    </span>
                    <span className="text-xs text-muted-foreground">{activeSize.label}</span>
                  </div>
                </div>
                {currency === 'usd' && (
                  <p className="text-xs text-muted-foreground mt-3">
                    {t('artworkModal.usdRateNote').replace('{rate}', formattedRate)}
                    {!isLiveRate && ` ${t('artworkModal.usdRateFallback')}`}
                  </p>
                )}
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
