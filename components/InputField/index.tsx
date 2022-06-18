import { Input } from '@mantine/core'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function StyledInputField({searchQuery = "", onSearchQueryChange} : {searchQuery: string, onSearchQueryChange: (query: string) => void}) {
  return (
    <Input
    className="w-full md:w-1/2"
    icon={<AiOutlineSearch className="text-custom-indigo"/>}
    placeholder="Search Questions"
    styles={{ rightSection: { pointerEvents: 'none' } }}
    radius="xl"
    value={searchQuery}
    onChange={(e : any) => onSearchQueryChange(e.target.value)}
  />
  )
}

export default React.memo(StyledInputField);