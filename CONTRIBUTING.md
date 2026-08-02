# 🎯 Guia de Contribuição

Obrigado por considerar contribuir para o projeto **LucasTrindade.dev**!

## 📋 Antes de Começar

1. Certifique-se de ter Node.js 20+ e Yarn 4 instalados
2. Leia o `README.md` para entender a estrutura do projeto
3. Verifique o arquivo `MELHORIAS_IDENTIFICADAS.md` para tarefas pendentes

## 🔧 Setup do Ambiente de Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/TrindadeBRA/lucastrindade-dev.git
cd lucastrindade-dev

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Notion

# Inicie o servidor de desenvolvimento
yarn dev
```

## 📝 Padrões de Código

### Formatação

Este projeto usa **Prettier** e **ESLint**:

```bash
# Antes de commitar, execute:
yarn format        # Formata o código
yarn lint:fix      # Corrige problemas do ESLint
yarn type-check    # Valida tipos TypeScript
```

### Estrutura de Commits

Use commits descritivos seguindo o padrão:

```
tipo(escopo): descrição curta

Descrição mais detalhada se necessário
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração sem mudança de comportamento
- `perf`: Melhoria de performance
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat(api): adiciona validação de variáveis de ambiente
fix(certificates): corrige ordenação por data
docs(readme): atualiza instruções de setup
```

## 🏗️ Estrutura do Projeto

```
src/
  components/     # Componentes React reutilizáveis
  pages/          # Páginas Next.js e API routes
  lib/            # Utilitários e helpers
  data/           # Dados mock
  styles/         # Estilos globais
  plugins/        # Plugins customizados
  utils/          # Funções utilitárias
  hooks/          # React hooks customizados
public/           # Arquivos estáticos
```

## ✅ Checklist Antes de Enviar PR

- [ ] Código formatado com `yarn format`
- [ ] Sem erros no `yarn lint`
- [ ] Tipos validados com `yarn type-check`
- [ ] Build passa com `yarn build`
- [ ] Testado localmente com `yarn dev`
- [ ] Commits seguem o padrão descrito
- [ ] Documentação atualizada se necessário

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o erro
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** se aplicável
5. **Ambiente** (navegador, versão do Node, etc)

## 💡 Sugerindo Melhorias

Verifique o arquivo `MELHORIAS_IDENTIFICADAS.md` antes de sugerir. Se sua ideia não estiver lá:

1. Abra uma issue descrevendo a melhoria
2. Explique o **benefício** e o **caso de uso**
3. Sugira uma implementação se possível

## 🔒 Segurança

Nunca commite:
- Tokens ou credenciais (arquivo `.env`)
- IDs de bancos de dados reais (use variáveis de ambiente)
- Informações pessoais sensíveis

## 📞 Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato via [LinkedIn](https://www.linkedin.com/in/trindadebra/)

---

**Obrigado por contribuir! 🚀**
