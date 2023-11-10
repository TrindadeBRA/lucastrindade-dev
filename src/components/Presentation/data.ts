const birthDate: Date = new Date(1996, 6, 28); // Mês é 0-indexado, então 6 representa julho
const currentDate: Date = new Date();
export const myAge: number = currentDate.getFullYear() - birthDate.getFullYear();