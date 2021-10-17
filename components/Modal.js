import React from 'react'
import success from '../public/success.png'
import Image from 'next/image'
import Link from 'next/link'

function Modal({title, content, source}) {
    return (
        <div>
<div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
   	{/* <div className="absolute bg-black opacity-80 inset-0 z-0"></div> */}
    <div className="w-[20rem] md:w-full lg:w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <div className="">
        <div className="text-center p-5 flex-auto justify-center">
                        <Image className="" src={source} height={50} width={50} />
                        <h2 className="text-xl font-bold py-4 text-black ">{title}</h2>
                        <p className="text-sm text-black px-8">{content}</p>    
           </div>
           <div className="p-3  mt-2 text-center space-x-4 md:block">
             <Link href="/auth/signin">
              <a className="mb-2 md:mb-0 bg-custom-yellow2 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-custom-yellow transition ease-out">
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
