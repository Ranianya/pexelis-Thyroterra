import React from 'react'

const Infos = () => {
  return (
    <section id='story' className='pb-20 font-pixel '>
      {/* On utilise items-start pour l'alignement de base, 
         et gap-6 pour l'espace entre les cartes 
      */}
      <div  className='flex flex-wrap justify-center items-start gap-20 px-10'> 

        {/* 1. Daily: The Life Spot */}
        <div className='bg-[#a8b6a4] mt-24 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg'> 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Daily: The Life Spot</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              Every morning you take your medication, you nourish a Life Spot. A simple ritual that plants a seed of energy in your world.
            </p>
          </div>
        </div>

        {/* 2. Monthly: The Floating Land (La carte du milieu) */}
        {/* mt-12 au lieu de mt-24 pour la faire monter */}
        <div className='bg-[#a8b6a4] mt-12 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg border-2 border-white/10'> 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Monthly: The Floating Land</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              After 30 days of consistency, your spots merge to form a unique Floating Island. Every month is a new territory to explore.
            </p>
          </div>
        </div>

        {/* 3. Yearly: The Big Land */}
        <div className='bg-[#a8b6a4] mt-24 p-8 rounded-[30px] max-w-[350px] h-[400px] shadow-lg'> 
          <div className='flex flex-col gap-7 text-center items-center'>
            <div className='bg-[#99f6b4] p-2 rounded-full'>
              <img src="/icon.png" alt="Icon" className='h-8 w-8' />
            </div>
            <h3 className='text-lg text-[#0a2310] leading-tight'>Yearly: The Big Land</h3>
            <p className='text-[12px] text-[#2d3a2c] leading-relaxed'>
              Twelve islands unite into a Big Land. This continent represents one full year of effort, turning a chronic condition into a thriving ecosystem.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Infos