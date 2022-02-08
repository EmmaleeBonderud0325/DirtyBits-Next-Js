import { FC, ReactElement } from "react";

interface Props {
  label: string;
  list: JSX.Element[];
  handleClick: (item: JSX.Element) => any;
}

export const DropdownV3: FC<Props> = (props): ReactElement => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="dropdown relative">
            <button
              className="dropdown-toggle login-btn bg-white text-black"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="flexContainer">
                <span>{props.label}</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </div>
            </button>
            <ul
              className="dropdown-menu min-w-full absolute bg-gray-800 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none max-h-60 overflow-scroll scrollbar-hide"
              aria-labelledby="dropdownMenuButton2"
            >
              {props.list.map((item: JSX.Element) => {
                if (item.key !== null) {
                  return (
                    <li onClick={() => props.handleClick(item)}>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-indigo-600"
                        href="#"
                      >
                        {item.props.children}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
