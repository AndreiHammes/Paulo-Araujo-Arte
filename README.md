# Portfólio Paulo de Araújo

Site institucional para apresentar o trabalho e a trajetória do artista Paulo de Araújo. O projeto une biografia, galeria filtrável de gravuras e desenhos, informações de contato e um seletor de idioma PT/EN, entregando uma experiência visual consistente com a identidade do artista.

## Principais recursos

- Layout responsivo inspirado no material original do artista
- Galeria com filtros por tipo de obra e zoom para desenhos
- Modal com detalhes, preços em múltiplas moedas e CTA para WhatsApp
- Conteúdo totalmente traduzível (português e inglês) com persistência de preferência
- Páginas institucionais (Sobre, Contato) alinhadas à marca e acessibilidade

## Tecnologias utilizadas

- **React 18 + TypeScript** para componentes e tipagem
- **Vite** como bundler e ferramenta de desenvolvimento rápida
- **Tailwind CSS** combinado com CSS autoral para o design system
- **shadcn/ui + Radix UI** para componentes acessíveis
- **TanStack Query** para futura integração com dados dinâmicos

## Como executar localmente

```bash
git clone <url-do-repositorio>
cd Paulo-Araujo-Arte
npm install
npm run dev
```

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento Vite
- `npm run build` — gera o bundle de produção em `dist/`
- `npm run preview` — serve o build localmente para conferência
- `npm run lint` — executa a análise estática via ESLint
- `npm run test` — roda a suíte de testes com Vitest
