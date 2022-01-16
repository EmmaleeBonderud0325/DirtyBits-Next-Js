import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { classNames } from "./Helper/Classnames";

function Dropdown(props) {
  const dispatch = useDispatch();
  const { fieldValues } = props;

  const returnObj = fieldValues.map((item, i) => {
    if (props.hasAction) {
      return (
        <Menu.Item>
          {({ active }) => {
            return (
              <a
                onClick={() => dispatch(props.actionFunction(item))}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm cursor-pointer"
                )}
              >
                {item}
              </a>
            );
          }}
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item>
          {({ active }) => {
            return (
              <a
                onClick={() => props.actionFunction(item)}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm cursor-pointer"
                )}
              >
                {item}
              </a>
            );
          }}
        </Menu.Item>
      );
    }
  });

  return (
    <Menu as="div" className="lg:w-1/5 relative inline-block text-left">
      <div>
        <Menu.Button
          className={`inline-flex justify-center w-full rounded-md border border-gray-800 shadow-sm px-4 py-2 ${props.bg} text-sm font-medium ${props.textColor}  focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {props.currentValue}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 ml-auto"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">{returnObj}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
