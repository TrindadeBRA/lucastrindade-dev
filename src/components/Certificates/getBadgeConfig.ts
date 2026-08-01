const base =
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide shadow-lg shadow-black/40 backdrop-blur-md";

export const getBadgeConfig = (category: string) => {
  switch (category) {
    case "Pós-Graduação":
      return {
        text: "Pós-Graduação",
        bgColor: `${base} border-white/20 bg-chalk text-ink`,
        importance: "highest",
      };
    case "Tecnólogo":
      return {
        text: "Tecnólogo",
        bgColor: `${base} border-white/20 bg-chalk text-ink`,
        importance: "high",
      };
    case "Extensão":
      return {
        text: "Extensão",
        bgColor: `${base} border-white/25 bg-ink/85 text-chalk`,
        importance: "medium-high",
      };
    case "Horas":
      return {
        text: "Horas",
        bgColor: `${base} border-white/25 bg-ink/85 text-chalk`,
        importance: "medium",
      };
    case "Eventos":
      return {
        text: "Eventos",
        bgColor: `${base} border-white/25 bg-ink/85 text-chalk`,
        importance: "low",
      };
    default:
      return {
        text: category || "Certificado",
        bgColor: `${base} border-white/25 bg-ink/85 text-chalk`,
        importance: "low",
      };
  }
};
