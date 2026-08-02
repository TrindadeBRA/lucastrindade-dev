# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado
- Sistema de validação de variáveis de ambiente (`src/lib/env.ts`)
- Configuração do Prettier para formatação automática de código
- Novos scripts no package.json: `format`, `format:check`, `lint:fix`, `type-check`
- Documento de análise de melhorias (`MELHORIAS_IDENTIFICADAS.md`)
- Arquivo CHANGELOG.md para rastreamento de mudanças
- Tratamento de erros melhorado em todas as APIs
- Validação de dados antes de acessar propriedades do Notion

### Alterado
- IDs dos bancos de dados Notion movidos para variáveis de ambiente
- Arquivo `.env.example` atualizado com documentação detalhada
- Configuração ESLint expandida com regras adicionais
- Todas as APIs agora usam o sistema centralizado de env
- Melhor tratamento de erros com mensagens estruturadas
- Console.errors substituídos por console.warn onde apropriado

### Melhorado
- Robustez das APIs com validação de dados do Notion
- Mensagens de erro mais descritivas
- Segurança com validação de variáveis críticas
- Developer Experience com ferramentas de formatação
- Documentação das variáveis de ambiente

### Corrigido
- Possíveis crashes por acesso a propriedades undefined do Notion
- Falta de tratamento de erro em handlers de API
- Exposição de IDs sensíveis no código fonte

## [0.1.0] - 2026-08-02

### Inicial
- Release inicial do portfolio LucasTrindade.dev
- Integração com Notion API como CMS
- Páginas: Home, Resume, Interview
- Componentes: Hero, Skills, Experiences, Certificates, PersonalProjects
- Animações com GSAP
- ISR (Incremental Static Regeneration) configurado
- Sistema de fallback com dados mock
- Suporte a Notion Media Sync para imagens

---

## Tipos de Mudanças

- `Adicionado` - para novas funcionalidades
- `Alterado` - para mudanças em funcionalidades existentes
- `Descontinuado` - para funcionalidades que serão removidas
- `Removido` - para funcionalidades removidas
- `Corrigido` - para correção de bugs
- `Segurança` - para vulnerabilidades corrigidas
- `Melhorado` - para melhorias de performance ou qualidade
