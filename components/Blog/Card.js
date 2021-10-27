import React from 'react'

function Card() {
    return (
        <div class="mt-6">
        <div class="max-w-screen-md px-10 py-6 mx-auto bg-black rounded-lg shadow-md">
            <div class="flex items-center justify-between"><span class="font-light text-white">Feb 14,
                    2019</span><a href="#"
                    class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">PHP</a>
            </div>
            <div class="mt-2"><a href="#" class="text-2xl font-bold text-white hover:underline">PHP:
                    Array to Map</a>
                <p class="mt-2 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim
                    reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
            </div>
            <div class="flex items-center justify-between mt-4"><a href="#"
                    class="text-blue-500 hover:underline">Read more</a>
                <div>
                  <a href="#" class="flex items-center">
                    <img
                            src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                            alt="avatar" class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"/>
                        <h1 class="font-bold text-white hover:underline">Lisa Way</h1>
                    </a>
                  </div>
            </div>
        </div>
    </div>
    )
}

export default Card
