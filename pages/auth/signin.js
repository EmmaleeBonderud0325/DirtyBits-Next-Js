import React from 'react'
import Link from 'next/link'
import Input from '../../components/Input'

function signin() {
  const isError = false;
  const inputColor = isError ? 'border-red-300': 'border-white-400'
  const inputFocusColor = isError ? 'border-red-300': 'border-custom-yellow'
  const labelColor = isError ? 'text-red-700': 'text-gray-700'



  return (
    <div>
       <div class="bg-no-repeat bg-cover bg-center relative" style={{background:"url('')"}}><div class="absolute bg-gradient-to-b from-black to-black opacity-75 inset-0 z-0"></div>
  <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
        <div class="self-start hidden lg:flex flex-col  text-white">
          <img src="" class="mb-3"/>
          <h1 class="mb-3 font-bold text-5xl">Hello Welcome to {" "}
            <span className="text-custom-yellow">
              <Link href="/">
                <a>DirtyBits</a>
              </Link>
            </span> 
          </h1>
          <p class="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups</p>
        </div>
      </div>
      <div class="flex justify-center self-center  z-10">
        <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p class="text-gray-500">Please sign in to your account.</p>
            </div>
            <div class="space-y-5">
                        <div class="space-y-2">
                            {/* Change text-red-700 to text-gray-700 if there's no error */}
                              <label class={`text-sm font-medium ${labelColor} tracking-wide`}>Email</label>
                              <Input placeholder={"@gmail.com"} value={"email"} color={inputColor} focusColor={inputFocusColor}/>
                              <div style={{height:'1rem'}}>
                              {
                                isError ? <span className="text-xs text-red-400 ml-2 mb:2">Invalid Email</span> : <span></span>
                              }
                              </div>
                              
                        </div>
                          <div class="space-y-2">
                            <label class={`mb-5 text-sm font-medium ${labelColor} tracking-wide`}>
                              Password
                            </label>
                            <Input placeholder={"Enter your password"} value={"password"} color={inputColor} focusColor={inputFocusColor}/>
                            <div style={{height:'1rem'}}>
                              {
                                isError ? <span className="text-xs text-red-400 ml-2">Password can't be empty</span> : <span></span>
                              }
                              </div>
                          </div>
                        <div class="flex items-center justify-between my-2">
                          <div class="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                            <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                              Remember me
                            </label>
                          </div>
                          <div class="text-sm">
                            <a href="#" class="text-indigo-400 hover:text-black">
                              Forgot your password?
                            </a>
                          </div>
                      </div>
                    <div>
              <button type="submit" class="w-full flex justify-center bg-custom-yellow2 hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
              </button>
              <Link href="/auth/signup">
                <a type="submit" class="w-full flex justify-center bg-indigo-400  hover:bg-black text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 mt-3">
                Sign Up
                </a>
              </Link>
            </div>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-green hover:text-green-500 ">AJI</a>
              </span>
            </div>
        </div>
      </div>
  </div>
</div>
    </div>
  )
}

export default signin

signin.getLayout = function PageLayout(page) {
  return (
    <>
      {page}  
    </>
  )
}