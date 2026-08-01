"use client"

import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Apresentação', href: '#apresentacao' },
      { name: 'Skills', href: '#skills' },
      { name: 'Certificados', href: '#certificados' },
      { name: 'Experiências Profissionais', href: '#experiencias' },
      { name: 'Projetos Pessoais', href: '#projetos' },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/10 to-transparent"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <motion.nav 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="-mb-6 columns-1 text-center sm:flex sm:justify-center sm:space-x-8" 
          aria-label="Footer"
        >
          {navigation.main.map((item, index) => (
            <motion.div 
              key={item.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pb-6"
            >
              <a 
                href={item.href} 
                className="text-sm leading-6 text-gray-400 hover:text-primary-purple transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-purple to-primary-pink group-hover:w-full transition-all duration-300"></span>
              </a>
            </motion.div>
          ))}
        </motion.nav>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm leading-5 text-gray-400">
            &copy; {currentYear} Lucas Trindade. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Desenvolvido com <span className="text-red-500">❤</span> usando Next.js, TypeScript e Three.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
