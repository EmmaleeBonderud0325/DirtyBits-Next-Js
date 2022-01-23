import Image from 'next/image'



function CompanyTags({title, icon}) {
  return (
    <div className="space-y-3 h-20 w-40 pb-2 opacity-75">
    <div className="relative flex justify-center items-center h-full w-full rounded-md  bg-white">
      {/* <AiOutlineGoogle className="absolute text-9xl text-white" /> */}
      <Image src={icon} height={40} width={40} />
    </div>
    <a
      href="#"
      className="block text-white text-center "
      >
        {title}
    </a>
  </div>
  )
}

export default CompanyTags;
