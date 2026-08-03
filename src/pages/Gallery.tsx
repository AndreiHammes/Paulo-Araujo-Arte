import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import Layout from '@/components/Layout';
import ArtworkModal from '@/components/ArtworkModal';
import { artworks, Artwork } from '@/data/artworks';
import { useLanguage } from '@/context/LanguageContext';

type FilterType = 'original' | 'drawing' | 'zen';

interface DrawingItem {
  id: string;
  image: string;
  previewImage: string;
  number: number;
  kind: 'drawing' | 'zen';
}

const drawingPreviewImports = import.meta.glob<string>('../assets/desenhos/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=700&format=webp&quality=70',
});

const drawingFullImports = import.meta.glob<string>('../assets/desenhos/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=1600&format=webp&quality=78',
});

const zenPreviewImports = import.meta.glob<string>('../assets/zen/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=700&format=webp&quality=70',
});

const zenFullImports = import.meta.glob<string>('../assets/zen/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=1600&format=webp&quality=78',
});

const allDrawings: DrawingItem[] = Object.entries(drawingFullImports)
  .map(([path, image]) => {
    const match = path.match(/desenho(\d+)/i);
    const number = match ? Number(match[1]) : 0;
    return {
      id: match ? `drawing-${number}` : path,
      image,
      previewImage: drawingPreviewImports[path] ?? image,
      number,
      kind: 'drawing',
    };
  })
  .sort((a, b) => a.number - b.number);

const prioritizedNumbers = [3, 9, 10];
const prioritizedDrawings = prioritizedNumbers
  .map((target) => allDrawings.find((item) => item.number === target))
  .filter((item): item is DrawingItem => Boolean(item));

const remainingDrawings = allDrawings.filter(
  (item) => !prioritizedNumbers.includes(item.number)
);

const drawingSeries: DrawingItem[] = [...prioritizedDrawings, ...remainingDrawings];

const zenSeries: DrawingItem[] = Object.entries(zenFullImports)
  .map(([path, image]) => {
    const match = path.match(/zen(\d+)/i);
    const number = match ? Number(match[1]) : 0;
    return {
      id: match ? `zen-${number}` : path,
      image,
      previewImage: zenPreviewImports[path] ?? image,
      number,
      kind: 'zen',
    };
  })
  .sort((a, b) => a.number - b.number);

const Gallery = () => {
  const { t, tObject, language } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('original');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<DrawingItem | null>(null);
  const [currency, setCurrency] = useState<'brl' | 'usd'>('brl');

  const filteredArtworks = useMemo(
    () => artworks.filter((artwork) => filter !== 'drawing' && filter !== 'zen' && artwork.type === filter),
    [filter]
  );

  useEffect(() => {
    if (filter === 'drawing' || filter === 'zen') {
      setSelectedArtwork(null);
    } else {
      setSelectedDrawing(null);
    }
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtwork(null);
        setSelectedDrawing(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filters = tObject<Record<'original' | 'drawings' | 'zen', string>>('gallery.filters');
  const isDrawingFilter = filter === 'drawing';
  const isZenFilter = filter === 'zen';
  const drawingTitlePrefix = language === 'pt' ? 'Desenho' : 'Drawing';
  const zenTitlePrefix = language === 'pt' ? 'Zen' : 'Zen';

  return (
    <Layout>
      {/* Header */}
      <section className="gallery-header">
        <h1 className="gallery-title">{t('gallery.title')}</h1>
        <p className="gallery-intro">{t('gallery.intro')}</p>
      </section>

      {/* Filters */}
      <section className="gallery-controls">
        <div className="gallery-controls-inner">
          <div className="gallery-filter-buttons">
            <button
              onClick={() => setFilter('original')}
              className={`gallery-filter-button ${filter === 'original' ? 'is-active' : ''}`}
            >
              {filters.original}
            </button>
            <button
              onClick={() => setFilter('drawing')}
              className={`gallery-filter-button ${filter === 'drawing' ? 'is-active' : ''}`}
            >
              {filters.drawings}
            </button>
            <button
              onClick={() => setFilter('zen')}
              className={`gallery-filter-button ${filter === 'zen' ? 'is-active' : ''}`}
            >
              {filters.zen}
            </button>
          </div>

          <div className="gallery-currency">
            <span>{t('gallery.currencyLabel')}</span>
            <button
              onClick={() => setCurrency('brl')}
              className={`gallery-currency-button ${currency === 'brl' ? 'is-active' : ''}`}
            >
              R$
            </button>
            <button
              onClick={() => setCurrency('usd')}
              className={`gallery-currency-button ${currency === 'usd' ? 'is-active' : ''}`}
            >
              US$
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-wrap">
        <div className="gallery-grid-container">
          <div className="gallery-grid">
            {isZenFilter
              ? zenSeries.map((zen, index) => (
                  <div
                    key={zen.id}
                    className="artwork-card drawing-card gallery-item group"
                    onClick={() => setSelectedDrawing(zen)}
                    style={{ animationDelay: `${index * 60}ms`, cursor: 'pointer' }}
                  >
                    <img
                      src={zen.previewImage}
                      alt={`${zenTitlePrefix} ${String(zen.number).padStart(2, '0')}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))
              : isDrawingFilter
              ? drawingSeries.map((drawing, index) => (
                  <div
                    key={drawing.id}
                    className="artwork-card drawing-card gallery-item group"
                    onClick={() => setSelectedDrawing(drawing)}
                    style={{ animationDelay: `${index * 60}ms`, cursor: 'pointer' }}
                  >
                    <img
                      src={drawing.previewImage}
                      alt={`${drawingTitlePrefix} ${String(drawing.number).padStart(2, '0')}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))
              : filteredArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="artwork-card gallery-item group"
                    onClick={() => setSelectedArtwork(artwork)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={artwork.previewImage}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-charcoal/80 to-transparent">
                      <h3 className="text-warm-white text-lg font-medium">{artwork.title}</h3>
                      <p className="text-warm-white/80 text-sm">{artwork.year}</p>
                    </div>
                  </div>
                ))}
          </div>

          {!isDrawingFilter && !isZenFilter && filteredArtworks.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              {t('gallery.empty')}
            </p>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          currency={currency}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

      {selectedDrawing && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4 animate-fade-in-scale"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDrawing(null);
            }
          }}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedDrawing.image}
              alt={`${drawingTitlePrefix} ${String(selectedDrawing.number).padStart(2, '0')}`}
              className="mx-auto max-h-[80vh] w-auto max-w-full object-contain rounded-sm"
            />
            <button
              onClick={() => setSelectedDrawing(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-charcoal/85 text-warm-white rounded-full flex items-center justify-center border border-white/15 shadow-lg backdrop-blur-sm hover:bg-charcoal transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
