import React from 'react'
import { Link } from 'react-router-dom' // Import indispensable
import Navbar2 from '../components/Navbar2';

const Months = () => {
  const spots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Spot${i + 1}`,
    locked: i !== 0,
  }));

  return (
    <>
    <Navbar2/>
    <div className='flex flex-col min-h-screen w-full overflow-hidden bg-[#5A7554] font-pixel relative'>
      
      {/* DECORATION: NUAGES */}
      <img src="/cloud.png" alt="cloud" className='absolute top-32 left-10 w-32 z-0 opacity-80' />
      <img src="/cloud.png" alt="cloud" className='absolute top-48 right-10 w-40 z-0 opacity-80' />

      {/* 1. SECTION CENTRALE */}
      <div className='flex-grow flex items-center justify-center w-full relative pt-20 pb-12 z-10'>
        
        {/* LE CADRE PRINCIPAL */}
        <div className='relative w-[90%] max-w-[1000px] h-[650px] flex flex-col items-center bg-[#D9EAD3] border-[6px] border-[#A9C4A1] rounded-sm shadow-2xl'>
          
          <div className='absolute inset-2 border-2 border-white/20 pointer-events-none'></div>

          <div className='relative z-10 flex flex-col items-center w-full h-full pt-10 px-6'>
            
            {/* Titre */}
            <div className='flex items-center gap-4 mb-8'>
               <img src="/triangle-pixel.png" alt="" className='h-8 w-auto' />
               <h2 className='text-4xl text-black uppercase tracking-[0.2em] font-bold'>The Land 1</h2>
            </div>

            {/* GRILLE DES SPOTS */}
            <div className='flex flex-wrap justify-center gap-x-16 gap-y-6 max-w-[850px]'>
              {spots.map((spot, index) => {
                const isClickable = !spot.locked;
                
                // Le contenu du spot (visuel)
                const spotContent = (
                  <div className={`flex flex-col items-center transition-transform ${isClickable ? 'hover:scale-110 cursor-pointer' : 'opacity-70'}`}>
                    <div className='relative w-32 h-20 rounded-[40%] overflow-hidden border-2 border-[#888] shadow-lg bg-[#ADD8E6]'>
                      <img src={`/spot${spot.id}.png`} alt="" className={`w-full h-full object-cover ${spot.locked ? 'grayscale' : ''}`} />
                      {spot.locked && (
                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]'>
                          <img src="/lock.png" alt="locked" className='h-8' />
                        </div>
                      )}
                    </div>
                    <span className='text-[14px] mt-2 text-black font-bold tracking-tight'>Spot {spot.id}</span>
                  </div>
                );

                return (
                  <div 
                    key={spot.id} 
                    className={`${(index >= 3 && index <= 5) || (index >= 9) ? 'translate-y-2' : ''}`}
                  >
                    {isClickable ? (
                      <Link to="/days"> {/* Redirection vers la page Days */}
                        {spotContent}
                      </Link>
                    ) : (
                      spotContent
                    )}
                  </div>
                );
              })}
            </div>

            {/* FOOTER DU CADRE */}
            <div className='mt-auto pb-8 flex flex-col items-center'>
                <div className='flex items-center gap-3 mb-4'>
                   <img src="/triangle-pixel.png" alt="" className='h-4 rotate-90' />
                   <p className='text-lg text-black italic font-medium'>
                     "Twelve months. Twelve lands. One Balanced you"
                   </p>
                </div>
                <button className='flex flex-col items-center group'>
                    <img src="/triangle-pixel.png" alt="" className='h-5 mb-1 rotate-180 animate-bounce' />
                    <span className='text-2xl font-bold border-b-4 border-black hover:text-white hover:border-white transition-all'>
                      Let's Go
                    </span>
                </button>
            </div>
          </div>
        </div>

        {/* GUIDE ET BULLE */}
        <div className='absolute left-6 bottom-10 z-30 flex flex-col items-start'>
          <div className='relative w-72 mb-4 drop-shadow-lg'>
            <img src="/shapetalk.png" alt="" className='w-full h-auto' />
            <div className='absolute inset-0 flex items-center justify-center p-6 pt-2'>
              <p className='text-[12px] leading-tight text-black text-center font-bold mb-20'>
                "To conquer the year, we must first map <span className='text-red-600'>the month</span>. 
                Select a spot in your land to begin this 30-day expedition"
              </p>
            </div>
          </div>
          <img src="/character.png" alt="guide" className='h-32 w-auto ml-4' />
        </div>
      </div>

      {/* 2. LE SOL */}
      <div className='flex justify-between items-end w-full fixed bottom-0 left-0 z-20 pointer-events-none'>
        <div className='relative'>
          <img src="/leftmonths.png" alt="left" className='h-44 md:h-56 w-auto' />
        </div>
        <div className='relative flex items-end'>
          <img src="/rightmonths.png" alt="right" className='h-44 md:h-56 w-auto' />
        </div>
      </div>

    </div>
    </>
  )
}

export default Months;