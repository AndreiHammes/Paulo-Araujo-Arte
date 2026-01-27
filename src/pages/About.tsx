import Layout from '@/components/Layout';
import perfil from '@/assets/perfil.png';
import assinatura from '@/assets/assinatura.png';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t, tArray, tObject } = useLanguage();
  const paragraphs = tArray('about.paragraphs');
  const statement = tObject<{ title: string; quote: string; author: string }>('about.statement');
  const timeline = tObject<Array<{ year: string; text: string }>>('about.timeline.items');
  const influences = tObject<Array<{ icon: string; title: string; description: string }>>('about.influences.items');

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <h1 className="section-title">{t('about.title')}</h1>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative">
              <img
                src={perfil}
                alt="Paulo de Araújo"
                className="w-full aspect-[4/3] object-cover rounded-sm shadow-lg"
              />
              <img
                src={assinatura}
                alt={t('about.signatureAlt')}
                className="absolute -bottom-10 -left-12 w-44 select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-8 text-foreground">
              {statement.title}
            </h2>
            <blockquote className="text-xl lg:text-2xl text-muted-foreground font-light italic leading-relaxed">
              {statement.quote}
            </blockquote>
            <p className="mt-6 text-primary font-medium tracking-wider">{statement.author}</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="section-title text-center mb-16">{t('about.timeline.title')}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <div
                  key={`${item.year}-${index}`}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2 md:text-right pl-8 md:pl-0 md:pr-8">
                    {index % 2 === 0 && (
                      <>
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.text}</p>
                      </>
                    )}
                    {index % 2 !== 0 && (
                      <div className="md:hidden">
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.text}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 -translate-y-0.5" />
                  
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    {index % 2 !== 0 && (
                      <>
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.text}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Influences */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
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
