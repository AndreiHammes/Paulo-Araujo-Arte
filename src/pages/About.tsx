import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';
import perfilImage from '@/assets/pintando-perto.jpg?w=1400&format=webp&quality=80';
import perfil2Image from '@/assets/perfil02.jpg?w=1400&format=webp&quality=80';
import f656Image from '@/assets/f65668400.jpg?w=1400&format=webp&quality=80';
import f437Image from '@/assets/f43776456.jpg?w=1400&format=webp&quality=80';

const carouselImages = [
  { src: perfilImage, alt: 'Paulo de Araújo trabalhando' },
  { src: perfil2Image, alt: 'Paulo de Araújo' },
  { src: f656Image, alt: 'Detalhe da obra de Paulo de Araújo' },
  { src: f437Image, alt: 'Obra de Paulo de Araújo' },
];

const About = () => {
  const { t, tArray } = useLanguage();
  const paragraphs = tArray('about.paragraphs');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Layout>
      <section className="about-artist-section bg-white">
        <div className="mx-auto max-w-[1500px] pl-0 sm:pl-5 lg:pl-8 pr-0">
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
              <div className="about-carousel">
                {carouselImages.map((image, index) => (
                  <img
                    key={`${image.alt}-${index}`}
                    src={image.src}
                    alt={image.alt}
                    className={`about-carousel-image ${index === activeIndex ? 'is-active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
