import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  technique: string;
  description: string;
  image: string;
  type: 'original' | 'copy';
  prices: {
    original: { brl: number; usd: number };
    copy: { brl: number; usd: number };
  };
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Encontro de Sóis',
    year: 2023,
    dimensions: '100 x 100 cm',
    technique: 'Gravura em metal sobre papel algodão',
    description: 'Esta obra explora a dualidade entre luz e sombra, inspirada nas mandalas africanas e nos símbolos solares presentes em diversas culturas ancestrais. Os círculos concêntricos representam os ciclos da vida e a conexão entre o terreno e o cósmico.',
    image: artwork1,
    type: 'original',
    prices: {
      original: { brl: 8500, usd: 1700 },
      copy: { brl: 850, usd: 170 },
    },
  },
  {
    id: '2',
    title: 'Mandala da Criação',
    year: 2023,
    dimensions: '80 x 80 cm',
    technique: 'Xilogravura com pigmentos naturais',
    description: 'Inspirada na cosmologia indígena brasileira, esta peça celebra os quatro elementos e sua harmonia com o universo. As formas orgânicas entrelaçadas representam a interdependência de toda a vida na Terra.',
    image: artwork2,
    type: 'original',
    prices: {
      original: { brl: 7200, usd: 1440 },
      copy: { brl: 720, usd: 144 },
    },
  },
  {
    id: '3',
    title: 'Ancestrais',
    year: 2022,
    dimensions: '120 x 90 cm',
    technique: 'Técnica mista sobre tela',
    description: 'Uma homenagem às raízes africanas da cultura brasileira. As três faces representam passado, presente e futuro, unidos pela tradição oral e pela memória coletiva dos povos que formaram nossa identidade.',
    image: artwork3,
    type: 'original',
    prices: {
      original: { brl: 12000, usd: 2400 },
      copy: { brl: 1200, usd: 240 },
    },
  },
  {
    id: '4',
    title: 'Rosa dos Ventos Interior',
    year: 2022,
    dimensions: '70 x 70 cm',
    technique: 'Gravura em metal com folha de ouro',
    description: 'Esta obra convida o espectador a uma jornada interior. A rosa dos ventos não aponta para o norte geográfico, mas para os caminhos do autoconhecimento, simbolizados pelos elementos naturais que a circundam.',
    image: artwork4,
    type: 'copy',
    prices: {
      original: { brl: 9800, usd: 1960 },
      copy: { brl: 980, usd: 196 },
    },
  },
  {
    id: '5',
    title: 'Dança do Sol',
    year: 2024,
    dimensions: '150 x 100 cm',
    technique: 'Acrílica e pigmentos minerais sobre tela',
    description: 'Celebração do solstício e da energia vital que move todas as coisas. As figuras dançantes representam a humanidade em harmonia com os ciclos cósmicos, guiadas pelo sol que a tudo ilumina e transforma.',
    image: artwork5,
    type: 'original',
    prices: {
      original: { brl: 15000, usd: 3000 },
      copy: { brl: 1500, usd: 300 },
    },
  },
  {
    id: '6',
    title: 'Constelação Interior',
    year: 2024,
    dimensions: '90 x 90 cm',
    technique: 'Gravura em cobre com pátina',
    description: 'O cosmos como metáfora do inconsciente. Esta obra mapeia as constelações internas que guiam nossa existência, com símbolos que remetem tanto à astronomia quanto à alquimia medieval.',
    image: artwork6,
    type: 'copy',
    prices: {
      original: { brl: 11000, usd: 2200 },
      copy: { brl: 1100, usd: 220 },
    },
  },
];

export const formatPrice = (value: number, currency: 'brl' | 'usd'): string => {
  if (currency === 'brl') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
