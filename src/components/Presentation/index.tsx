import React from 'react';
// import { format } from 'date-fns';
// import { myAge } from './data';
const Presentation = (profileData: any) => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20" id="apresentacao">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="text-base font-semibold leading-7 text-indigo-600">Um pouco sobre mim</p>
          <h1 className="mt-2 mb-10 text-3xl font-bold tracking-tight text-white sm:text-4xl">Apresentação</h1>
          <p>
            {
              profileData[0]?.user_presentation[0].plain_text.split('\n').map((paragraph:string, index:number) => (
                <span key={index}>
                  {paragraph}
                  <br />
                </span>
              ))
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
