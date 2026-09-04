import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import Layout from '@/components/Layout';
import ArtworkModal from '@/components/ArtworkModal';
import { artworks, Artwork } from '@/data/artworks';
import { useLanguage } from '@/context/LanguageContext';
import alegoriaLilasImage from '@/assets/alegoria lilás.jpg?w=1600&format=webp&quality=78';
import alegoriaLilasPreview from '@/assets/alegoria lilás.jpg?w=700&format=webp&quality=70';
import abstratoImage from '@/assets/abstrato.jpg?w=1600&format=webp&quality=78';
import abstratoPreview from '@/assets/abstrato.jpg?w=700&format=webp&quality=70';
import gravura02Image from '@/assets/gravura02.jpg?w=1600&format=webp&quality=78';
import gravura02Preview from '@/assets/gravura02.jpg?w=700&format=webp&quality=70';

type FilterType = 'original' | 'drawing' | 'zen' | 'photography' | 'abstract';

type SeriesKind = 'drawing' | 'zen' | 'photography' | 'abstract';

interface DrawingItem {
  id: string;
  image: string;
  previewImage: string;
  number: number;
  kind: SeriesKind;
  title?: string;
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

const photoPreviewImports = import.meta.glob<string>( '../assets/areia/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=700&format=webp&quality=70',
});

const photoFullImports = import.meta.glob<string>('../assets/areia/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?w=1600&format=webp&quality=78',
  });

const allDrawings: DrawingItem[] = Object.entries(drawingFullImports)
  .map(([path, image]) => {
    const match = path.match(/(desenho|tango)(\d+)/i);
    const seriesName = match?.[1].toLowerCase();
    const number = match ? Number(match[2]) : 0;
    return {
      id: seriesName === 'tango' ? `tango-${number}` : match ? `drawing-${number}` : path,
      image,
      previewImage: drawingPreviewImports[path] ?? image,
      number,
      kind: 'drawing',
      ...(seriesName === 'tango' ? { title: 'Tango 01' } : {}),
    };
  })
  .sort((a, b) => a.number - b.number);

const prioritizedDrawingIds = ['tango-1', 'drawing-3', 'drawing-9', 'drawing-10'];
const prioritizedDrawings = prioritizedDrawingIds
  .map((targetId) => allDrawings.find((item) => item.id === targetId))
  .filter((item): item is DrawingItem => Boolean(item));

const remainingDrawings = allDrawings.filter(
  (item) => !prioritizedDrawingIds.includes(item.id)
);

const drawingSeries: DrawingItem[] = [...prioritizedDrawings, ...remainingDrawings];

const zenOrder = (number: number) => (number > 0 ? number : Number.MAX_SAFE_INTEGER);

const zenSeries: DrawingItem[] = Object.entries(zenFullImports)
  .map(([path, image]) => {
    const match = path.match(/zen(\d+)/i);
    const number = match ? Number(match[1]) : 0;
    return {
      id: match ? `zen-${number}` : path,
      image,
      previewImage: zenPreviewImports[path] ?? image,
      number,
      kind: 'zen' as const,
    };
  })
  // imagens sem numeração na série (ex.: alta1) ficam por último
  .sort((a, b) => zenOrder(a.number) - zenOrder(b.number));

const photographySeries: DrawingItem[] = Object.entries(photoFullImports)
  .map(([path, image]) => {
    const match = path.match(/areias(?:_(\d+))?/i);
    const number = match ? (match[1] ? Number(match[1]) : 1) : 0;
    return {
      id: match ? `photo-${number}` : path,
      image,
      previewImage: photoPreviewImports[path] ?? image,
      number,
      kind: 'photography',
    };
  })
  .sort((a, b) => a.number - b.number);

const abstractSeries: DrawingItem[] = [
  {
    id: 'abstract-1',
    title: 'Alegoria Lilás',
    image: alegoriaLilasImage,
    previewImage: alegoriaLilasPreview,
    number: 1,
    kind: 'abstract',
  },
  {
    id: 'abstract-2',
    title: 'Abstrato',
    image: abstratoImage,
    previewImage: abstratoPreview,
    number: 2,
    kind: 'abstract',
  },
  {
    id: 'abstract-5',
    title: 'Gravura 02',
    image: gravura02Image,
    previewImage: gravura02Preview,
    number: 5,
    kind: 'abstract',
  },
];

const Gallery = () => {
  const { t, tObject, language } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('original');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<DrawingItem | null>(null);
  const [currency, setCurrency] = useState<'brl' | 'usd'>('brl');

  const filteredArtworks = useMemo(
    () => artworks.filter((artwork) => !['drawing', 'zen', 'photography', 'abstract'].includes(filter) && artwork.type === filter),
    [filter]
  );

  useEffect(() => {
    if (['drawing', 'zen', 'photography', 'abstract'].includes(filter)) {
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

  const filters = tObject<Record<'original' | 'drawings' | 'zen' | 'photography' | 'abstract', string>>('gallery.filters');
  const isDrawingFilter = filter === 'drawing';
  const isZenFilter = filter === 'zen';
  const isPhotographyFilter = filter === 'photography';
  const isAbstractFilter = filter === 'abstract';
  const drawingTitlePrefix = language === 'pt' ? 'Desenho' : 'Drawing';
  const zenTitlePrefix = language === 'pt' ? 'Zen' : 'Zen';
  const photographyTitlePrefix = language === 'pt' ? 'Fotografia' : 'Photography';
  const abstractTitlePrefix = language === 'pt' ? 'Abstrato' : 'Abstract';
  const activeSeries =
    filter === 'drawing'
      ? drawingSeries
      : filter === 'zen'
      ? zenSeries
      : filter === 'photography'
      ? photographySeries
      : filter === 'abstract'
      ? abstractSeries
      : null;

  const getSeriesLabel = (item: DrawingItem) => {
    if (item.title) {
      return item.title;
    }
    if (item.kind === 'drawing') {
      return `${drawingTitlePrefix} ${String(item.number).padStart(2, '0')}`;
    }
    if (item.kind === 'zen') {
      return `${zenTitlePrefix} ${String(item.number).padStart(2, '0')}`;
    }
    if (item.kind === 'photography') {
      return `${photographyTitlePrefix} ${String(item.number).padStart(2, '0')}`;
    }
    return `${abstractTitlePrefix} ${String(item.number).padStart(2, '0')}`;
  };

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
            <button
              onClick={() => setFilter('photography')}
              className={`gallery-filter-button ${filter === 'photography' ? 'is-active' : ''}`}
            >
              {filters.photography}
            </button>
            <button
              onClick={() => setFilter('abstract')}
              className={`gallery-filter-button ${filter === 'abstract' ? 'is-active' : ''}`}
            >
              {filters.abstract}
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
            {activeSeries
              ? activeSeries.map((item, index) => (
                  <div
                    key={item.id}
                    className="artwork-card drawing-card gallery-item group"
                    onClick={() => setSelectedDrawing(item)}
                    style={{ animationDelay: `${index * 60}ms`, cursor: 'pointer' }}
                  >
                    <img
                      src={item.previewImage}
                      alt={getSeriesLabel(item)}
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

          {!isDrawingFilter && !isZenFilter && !isPhotographyFilter && !isAbstractFilter && filteredArtworks.length === 0 && (
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
              alt={getSeriesLabel(selectedDrawing)}
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
