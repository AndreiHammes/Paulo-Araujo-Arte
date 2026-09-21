import artwork1 from '@/assets/estandartes/estandarte01.jpg?w=1600&format=webp&quality=80';
import artwork1Preview from '@/assets/estandartes/estandarte01.jpg?w=760&format=webp&quality=72';
import artwork2 from '@/assets/estandartes/estandarte02.jpg?w=1600&format=webp&quality=80';
import artwork2Preview from '@/assets/estandartes/estandarte02.jpg?w=760&format=webp&quality=72';
import artwork3 from '@/assets/estandartes/estandarte03.jpg?w=1600&format=webp&quality=80';
import artwork3Preview from '@/assets/estandartes/estandarte03.jpg?w=760&format=webp&quality=72';
import artwork4 from '@/assets/estandartes/estandarte04.jpg?w=1600&format=webp&quality=80';
import artwork4Preview from '@/assets/estandartes/estandarte04.jpg?w=760&format=webp&quality=72';
import artwork5 from '@/assets/estandartes/estandarte05.jpg?w=1600&format=webp&quality=80';
import artwork5Preview from '@/assets/estandartes/estandarte05.jpg?w=760&format=webp&quality=72';
import artwork6 from '@/assets/estandartes/estandarte06.jpg?w=1600&format=webp&quality=80';
import artwork6Preview from '@/assets/estandartes/estandarte06.jpg?w=760&format=webp&quality=72';
import artwork7 from '@/assets/estandartes/estandarte07.jpg?w=1600&format=webp&quality=80';
import artwork7Preview from '@/assets/estandartes/estandarte07.jpg?w=760&format=webp&quality=72';
import artwork8 from '@/assets/estandartes/vestigios_3.jpg?w=1600&format=webp&quality=80';
import artwork8Preview from '@/assets/estandartes/vestigios_3.jpg?w=760&format=webp&quality=72';
import artwork9 from '@/assets/estandartes/vestigios_site.jpg?w=1600&format=webp&quality=80';
import artwork9Preview from '@/assets/estandartes/vestigios_site.jpg?w=760&format=webp&quality=72';
import esplendorImage from '@/assets/esplendor em alta recortado.jpg?w=1600&format=webp&quality=80';
import esplendorPreview from '@/assets/esplendor em alta recortado.jpg?w=760&format=webp&quality=72';

export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  technique: string;
  techniqueEn: string;
  image: string;
  previewImage: string;
  type: 'original' | 'copy';
  /** Valor da obra original, em reais. O valor em dólar é convertido pela cotação do dia. */
  priceBrl: number;
}

/** Tamanhos disponíveis para cópias assinadas, com preço fixo em reais. */
export const COPY_SIZES = [
  { id: '80', label: '80 x 80 cm', priceBrl: 1700 },
  { id: '90', label: '90 x 90 cm', priceBrl: 1850 },
  { id: '100', label: '100 x 100 cm', priceBrl: 2050 },
] as const;

export type CopySizeId = typeof COPY_SIZES[number]['id'];

export const artworks: Artwork[] = [
  {
    id: '10',
    title: 'Esplendor da Estação',
    year: 2025,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: esplendorImage,
    previewImage: esplendorPreview,
    type: 'original',
    priceBrl: 10500,
  },
  {
    id: '1',
    title: 'Força e céu',
    year: 2015,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork1,
    previewImage: artwork1Preview,
    type: 'original',
    priceBrl: 11500,
  },
  {
    id: '2',
    title: 'Silêncio Azul',
    year: 2019,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork2,
    previewImage: artwork2Preview,
    type: 'original',
    priceBrl: 11500,
  },
  {
    id: '3',
    title: 'O Tempo',
    year: 2019,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork3,
    previewImage: artwork3Preview,
    type: 'original',
    priceBrl: 10500,
  },
  {
    id: '4',
    title: 'África',
    year: 2019,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork4,
    previewImage: artwork4Preview,
    type: 'original',
    priceBrl: 10500,
  },
  {
    id: '5',
    title: 'Os Quatro Elementos',
    year: 2019,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork5,
    previewImage: artwork5Preview,
    type: 'original',
    priceBrl: 11500,
  },
  {
    id: '6',
    title: 'Estandarte Maori',
    year: 2019,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork6,
    previewImage: artwork6Preview,
    type: 'original',
    priceBrl: 10500,
  },
  {
    id: '7',
    title: 'Transição em vermelho',
    year: 2020,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork7,
    previewImage: artwork7Preview,
    type: 'original',
    priceBrl: 10500,
  },
  {
    id: '8',
    title: 'Depois do Silêncio',
    year: 2023,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork8,
    previewImage: artwork8Preview,
    type: 'original',
    priceBrl: 9800,
  },
  {
    id: '9',
    title: 'Herança',
    year: 2023,
    dimensions: '150 x 150 cm',
    technique: 'Acrílica sobre tela',
    techniqueEn: 'Acrylic on canvas',
    image: artwork9,
    previewImage: artwork9Preview,
    type: 'original',
    priceBrl: 10500,
  },
];

/**
 * Formata um valor em reais na moeda escolhida.
 * Em dólar, converte pela cotação USD -> BRL recebida (ver `useUsdRate`).
 */
export const formatPrice = (
  brlValue: number,
  currency: 'brl' | 'usd',
  usdBrlRate: number
): string => {
  if (currency === 'brl') {
    return brlValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  return (brlValue / usdBrlRate).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
