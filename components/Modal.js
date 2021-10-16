import React from 'react'
import success from '../public/success.svg'
import Image from 'next/image'
import Confetti from 'react-confetti'
import Link from 'next/link'

function Modal() {
    return (
        <div>
          <div className="lg:block hidden">
           <Confetti width={2500} height={800} gravity={.2}/>
          </div>
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
   	{/* <div class="absolute bg-black opacity-80 inset-0 z-0"></div> */}
    <div class="w-[20rem] md:w-full lg:w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <div class="">
        <div class="text-center p-5 flex-auto justify-center">
                        <Image src={success} height={50} width={50} />
                        <h2 class="text-xl font-bold py-4 ">Registered Successfully</h2>
                        <p class="text-sm text-gray-500 px-8">A verfication e-mail has been sent to your registered email address</p>    
           </div>
           <div class="p-3  mt-2 text-center space-x-4 md:block">
             <Link href="/auth/signin">
              <a class="mb-2 md:mb-0 bg-custom-yellow px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-custom-yellow2 transition ease-out">
                  Sign In
              </a>
            </Link>
        </div>
      </div>
    </div>
  </div>
        </div>
    )
}

export default Modal

