"use client"

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';
import Link from 'next/link'

const navigation = [
  { name: 'Apresentação', href: '#apresentacao' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificados', href: '#certificados' },
  { name: 'Experiências Profissionais', href: '#experiencias' },
  { name: 'Projetos Pessoais', href: '#projetos' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Lucas Trindade - Desenvolvedor Fullstack</title>
        <meta property="og:url" content="https://lucastrindade.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lucas Trindade - Desenvolvedor Full Stack" />
      </Head>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-effect shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <motion.div 
            className="flex lg:flex-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="-m-1.5 p-1.5 max-w-[180px]">
              <Image src="/images/logo/LucasTrindade.png" alt='Logo' width={200} height={100} />
            </span>
          </motion.div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-primary-purple transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-semibold leading-6 text-white hover:text-primary-purple transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-purple to-primary-pink group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className='flex gap-4'>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href={"https://www.linkedin.com/in/trindadebra/"} target='_blank'>
                  <FaLinkedin className="text-white hover:text-primary-blue transition-colors" size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Link href={"https://github.com/TrindadeBRA/"} target='_blank'>
                  <FaGithub className="text-white hover:text-primary-purple transition-colors" size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href={"https://api.whatsapp.com/send?phone=5511952498126"} target='_blank'>
                  <FaWhatsapp className="text-white hover:text-green-400 transition-colors" size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </nav>
        
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto glass-effect px-6 py-6 sm:max-w-sm border-l border-white/10">
            <div className="flex items-center justify-between">
              <span className="-m-1.5 p-1.5">
                <Image src="/images/logo/LucasTrindade.png" alt='Logo' width={200} height={100} />
              </span>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white hover:text-primary-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <div className='flex gap-4'>
                    <Link href={"https://www.linkedin.com/in/trindadebra/"} target='_blank'>
                      <FaLinkedin className="text-white hover:text-primary-blue transition-colors" size={24} />
                    </Link>
                    <Link href={"https://github.com/TrindadeBRA/"} target='_blank'>
                      <FaGithub className="text-white hover:text-primary-purple transition-colors" size={24} />
                    </Link>
                    <Link href={"https://api.whatsapp.com/send?phone=5511952498126"} target='_blank'>
                      <FaWhatsapp className="text-white hover:text-green-400 transition-colors" size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </motion.header>
    </>
  )
}
