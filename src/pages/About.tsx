import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';

const perfilImage = new URL('../assets/perfil.png', import.meta.url).href;

const About = () => {
  const { t, tArray, tObject } = useLanguage();
  const paragraphs = tArray('about.paragraphs');
  const influences = tObject<Array<{ icon: string; title: string; description: string }>>('about.influences.items');

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <h1 className="section-title">{t('about.title')}</h1>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <img
                src={perfilImage}
                alt="Paulo de Araújo"
                className="w-full aspect-[4/3] object-cover rounded-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Influences */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="section-title text-center mb-12">{t('about.influences.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {influences.map((item, index) => (
              <div key={`${item.title}-${index}`} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-terracotta/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
