import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import Dropdown from '../components/Dropdown'
import Chip from '../components/Chip'
import Tag from '../components/Tag'

function Problem() {
    const values = ['Array', 'Object', 'String', 'Number', 'Boolean', 'Function', 'Undefined', 'Null'];
    const [value, setValue] = useState();
    return (
        <div className="space-y-5 container p-10 mx-auto max-w-screen-xl">
            <h1 className="text-5xl">Problem List</h1>
            <hr/>
            <div className="flex space-x-4 overflow-x-scroll">
                {values.map((value) => {
                    return (
                        <div className="flex flex-col">
                            <button className="text-base rounded-xl bg-black px-4 py-1 hover:scale-125 transition-all ease-out">{value}</button>
                        </div>
                    )
                })}
            </div>
            <div className="flex space-x-3">
                <form onSubmit={() => {}} className="p-[.2rem] flex border-none rounded-xl focus:outline-none bg-black items-center max-w-screen-2xl">
                    <input 
                        type="text" 
                        className="bg-black outline-none text-white p-2 rounded-xl w-full" placeholder="Search" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <SearchOutlined/>
                </form>
                <button type="submit" className="rounded-full  bg-black px-6 py-1">Search</button>
            </div>
            {/* DROPDOWN SECITONS FOR DIFFICULTY , STATUS, TAGS */}
            <div className="flex space-x-2">
                <Dropdown fieldName={"Difficulty"} fieldValues={['Easy', 'Medium', 'Hard']}/>
                <Dropdown fieldName={"Status"} fieldValues={['ToDo', 'Solved', 'Attempted']}/>
                {/* <Dropdown fieldName={"Tags"} fieldValues={['ToDo', 'Solved', 'Attempted']}/> */}
            </div>
               <Tag />

        </div>
    )
}

export default Problem
