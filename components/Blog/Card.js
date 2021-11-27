import React from "react";
import Link from "next/link";

function Card() {
  return (
    <div className="mt-6">
      <div className="max-w-screen-md px-10 py-6 mx-auto bg-black rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-white">Feb 14, 2019</span>
          <a
            href="#"
            className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500"
          >
            PHP
          </a>
        </div>
        <div className="mt-2">
          <a href="#" className="text-2xl font-bold text-white hover:underline">
            PHP: Array to Map
          </a>
          <p className="mt-2 text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero!
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link href="/blogs/myDetail">
            <a className="text-blue-500 hover:underline">Read more</a>
          </Link>
          <div>
            <a href="#" className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                alt="avatar"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 className="font-bold text-white hover:underline">Lisa Way</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
