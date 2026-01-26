import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ArtworkModal from '@/components/ArtworkModal';
import { artworks, Artwork } from '@/data/artworks';

type FilterType = 'all' | 'original' | 'copy';

const Gallery = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currency, setCurrency] = useState<'brl' | 'usd'>('brl');

  const filteredArtworks = artworks.filter((artwork) => {
    if (filter === 'all') return true;
    return artwork.type === filter;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtwork(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="section-title text-center mb-4">Gravuras</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Explore a coleção de obras originais e reproduções autorizadas. 
            Cada peça é assinada e acompanhada de certificado de autenticidade.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter Buttons */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setFilter('all')}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('original')}
                className={`filter-btn ${filter === 'original' ? 'active' : ''}`}
              >
                Originais
              </button>
              <button
                onClick={() => setFilter('copy')}
                className={`filter-btn ${filter === 'copy' ? 'active' : ''}`}
              >
                Cópias
              </button>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Moeda:</span>
              <button
                onClick={() => setCurrency('brl')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  currency === 'brl'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                R$
              </button>
              <button
                onClick={() => setCurrency('usd')}
                className={`px-3 py-1 rounded-sm transition-colors ${
                  currency === 'usd'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                US$
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArtworks.map((artwork, index) => (
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
                {artwork.type === 'original' && (
                  <span className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground text-xs px-2 py-1 tracking-wider uppercase">
                    Original
                  </span>
                )}
              </div>
            ))}
          </div>

          {filteredArtworks.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Nenhuma obra encontrada com os filtros selecionados.
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
    </Layout>
  );
};

export default Gallery;
