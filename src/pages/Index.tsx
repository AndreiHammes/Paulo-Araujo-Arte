import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import artistPortrait from '@/assets/artist-portrait.jpg';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section - Split Screen */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row">
        {/* Left - Image */}
        <div className="lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden">
          <img
            src={artistPortrait}
            alt="Paulo de Araújo em seu atelier"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right - Content */}
        <div className="lg:w-1/2 flex items-center px-8 lg:px-16 py-12 lg:py-0 bg-background">
          <div className="max-w-xl animate-fade-in">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-light">
              Artista natural de Porto Alegre, no sul do Brasil. Suas pinturas criam um diálogo 
              entre símbolos universais e a essência da natureza interior, influenciadas pela 
              cultura africana, pelos povos originários e pela rica tradição da arte brasileira.
            </p>
            
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-light">
              Paulo de Araújo explora formas geométricas e jogos de espaço para revelar a 
              beleza misteriosa e convidativa de suas obras. Cada peça é uma expressão única 
              que conecta o espectador a algo maior e transcendente. Descubra um mundo onde 
              tradição e inovação se encontram.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/gravuras"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Ver Gravuras
              </Link>
              <Link
                to="/sobre"
                className="inline-flex items-center px-8 py-3 border border-foreground/30 text-foreground tracking-widest uppercase text-sm font-medium hover:bg-foreground/5 transition-colors"
              >
                Conhecer o Artista
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
