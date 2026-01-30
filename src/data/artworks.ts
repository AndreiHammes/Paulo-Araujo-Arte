const asset = (relativePath: string) => new URL(relativePath, import.meta.url).href;

const artwork1 = asset('../assets/estandarte01.jpg');
const artwork2 = asset('../assets/estandarte02.jpg');
const artwork3 = asset('../assets/estandarte03.jpg');
const artwork4 = asset('../assets/estandarte04.jpg');
const artwork5 = asset('../assets/estandarte 5.jpg');
const artwork6 = asset('../assets/estandarte 6.jpg');

export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  technique: string;
  techniqueEn: string;
  description: string;
  descriptionEn: string;
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
    title: 'Força e céu',
    year: 2023,
    dimensions: '100 x 100 cm',
    technique: 'Gravura em metal sobre papel algodão',
    techniqueEn: 'Metal engraving on cotton paper',
    description: 'Esta obra explora a dualidade entre luz e sombra, inspirada nas mandalas africanas e nos símbolos solares presentes em diversas culturas ancestrais. Os círculos concêntricos representam os ciclos da vida e a conexão entre o terreno e o cósmico.',
    descriptionEn: 'This piece explores the duality between light and shadow, inspired by African mandalas and solar symbols found in ancestral cultures. The concentric circles represent the cycles of life and the bond between the earthly and the cosmic.',
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
    techniqueEn: 'Woodcut with natural pigments',
    description: 'Inspirada na cosmologia indígena brasileira, esta peça celebra os quatro elementos e sua harmonia com o universo. As formas orgânicas entrelaçadas representam a interdependência de toda a vida na Terra.',
    descriptionEn: 'Inspired by Brazilian Indigenous cosmology, this piece celebrates the four elements and their harmony with the universe. The interlaced organic forms represent the interdependence of all life on Earth.',
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
    techniqueEn: 'Mixed media on canvas',
    description: 'Uma homenagem às raízes africanas da cultura brasileira. As três faces representam passado, presente e futuro, unidos pela tradição oral e pela memória coletiva dos povos que formaram nossa identidade.',
    descriptionEn: 'A tribute to the African roots of Brazilian culture. The three faces represent past, present, and future, bound by oral tradition and the collective memory of the peoples who shaped our identity.',
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
    techniqueEn: 'Metal engraving with gold leaf',
    description: 'Esta obra convida o espectador a uma jornada interior. A rosa dos ventos não aponta para o norte geográfico, mas para os caminhos do autoconhecimento, simbolizados pelos elementos naturais que a circundam.',
    descriptionEn: 'This work invites the viewer on an inward journey. The compass rose does not point to the geographic north, but to the paths of self-knowledge, symbolized by the natural elements surrounding it.',
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
    techniqueEn: 'Acrylic and mineral pigments on canvas',
    description: 'Celebração do solstício e da energia vital que move todas as coisas. As figuras dançantes representam a humanidade em harmonia com os ciclos cósmicos, guiadas pelo sol que a tudo ilumina e transforma.',
    descriptionEn: 'A celebration of the solstice and the vital energy that moves all things. The dancing figures portray humanity in harmony with cosmic cycles, guided by the sun that illuminates and transforms everything.',
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
    techniqueEn: 'Copper engraving with patina',
    description: 'O cosmos como metáfora do inconsciente. Esta obra mapeia as constelações internas que guiam nossa existência, com símbolos que remetem tanto à astronomia quanto à alquimia medieval.',
    descriptionEn: 'The cosmos as a metaphor for the unconscious. This piece maps the inner constellations that guide our existence, with symbols that evoke both astronomy and medieval alchemy.',
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
