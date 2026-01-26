import Layout from '@/components/Layout';
import artistPortrait from '@/assets/artist-portrait.jpg';

const About = () => {
  const timeline = [
    { year: '1965', event: 'Nasce em Porto Alegre, Rio Grande do Sul' },
    { year: '1985', event: 'Inicia estudos em Artes Visuais na UFRGS' },
    { year: '1990', event: 'Primeira exposição individual na Galeria Iberê Camargo' },
    { year: '1998', event: 'Viagem de estudos para a África Ocidental' },
    { year: '2005', event: 'Exposição coletiva no MASP - São Paulo' },
    { year: '2012', event: 'Residência artística em Berlim, Alemanha' },
    { year: '2018', event: 'Retrospectiva "30 Anos de Criação" no MARGS' },
    { year: '2024', event: 'Nova série "Constelações Interiores"' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <h1 className="section-title">Sobre o Artista</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Paulo de Araújo é um artista plástico brasileiro cuja obra transcende fronteiras 
                culturais e temporais. Natural de Porto Alegre, desenvolveu desde jovem uma 
                fascinação pelas narrativas visuais dos povos tradicionais.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Seu trabalho é uma síntese única de influências africanas, indígenas brasileiras 
                e europeias, tecidas através de técnicas ancestrais e contemporâneas. Cada gravura 
                é um portal para mundos onde o sagrado e o cotidiano se encontram.
              </p>
            </div>
            <div className="relative">
              <img
                src={artistPortrait}
                alt="Paulo de Araújo"
                className="w-full aspect-[4/3] object-cover rounded-sm shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4">
                <p className="text-sm tracking-widest uppercase">Desde 1985</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-8 text-foreground">
              Declaração Artística
            </h2>
            <blockquote className="text-xl lg:text-2xl text-muted-foreground font-light italic leading-relaxed">
              "Minha arte é uma ponte entre mundos – o visível e o invisível, o ancestral e o 
              contemporâneo, o individual e o coletivo. Cada traço carrega a memória de povos 
              que vieram antes de nós e a esperança daqueles que virão depois. Busco, através 
              das formas e cores, despertar no espectador a consciência de que todos somos 
              parte de uma mesma trama cósmica."
            </blockquote>
            <p className="mt-6 text-primary font-medium tracking-wider">— Paulo de Araújo</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="section-title text-center mb-16">Trajetória</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2 md:text-right pl-8 md:pl-0 md:pr-8">
                    {index % 2 === 0 && (
                      <>
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.event}</p>
                      </>
                    )}
                    {index % 2 !== 0 && (
                      <div className="md:hidden">
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.event}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 -translate-y-0.5" />
                  
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    {index % 2 !== 0 && (
                      <>
                        <span className="text-primary font-medium text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.event}</p>
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
          <h2 className="section-title text-center mb-12">Influências</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-terracotta/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Arte Africana</h3>
              <p className="text-muted-foreground text-sm">
                Máscaras, padrões geométricos e a força expressiva da arte do continente-mãe.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-ochre/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Povos Originários</h3>
              <p className="text-muted-foreground text-sm">
                Cosmologia indígena, grafismos e a conexão sagrada com a natureza.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Modernismo Brasileiro</h3>
              <p className="text-muted-foreground text-sm">
                A liberdade formal e a identidade cultural do movimento modernista.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
