import React from 'react';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Apresentação', href: '#apresentacao' },
      { name: 'Skills', href: '#skills' },
      { name: 'Certificados', href: '#certificados' },
      { name: 'Experiências Profissionais', href: '#experiencias' },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-1 text-center sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-gray-200">{item.name}</a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-300">&copy; {currentYear} Lucas Trindade, Todos direitos reservados.</p>
      </div>
    </footer>
  );
};


export default Footer;
