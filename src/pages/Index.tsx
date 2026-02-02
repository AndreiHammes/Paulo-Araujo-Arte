import { useState } from 'react';
import Layout from '@/components/Layout';
import estandarteDois from '@/assets/estandartes/estandarte02.jpg';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { tArray, t } = useLanguage();
  const paragraphs = tArray('home.hero.paragraphs') as string[];
  const [showAll, setShowAll] = useState(false);

  const midpoint = Math.ceil(paragraphs.length / 2);
  const visibleParagraphs = showAll ? paragraphs : paragraphs.slice(0, midpoint);
  const hasHiddenContent = paragraphs.length > midpoint;

  return (
    <Layout>
      <div className="hero-section">
        <div className="hero-text">
          {visibleParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {hasHiddenContent && (
            <button
              type="button"
              className="hero-more-button"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? t('home.hero.moreButton.hide') : t('home.hero.moreButton.show')}
            </button>
          )}
        </div>
        <div className="hero-image">
          <img src={estandarteDois} alt="Estandarte 02" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
