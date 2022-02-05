const Feature = ({ name, description, icon, colorString, borderColor }) => {
  return (
    <div className="group h-full overflow-hidden">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <div
          key={name}
          className="lg:w-80  flex flex-col justify-center items-center md:items-start p-3 space-y-3"
        >
          <div className="flex flex-col justify-center items-center md:items-start space-y-3 w-full">
            <div
              className={` flex justify-center items-center h-24 w-24 bg-gradient-to-b ${colorString} rounded-full text-[50px]`}
            >
              <span className="group-hover:animate-bounce text-white">
                {icon}
              </span>
            </div>
            <h3 className="text-lg text-white tracking-wider font-light">
              {name}
            </h3>
          </div>

          <div
            className={`h-3 w-32 border-b-4 ${borderColor} rounded-sm`}
          ></div>

          <p className="font-medium text-center md:text-left text-gray-400 font-lato">
            {description}
          </p>
        </div>
      </dl>
    </div>
  );
};

export default Feature;
