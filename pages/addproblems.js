import React from 'react'

function addproblems() {
    return (
        <div className="lg:container m-auto h-screen">
            <div className="lg:pl-36 p-5 space-y-10">
                <h1 className="text-center text-4xl lg:text-[4rem]">Add Problems</h1>
                <form className="space-y-5">
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Problem Title</label>
                            <input
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Title"                               
                            />
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Problem Description</label>
                            <textarea
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Description"                               
                            />
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Problem Statement</label>
                            <input
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Description"                                
                            />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addproblems
