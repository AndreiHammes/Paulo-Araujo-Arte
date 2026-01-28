import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import Layout from '@/components/Layout';
import ArtworkModal from '@/components/ArtworkModal';
import { artworks, Artwork } from '@/data/artworks';
import { useLanguage } from '@/context/LanguageContext';

type FilterType = 'original' | 'copy' | 'drawing';

interface DrawingItem {
  id: string;
  image: string;
  number: number;
}

const drawingImports = import.meta.glob<string>('@/assets/desenho*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
});

const drawingSeries: DrawingItem[] = Object.entries(drawingImports)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([_, image], index) => ({
    id: `drawing-${index + 1}`,
    image,
    number: index + 1,
  }));

const Gallery = () => {
  const { t, tObject, language } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('original');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<DrawingItem | null>(null);
  const [currency, setCurrency] = useState<'brl' | 'usd'>('brl');

  const filteredArtworks = useMemo(
    () => artworks.filter((artwork) => filter !== 'drawing' && artwork.type === filter),
    [filter]
  );

  useEffect(() => {
    if (filter === 'drawing') {
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

  const filters = tObject<Record<'original' | 'copy' | 'drawings', string>>('gallery.filters');
  const isDrawingFilter = filter === 'drawing';
  const drawingTitlePrefix = language === 'pt' ? 'Desenho' : 'Drawing';

  return (
    <Layout>
      {/* Header */}
      <section style={{ padding: '40px 25px', backgroundColor: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', marginBottom: '15px', textTransform: 'uppercase' }}>{t('gallery.title')}</h1>
        <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          {t('gallery.intro')}
        </p>
      </section>

      {/* Filters */}
      <section style={{ padding: '20px 25px', borderBottom: '1px solid #ddd', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '30px' }}>
            <button
              onClick={() => setFilter('original')}
              style={{
                fontSize: '16px',
                textTransform: 'uppercase',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                borderBottom: filter === 'original' ? '2px solid black' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'original' ? '600' : '400'
              }}
            >
              {filters.original}
            </button>
            <button
              onClick={() => setFilter('copy')}
              style={{
                fontSize: '16px',
                textTransform: 'uppercase',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                borderBottom: filter === 'copy' ? '2px solid black' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'copy' ? '600' : '400'
              }}
            >
              {filters.copy}
            </button>
            <button
              onClick={() => setFilter('drawing')}
              style={{
                fontSize: '16px',
                textTransform: 'uppercase',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                borderBottom: filter === 'drawing' ? '2px solid black' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'drawing' ? '600' : '400'
              }}
            >
              {filters.drawings}
            </button>
          </div>

          {/* Currency Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px' }}>{t('gallery.currencyLabel')}</span>
            <button
              onClick={() => setCurrency('brl')}
              style={{
                padding: '6px 15px',
                border: '1px solid black',
                background: currency === 'brl' ? 'black' : 'white',
                color: currency === 'brl' ? 'white' : 'black',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              R$
            </button>
            <button
              onClick={() => setCurrency('usd')}
              style={{
                padding: '6px 15px',
                border: '1px solid black',
                background: currency === 'usd' ? 'black' : 'white',
                color: currency === 'usd' ? 'white' : 'black',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              US$
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: '40px 25px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '36px' }}>
            {isDrawingFilter
              ? drawingSeries.map((drawing, index) => (
                  <div
                    key={drawing.id}
                    className="artwork-card drawing-card group"
                    onClick={() => setSelectedDrawing(drawing)}
                    style={{ animationDelay: `${index * 60}ms`, cursor: 'pointer', aspectRatio: '3 / 4' }}
                  >
                    <img
                      src={drawing.image}
                      alt={`${drawingTitlePrefix} ${String(drawing.number).padStart(2, '0')}`}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-charcoal/80 to-transparent">
                      <h3 className="text-warm-white text-lg font-medium">
                        {`${drawingTitlePrefix} ${String(drawing.number).padStart(2, '0')}`}
                      </h3>
                    </div>
                  </div>
                ))
              : filteredArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="artwork-card aspect-square group"
                    onClick={() => setSelectedArtwork(artwork)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-charcoal/80 to-transparent">
                      <h3 className="text-warm-white text-lg font-medium">{artwork.title}</h3>
                      <p className="text-warm-white/80 text-sm">{artwork.year}</p>
                    </div>
                  </div>
                ))}
          </div>

          {!isDrawingFilter && filteredArtworks.length === 0 && (
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
              className="absolute top-4 right-4 w-10 h-10 bg-charcoal/80 text-warm-white rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-4 bg-charcoal/70 text-warm-white px-4 py-2 rounded-sm backdrop-blur-sm">
              <span className="text-sm tracking-wide">
                {`${drawingTitlePrefix} ${String(selectedDrawing.number).padStart(2, '0')}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
