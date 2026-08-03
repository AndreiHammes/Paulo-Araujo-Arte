import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

type TranslationValue = string | string[] | Record<string, any>;

type Translations = Record<Language, Record<string, TranslationValue>>;

const translations: Translations = {
  pt: {
    navigation: {
      home: 'Início',
      about: 'O Artista',
      gallery: 'Obras',
      exhibitions: 'Exposições',
      contact: 'Contato',
    },
    languageToggle: {
      ariaToEnglish: 'Alterar idioma para inglês',
      ariaToPortuguese: 'Alterar idioma para português',
      toEnglish: 'EN',
      toPortuguese: 'PT',
    },
    home: {
      hero: {
        paragraphs: [
          'Utilizo a força e a energia dos símbolos como instrumento de conexão íntima e universal. Minha pintura propõe um mergulho nas leis esquecidas da natureza interior, utilizando jogos geométricos, contrastes entre simetria e assimetria, curvas, retas, cheios e vazios. Cada obra nasce como um fragmento de um universo reinventado, convidando o espectador a explorar sentidos que vão além da objetividade. Para mim, criar é abrir um portal para uma multi dimensão, onde forma, cor e silêncio se unem numa expressão singular de beleza e mistério'
        ],
        moreButton: {
          show: 'Ver mais',
          hide: 'Ver menos',
        },
      },
    },
    gallery: {
      title: 'Obras',
      intro: 'Explore a coleção de obras originais, reproduções autorizadas e a série de desenhos do artista.',
      filters: {
        original: 'Estandartes Imaginários',
        drawings: 'Desenhos',
        zen: 'Série Zen',
      },
      currencyLabel: 'Moeda:',
      empty: 'Nenhuma obra encontrada com os filtros selecionados.',
    },
    exhibitions: {
      title: 'Exposições',
      intro: 'Uma trajetória marcada por mostras no Brasil e no exterior, conectando diferentes públicos à potência simbólica das obras.',
      imageAlt: 'Registro de gravura do artista Paulo de Araújo',
      items: [
        '1987 - Couromoda São Paulo. Pintura painel "Praça Vermelha de Moscou", medindo 3,50 m x 12,50 m.',
        '2009 - FENEARTE - Feira Nacional de Arte e Artesanato, Recife/PE.',
        '2009 - Exposição na Galeria Imaginarium, Olinda/PE.',
        '2021 - Espaço Terra Verde, exposição coletiva "Organicidades" com curadoria de Anaurelino de Barros Neto.',
        '2021 - Obras expostas e vendidas em Wellington, Nova Zelândia, pela curadora e colecionadora Getrude Matsche.',
        '2022 - Centro Cultural de Gramado/RS, exposição coletiva "Organicidades", curadoria de Anaurelino de Barros Neto.',
        '2022 - Duas obras expostas e vendidas para Wisconsin/EUA para Dianne Marie.',
        '2024 - Galeria Bublitz - exposição da obra "Estandarte Imaginário". Doação para restauração da entidade Pão dos Pobres de Porto Alegre, coletiva da AHMI.',
        '2025 - Galeria Habitart - exposição das séries "Estandartes Imaginários", "Zen" e "Tango em Grafite".',
      ],
    },
    artworkModal: {
      closeAria: 'Fechar',
      originalBadge: 'Original',
      dimensions: 'Dimensões disponíveis',
      technique: 'Técnica',
      values: 'Valores',
      original: 'Original',
      copy: 'Cópia Assinada',
      whatsappCta: 'Consultar no WhatsApp',
      whatsappMessage: 'Olá! Tenho interesse na obra "{title}" ({year}). Gostaria de mais informações.',
    },
    about: {
      title: "",
      paragraphs: [
        'Sou artista visual natural de Porto Alegre, no sul do Brasil. Minha pintura estabelece um diálogo entre símbolos universais e dimensões da natureza interior, articulando referências da cultura africana, dos povos originários e da tradição da arte brasileira. O trabalho investiga a relação entre forma, geometria e espaço como estruturas simbólicas capazes de revelar uma beleza sutil, enigmática e convidativa. Cada obra é concebida como uma peça única, resultado de um processo atento e sensível, onde matéria, gesto e significado se entrelaçam. Proponho ao observador uma experiência de contemplação e conexão, abrindo caminhos para leituras pessoais e afetivas. Situada no encontro entre tradição e contemporaneidade, dialoga com o tempo, a memória e o imaginário coletivo, especialmente adequada para colecionadores, projetos curatoriais e trabalhos por encomenda.'
      ],
      signatureAlt: 'Logo do Atelier Paulo de Araújo',
    },
    contact: {
      title: 'Contato',
      intro: 'Entre em contato para informações sobre obras, exposições, encomendas ou parcerias artísticas.',
      talkToMe: 'Fale comigo',
      whatsappCta: 'Conversar no WhatsApp',
      emailLabel: 'Email',
      emailValue: 'paulodearaujo.arte@gmail.com',
      phoneLabel: 'Telefone',
      phoneValue: '+55 51 98484-6665',
      studioLabel: 'Atelier',
      studioAddress: 'Porto Alegre, RS - Brasil\nCidade Baixa - Porto Alegre, RS\nCEP 90050-000',
      socialTitle: 'Redes Sociais',
      form: {
        title: 'Envie uma Mensagem',
        nameLabel: 'Nome',
        namePlaceholder: 'Seu nome completo',
        emailLabel: 'Email',
        emailPlaceholder: 'seu@email.com',
        subjectLabel: 'Assunto',
        subjectPlaceholder: 'Selecione um assunto',
        subjectOptions: [
          { value: 'purchase', label: 'Interesse em obra' },
          { value: 'commission', label: 'Encomenda personalizada' },
          { value: 'exhibition', label: 'Exposição / Parceria' },
          { value: 'press', label: 'Imprensa' },
          { value: 'other', label: 'Outro' },
        ],
        messageLabel: 'Mensagem',
        messagePlaceholder: 'Escreva sua mensagem...',
        submit: 'Enviar Mensagem',
        success: 'Obrigado pelo contato! Em breve retornaremos.',
      },
      mapCity: 'Porto Alegre, RS - Brasil',
    },
    footer: {
      navigationTitle: 'Navegação',
      contactTitle: 'Contato',
      rights: '© {year} Paulo de Araújo. Todos os direitos reservados.',
      tagline: 'Arte Brasileira Contemporânea',
    },
    notFound: {
      title: 'Oops! Página não encontrada',
      cta: 'Voltar ao início',
    },
  },
  en: {
    navigation: {
      home: 'Home',
      about: 'About the Artist',
      gallery: 'Works',
      exhibitions: 'Exhibitions',
      contact: 'Contact',
    },
    languageToggle: {
      ariaToEnglish: 'Switch language to English',
      ariaToPortuguese: 'Switch language to Portuguese',
      toEnglish: 'EN',
      toPortuguese: 'PT',
    },
    home: {
      hero: {
        paragraphs: [
          'I harness the power and energy of symbols as a means of intimate and universal connection. My painting invites a deep dive into the forgotten laws of our inner nature, employing geometric interplay, contrasts between symmetry and asymmetry, curves, straight lines, and the balance of fullness and emptiness. Each work emerges as a fragment of a reinvented universe, inviting the viewer to explore meanings that transcend mere objectivity. For me, creating is an act of opening a portal to a multidimensional realm where form, color, and silence converge in a unique expression of beauty and mystery.'
        ],
        moreButton: {
          show: 'See more',
          hide: 'See less',
        },
      },
    },
    gallery: {
      title: 'Works',
      intro: 'Explore the collection of original works, authorized reproductions, and drawings by the artist.',
      filters: {
        original: 'Imaginary Banners',
        drawings: 'Drawings',
        zen: 'Zen Series',
      },
      currencyLabel: 'Currency:',
      empty: 'No artworks found for the selected filters.',
    },
    exhibitions: {
      title: 'Exhibitions',
      intro: 'A journey that spans Brazil and abroad, connecting diverse audiences to the symbolic power of the artworks.',
      imageAlt: 'Printmaking piece by the artist Paulo de Araújo',
      items: [
        '1987 - Couromoda São Paulo. Large-scale mural painting "Red Square of Moscow", measuring 3.50 m x 12.50 m.',
        '2009 - FENEARTE - National Art and Handicraft Fair, Recife/PE, Brazil.',
        '2009 - Exhibition at Imaginarium Gallery, Olinda/PE, Brazil.',
        '2021 - Espaço Terra Verde, group exhibition "Organicidades", curated by Anaurelino de Barros Neto.',
        '2021 - Works showcased and acquired in Wellington, New Zealand, by curator and collector Getrude Matsche.',
        '2022 - Centro Cultural de Gramado/RS, group exhibition "Organicidades", curated by Anaurelino de Barros Neto.',
        '2022 - Two artworks exhibited and acquired in Wisconsin, USA, by Dianne Marie.',
        '2024 - Galeria Bublitz - exhibition of the piece "Estandarte Imaginário". Donation to support the restoration of the Pão dos Pobres institution in Porto Alegre, collective by AHMI.',
        '2025 - Galeria Habitart - exhibition of the series "Estandartes Imaginários", "Zen", and "Tango em Grafite".',
      ],
    },
    artworkModal: {
      closeAria: 'Close',
      originalBadge: 'Original',
      dimensions: 'Available dimensions',
      technique: 'Technique',
      values: 'Pricing',
      original: 'Original',
      copy: 'Signed Print',
      whatsappCta: 'Request on WhatsApp',
      whatsappMessage: 'Hello! I am interested in the artwork "{title}" ({year}). Could you send me more information?',
    },
    about: {
      title: '',
      paragraphs: [
        'I am a visual artist originally from Porto Alegre, in southern Brazil. My painting establishes a dialogue between universal symbols and dimensions of the inner self, drawing upon references from African culture, Indigenous peoples, and the tradition of Brazilian art. The work explores the relationship between form, geometry, and space as symbolic structures capable of revealing a beauty that is subtle, enigmatic, and inviting. Each piece is conceived as a unique work—the result of a mindful, sensitive process in which material, gesture, and meaning intertwine. I invite the viewer to experience contemplation and connection, opening pathways for personal and emotional interpretations. Situated at the intersection of tradition and contemporaneity, the work engages with time, memory, and the collective imagination, making it particularly well-suited for collectors, curatorial projects, and commissions.'
      ],
      signatureAlt: 'Paulo de Araújo Atelier Logo',
    },
    contact: {
      title: 'Contact',
      intro: 'Get in touch for information about artworks, exhibitions, commissions, or artistic collaborations.',
      talkToMe: 'Talk to me',
      whatsappCta: 'Chat on WhatsApp',
      emailLabel: 'Email',
      emailValue: 'paulodearaujo.arte@gmail.com',
      phoneLabel: 'Phone',
      phoneValue: '+55 51 98484-6665',
      studioLabel: 'Studio',
      studioAddress: 'Porto Alegre, RS - Brazil\nCidade Baixa - Porto Alegre, RS\nZIP 90050-000',
      socialTitle: 'Social Networks',
      form: {
        title: 'Send a Message',
        nameLabel: 'Name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Select a subject',
        subjectOptions: [
          { value: 'purchase', label: 'Artwork inquiry' },
          { value: 'commission', label: 'Custom commission' },
          { value: 'exhibition', label: 'Exhibition / Partnership' },
          { value: 'press', label: 'Press' },
          { value: 'other', label: 'Other' },
        ],
        messageLabel: 'Message',
        messagePlaceholder: 'Write your message...',
        submit: 'Send Message',
        success: 'Thanks for getting in touch! We will reply shortly.',
      },
      mapCity: 'Porto Alegre, RS - Brazil',
    },
    footer: {
      navigationTitle: 'Navigation',
      contactTitle: 'Contact',
      rights: '© {year} Paulo de Araújo. All rights reserved.',
      tagline: 'Brazilian Contemporary Art',
    },
    notFound: {
      title: 'Oops! Page not found',
      cta: 'Return home',
    },
  },
};

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  tObject: <T = Record<string, unknown>>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const resolveKey = (language: Language, key: string): TranslationValue => {
  const segments = key.split('.');
  let current: TranslationValue = translations[language];

  for (const segment of segments) {
    if (typeof current === 'object' && current !== null && !Array.isArray(current) && segment in current) {
      current = (current as Record<string, TranslationValue>)[segment];
    } else {
      return key;
    }
  }

  return current;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('pa-language');
      if (stored === 'pt' || stored === 'en') {
        return stored;
      }
    }
    return 'pt';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pa-language', language);
    }
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const getValue = useCallback(
    (key: string): TranslationValue => resolveKey(language, key),
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    toggleLanguage,
    t: (key: string) => {
      const result = getValue(key);
      return typeof result === 'string' ? result : key;
    },
    tArray: (key: string) => {
      const result = getValue(key);
      return Array.isArray(result) ? result : [];
    },
    tObject: <T,>(key: string) => {
      const result = getValue(key);
      return (result as T) ?? ({} as T);
    },
  }), [getValue, language, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
