import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';
import perfilImage from '@/assets/pintando-perto.jpg?w=1400&format=webp&quality=80';

const About = () => {
  const { t, tArray } = useLanguage();
  const paragraphs = tArray('about.paragraphs');

  return (
    <Layout>
      <section className="about-artist-section bg-white">
        <div className="mx-auto max-w-[1500px] pl-4 sm:pl-5 lg:pl-8 pr-0">
          <div className="about-artist-layout">
            <div className="about-artist-text animate-fade-in">
              <h1 className="section-title">{t('about.title')}</h1>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="about-artist-image">
              <img
                src={perfilImage}
                alt="Paulo de Araújo"
                className="about-artist-image-media"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
