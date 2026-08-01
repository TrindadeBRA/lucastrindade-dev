export function formatCertificateDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Ex.: "há 12 dias", "há 1 ano", "hoje" */
export function formatDaysAgo(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return null;
  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  if (diffDays < 30) return `há ${diffDays} dias`;

  const months = Math.floor(diffDays / 30);
  if (months < 12) return months === 1 ? "há 1 mês" : `há ${months} meses`;

  const years = Math.floor(diffDays / 365);
  return years === 1 ? "há 1 ano" : `há ${years} anos`;
}
