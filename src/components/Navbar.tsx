import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const account = useAccount();



  return (
    
      <header className="container bg-black ">
        <nav className="flex justify-between md:justify-around py- bg-white backdrop-blur-md shadow-md w-full px-10 fixed top-0 left-0 right-0 z-10 h-[5rem] md:px-3">
          <div className="flex items-center">
            <a className="cursor-pointer">
              <h3 className="text-2xl font-medium text-blue-500">
                <img
                  className="h-18 w-20"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmSR1FmtD8JP4F4oI61eEGaz-CcVOkvHXKlQ&usqp=CAU"
                  alt="Store Logo"
                />
              </h3>
            </a>
          </div>

          <div className="items-center md:space-x-8 justify-center justify-items-start md:justify-items-center md:flex md:pt-2 w-full left-0 top-16 px-5 md:px-10 py-3 md:py-0 border-t md:border-t-0">
            <a
              onClick={() => router.push("/register")}
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Register
            </a>
            <a
              href="/create-dao"
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Create DAO
            </a>
            <a
              href="/explore"
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Explore
            </a>
            <a
              href="/profile"
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Your Profile
            </a>
          </div>

          <button
            className="w-10 h-10 md:hidden justify-self-end rounded-full hover:bg-gray-100"
            onClick={toggleMenu}
          >
            <svg
              className="mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </button>
          
          <div className="hidden md:block m-[1rem]">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </nav>

        {isOpen && (
          <div className="pb-4 md:hidden">
            <div className="mt-4">
              <a
                href="/register"
                className="block text-base font-semibold text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Register
              </a>
            </div>
            <div className="mt-4">
              <a
                href="/create-dao"
                className="block text-base font-semibold text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Create DAO
              </a>
            </div>
            <div className="mt-4">
              <a
                href="/explore"
                className="block text-base font-semibold text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Explore
              </a>
            </div>
            <div className="mt-4">
              <a
                href="/profile"
                className="block text-base font-semibold text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
              >
                Your Profile
              </a>
            </div>
          </div>
        )}
      </header>
  
  );
}
