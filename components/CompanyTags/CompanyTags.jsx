import Image from 'next/image'



function CompanyTags({title, Icon, onClick}) {
  return (
    <div onClick={onClick} className="bg-slate-500 py-3 opacity-70 flex flex-col items-center rounded-md justify-center">
      {/* <div className="flex justify-center items-center h-full w-full rounded-md  bg-white"> */}
      <div>
        {Icon}
      </div>
      <a
        href="#"
        className="text-white text-center text-sm  font-lato"
        >
          {title}
      </a>
  </div>
  )
}

export default CompanyTags;
