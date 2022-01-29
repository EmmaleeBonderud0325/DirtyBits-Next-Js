import React from 'react';

function Team() {
  return (
      <>
      
      <div style={{marginTop:'10rem'}} className="py-12 lg:mt-50 w-screen h-[1024px] bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <section class=" mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600">
                We have the best equipment in the market
            </h2>
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                Check our awesome team memwhite            
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="  rounded-lg shadow-lg flex flex-col justify-center items-center">
                <div class="mb-8">
                    <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo"/>
                </div>
                <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">Dany Bailey</p>
                    <p class="text-base text-gray-400 font-normal">Software Engineer</p>
                </div>
            </div>
            <div class="  rounded-lg shadow-lg p-12 flex flex-col justify-center items-center">
                <div class="mb-8">
                    <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo"/>
                </div>
                <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">Lucy Carter</p>
                    <p class="text-base text-gray-400 font-normal">Graphic Designer</p>
                </div>
            </div>
            <div class="  rounded-lg shadow-lg p-12 flex flex-col justify-center items-center">
                <div class="mb-8">
                    <img class="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80" alt="photo"/>
                </div>
                <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">Jade Bradley</p>
                    <p class="text-base text-gray-400 font-normal">Dev Ops</p>
                </div>
            </div>
            
        </div>
    </section>
</div>
</div>
      </>
  )
}

export default Team;
