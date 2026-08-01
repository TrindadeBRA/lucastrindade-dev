export const getBadgeConfig = (category: string) => {
  switch (category) {
    case "Pós-Graduação":
      return {
        text: "Pós-Graduação",
        bgColor: "bg-chalk text-ink",
        importance: "highest",
      };
    case "Tecnólogo":
      return {
        text: "Tecnólogo",
        bgColor: "bg-chalk text-ink",
        importance: "high",
      };
    case "Extensão":
      return {
        text: "Extensão",
        bgColor: "bg-white/10 text-chalk",
        importance: "medium-high",
      };
    case "Horas":
      return {
        text: "Horas",
        bgColor: "bg-white/10 text-chalk-muted",
        importance: "medium",
      };
    case "Eventos":
      return {
        text: "Eventos",
        bgColor: "bg-white/10 text-chalk-muted",
        importance: "low",
      };
    default:
      return {
        text: category || "Certificado",
        bgColor: "bg-white/10 text-chalk",
        importance: "low",
      };
  }
};
