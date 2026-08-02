/**
 * Validação e tipagem das variáveis de ambiente
 * Garante que todas as variáveis necessárias estejam presentes
 */

interface EnvVars {
  NOTION_TOKEN: string;
  NSM_TOKEN?: string;
  NSM_URL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  USE_MOCK_DATA?: string;
  
  // IDs dos bancos de dados Notion
  NOTION_DB_PROFILE: string;
  NOTION_DB_SKILLS: string;
  NOTION_DB_CERTIFICATES: string;
  NOTION_DB_EXPERIENCES: string;
  NOTION_DB_PROJECTS: string;
}

class EnvValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvValidationError';
  }
}

/**
 * Valida se uma variável de ambiente obrigatória está presente
 */
function requireEnv(key: keyof EnvVars, description: string): string {
  const value = process.env[key];
  
  if (!value || value.trim() === '') {
    throw new EnvValidationError(
      `Variável de ambiente obrigatória "${key}" não está definida. ` +
      `Descrição: ${description}`
    );
  }
  
  return value;
}

/**
 * Obtém variável de ambiente opcional
 */
function getEnv(key: keyof EnvVars, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

/**
 * Variáveis de ambiente validadas e tipadas
 */
export const env = {
  // Tokens de API
  notionToken: requireEnv('NOTION_TOKEN', 'Token de integração do Notion'),
  nsmToken: getEnv('NSM_TOKEN'),
  nsmUrl: getEnv('NSM_URL'),
  
  // URLs públicas
  siteUrl: getEnv('NEXT_PUBLIC_SITE_URL', 'https://lucastrindade.dev'),
  
  // Flags
  useMockData: getEnv('USE_MOCK_DATA', 'false').toLowerCase() === 'true',
  
  // IDs dos bancos de dados Notion
  notionDb: {
    profile: requireEnv('NOTION_DB_PROFILE', 'ID do database de perfil no Notion'),
    skills: requireEnv('NOTION_DB_SKILLS', 'ID do database de skills no Notion'),
    certificates: requireEnv('NOTION_DB_CERTIFICATES', 'ID do database de certificados no Notion'),
    experiences: requireEnv('NOTION_DB_EXPERIENCES', 'ID do database de experiências no Notion'),
    projects: requireEnv('NOTION_DB_PROJECTS', 'ID do database de projetos no Notion'),
  },
  
  // Helpers
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

/**
 * Valida todas as variáveis de ambiente obrigatórias
 * Deve ser chamado no startup da aplicação
 */
export function validateEnv(): void {
  try {
    // Força a leitura de todas as variáveis obrigatórias
    const _ = env.notionToken;
    const __ = env.notionDb.profile;
    const ___ = env.notionDb.skills;
    const ____ = env.notionDb.certificates;
    const _____ = env.notionDb.experiences;
    const ______ = env.notionDb.projects;
    
    console.info('✅ Variáveis de ambiente validadas com sucesso');
  } catch (error) {
    if (error instanceof EnvValidationError) {
      console.error('❌ Erro de configuração:', error.message);
      console.error('\n💡 Dica: Verifique se o arquivo .env está configurado corretamente.');
      console.error('   Copie .env.example e preencha os valores necessários.\n');
      
      // Em produção, falha imediatamente
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
    throw error;
  }
}

// Validação automática em produção
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}
