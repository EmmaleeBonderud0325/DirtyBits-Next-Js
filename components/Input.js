import React from 'react'

function Input({value, placeholder, color, focusColor}) {
    return (
            <input             
            class={`w-full text-base px-4 py-2 focus:text-base border ${color} rounded-lg focus:outline-none focus:${focusColor}`} 
            
            placeholder={placeholder} 
            type={value} 
            />
    )
}

export default Input
