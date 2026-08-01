import Layout from '@/components/Layout';
import { useLanguage } from '@/context/LanguageContext';
import exhibitionsImage from '@/assets/expo01.jpeg?w=800&format=webp&quality=76';

const Exhibitions = () => {
  const { t, tArray } = useLanguage();
  const exhibitions = tArray('exhibitions.items');

  return (
    <Layout>
      <section className="exhibitions-section py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="section-title">{t('exhibitions.title')}</h1>
                <p className="exhibitions-intro">
                  {t('exhibitions.intro')}
                </p>
              </div>
              <ul className="space-y-5">
                {exhibitions.map((entry, index) => {
                  const [year, ...rest] = entry.split(' - ');
                  const description = rest.join(' - ').trim();
                  return (
                    <li key={`${year}-${index}`} className="flex gap-4 items-start">
                      <span className="exhibitions-year min-w-[72px]">
                        {year}
                      </span>
                      <p className="exhibitions-description">
                        {description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <img
                src={exhibitionsImage}
                alt={t('exhibitions.imageAlt')}
                className="w-full max-w-[32rem] h-auto object-contain rounded-sm shadow-lg mx-auto lg:mx-0"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Exhibitions;
