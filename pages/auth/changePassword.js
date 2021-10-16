import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

function changePassword() {
    return (
        <div class="min-h-screen flex justify-center items-center">
        <Head>
           <title>Forgot Your Password ?</title>
        </Head>
        <div class="absolute w-60 h-60 opacity-50 rounded-xl bg-custom-yellow2 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
        </div>
        <div class="absolute opacity-50 w-48 h-48 rounded-xl bg-custom-yellow2 -bottom-6 -right-10 transform rotate-12 hidden md:block">
        </div>
        <div class="py-5 px-5 lg:py-12 lg:px-12 bg-white rounded-2xl shadow-xl z-20">
            <div>
                <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer text-custom-yellow2">Forgot Password ?</h1>
                <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Change your password a confirmation mail will be send to your registerd email</p>
            </div>
            <div class="space-y-4">
                <input type="text" placeholder="Enter your registerd email" class="block text-base lg:text-lg py-3 px-4 rounded-lg w-full border outline-none text-black" />
        </div>
                <div class="flex flex-col justify-center items-center mt-6">
                    <button class="py-[.7rem] lg:py-3 lg:w-64 w-52 text-xl md:block text-white bg-custom-yellow2 rounded-full">Send</button>
                    <Link href='/auth/signin'>
                    <a class="mt-4 text-sm text-black"><span class="underline cursor-pointer"> Sign In</span>
                    </a>
                    </Link>
                </div>
            </div>
            <div class="w-40 h-40 opacity-50 absolute bg-custom-yellow2 rounded-full top-0 right-12 hidden md:block"></div>
            <div
                class="w-20 h-40 absolute bg-custom-yellow2 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block opacity-50">
            </div>
        </div>
    )
}

export default changePassword
