export const getBadgeConfig = (category: string) => {
    switch (category) {
        case 'Pós-Graduação':
            return {
                text: 'Pós-Graduação',
                bgColor: 'bg-indigo-600',
                textColor: 'text-white',
                importance: 'highest'
            };
        case 'Tecnólogo':
            return {
                text: 'Tecnólogo',
                bgColor: 'bg-indigo-800',
                textColor: 'text-white',
                importance: 'high'
            };
        case 'Extensão':
            return {
                text: 'Extensão',
                bgColor: 'bg-indigo-500',
                textColor: 'text-white',
                importance: 'medium-high'
            };
        case 'Horas':
            return {
                text: 'Horas',
                bgColor: 'bg-indigo-400',
                textColor: 'text-white',
                importance: 'medium'
            };
        case 'Eventos':
            return {
                text: 'Eventos',
                bgColor: 'bg-indigo-500',
                textColor: 'text-white',
                importance: 'low'
            };
        default:
            return {
                text: category || 'Certificado',
                bgColor: 'bg-indigo-400',
                textColor: 'text-white',
                importance: 'low'
            };
    }
};

