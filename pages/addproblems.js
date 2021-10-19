import { ArrowForward } from '@mui/icons-material'
import React from 'react'
import Dropdown from '../components/Dropdown'
import Chip from '../components/Chip'

function addproblems() {
    return (
        <div className="lg:container m-auto">
            <div className="lg:pl-36 p-5 space-y-14">
                <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
                    Add Problems
                </h1>
                <hr/>
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
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Input Format</label>
                            <input
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Description"                                
                            />
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Constraints</label>
                            <input
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Description"                                
                            />
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Output Format</label>
                            <input
                                className='w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow'
                                placeholder="Enter Description"                                
                            />
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Level</label>
                            <Dropdown/>
                    </div>
                    <div className="space-y-3">
                        <label 
                        className="text-lg lg:text-2xl ml-1"                        
                        >
                            Tags</label>
                           <Chip/>
                    </div>
                    <div className="flex justify-center items-center ">
                        <button className="font-bold bg-custom-yellow2 rounded-full px-5 py-2 outline-none border-none hover:bg-custom-yellow transition ease-out">Add Test Case
                        <span className="ml-1"><ArrowForward/></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addproblems
