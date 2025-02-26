import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function InfoBanner() {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-gray-950 to-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 border-y-2 border-gray-800">
      <p className="text-sm/6 text-white">
        Prefere uma versão para impressão do meu currículo?{' '}
        <Link href="/resume" target="_blank" className="ml-4 whitespace-nowrap font-semibold text-indigo-600 hover:text-indigo-700">
          Baixar versão PDF&nbsp;<span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Fechar</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}
