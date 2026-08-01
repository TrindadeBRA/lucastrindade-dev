export const getBadgeConfig = (category: string) => {
  switch (category) {
    case "Pós-Graduação":
      return {
        text: "Pós-Graduação",
        bgColor: "bg-brand-dark text-content-inverse",
        importance: "highest",
      };
    case "Tecnólogo":
      return {
        text: "Tecnólogo",
        bgColor: "bg-accent-yellow text-brand-dark",
        importance: "high",
      };
    case "Extensão":
      return {
        text: "Extensão",
        bgColor: "bg-surface-base text-content-primary",
        importance: "medium-high",
      };
    case "Horas":
      return {
        text: "Horas",
        bgColor: "bg-white/90 text-content-secondary",
        importance: "medium",
      };
    case "Eventos":
      return {
        text: "Eventos",
        bgColor: "bg-accent-gold text-content-inverse",
        importance: "low",
      };
    default:
      return {
        text: category || "Certificado",
        bgColor: "bg-surface-base text-content-primary",
        importance: "low",
      };
  }
};
