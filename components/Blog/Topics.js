import React from 'react'

function Topics() {
    return (
        <div class="p-4 fixed top-50 right-[22rem] hidden lg:block w-[15rem]">
        <h1 class="mb-4 text-xl font-bold text-white">Categories</h1>
        <div class="flex flex-col max-w-sm px-4 py-6 mx-auto bg-gray-800 rounded-lg shadow-md">
            <ul>
                <li><a href="#" class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">-
                        AWS</a></li>
                <li class="mt-2"><a href="#"
                        class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">-
                        Laravel</a></li>
                <li class="mt-2"><a href="#"
                        class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">- Vue</a>
                </li>
                <li class="mt-2"><a href="#"
                        class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">-
                        Design</a></li>
                <li class="flex items-center mt-2"><a href="#"
                        class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">-
                        Django</a></li>
                <li class="flex items-center mt-2"><a href="#"
                        class="mx-1 font-bold text-white hover:text-gray-600 hover:underline">- PHP</a>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default Topics
