import React from 'react';
import Image from 'next/image';

function HeroSection(profileData: any) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15")' }} id="hero">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10" aria-hidden="true">
          <div
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl flex flex-col md:flex-row items-center justify-center">
          <Image className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover md:mr-12 mb-6 md:mb-0" src={profileData[0].user_avatar} alt="" width={208} height={300} priority/>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base text-center md:text-left font-semibold leading-8 text-indigo-400">{profileData[0].user_role}</h2>
            <p className="mt-2 text-3xl text-center md:text-left font-bold tracking-tight text-white sm:text-4xl">{profileData[0].user_name}</p>
            <p className="mt-6 text-base text-center md:text-left leading-6 text-gray-300">{profileData[0].user_bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
