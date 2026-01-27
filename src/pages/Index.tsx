import Layout from '@/components/Layout';
import pintandoPerto from '@/assets/pintando-perto.jpg';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { tArray } = useLanguage();
  const paragraphs = tArray('home.hero.paragraphs');

  return (
    <Layout>
      <div className="hero-section">
        <div className="hero-image">
          <img src={pintandoPerto} alt="Imagem" />
        </div>
        <div className="hero-text">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
