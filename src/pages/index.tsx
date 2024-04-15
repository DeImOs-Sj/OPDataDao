"use client";
import Head from "next/head";
import { Inter } from "next/font/google";
import LandingImage from '../image/download.jpg'

import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-black mt-[4rem]">
    {/* <!-- Hero --> */}
    <section
        className="flex flex-wrap items-center -mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20 gap-y-[10rem] mt-[3rem]" >
        {/* <!-- Column-1 --> */}
        <div className="px-3 w-full lg:w-2/5">
            <div
                className="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                <h2 className="mb-4 text-3xl font-bold text-left lg:text-5xl text-[#1F2937]">
                    Next Gen

                    <span className="text-5xl text-blue-500 leading-relaxeds"
                        >ZKP Based  DataDAO
                    </span>
                </h2>

                <p
                    className="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
                    Helping you Control and Govern the Network
                </p>
            </div>

            <div className="text-center lg:text-left">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Getting Started with DAO</button>

            <button type="button" className="text-blue-700 hover:text-white bg-gradient-to-r  border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-700 dark:hover:text-white dark:hover:bg-blue-600"
             onClick={() => router.push("/register")}>Register Now?</button>
            </div>
        </div>

        {/* <!-- Column-2 --> */}
        <div className="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
            {/* <!-- Illustrations Container --> */}
            <div className="flex justify-center items-center">
                          <img src='https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0df2c4d-c5e9-42f9-bfa5-69c411a07794_1400x933.jpeg' />
            </div>
        </div>
    </section>

    {/* <!-- Parallax Background --> */}
    <section
        className="flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center flex justify-center items-center"
    style={{
  backgroundImage: "url(https://cryptologos.cc/logos/curve-dao-token-crv-logo.png)"
}}

        >
        <h1 className="text-white text-5xl font-semibold mt-20 mb-10">
            Decentralized Autonomous Organization
        </h1>

        <span className="text-center font-bold my-20 text-white/90">
            <a
                href="https://egoistdeveloper.github.io/twcss-to-sass-playground/"
                target="_blank"
                className="text-white/90 hover:text-white">
                Join 
            </a>

            <hr className="my-4" />

            <a
                href="https://unsplash.com/photos/8Pm_A-OHJGg"
                target="_blank"
                          className="text-white/90 hover:text-white">
                          Govern
            </a>

            <hr className="my-4" />

            <p>
                <a
                    href="https://github.com/EgoistDeveloper/my-tailwind-components/blob/main/src/templates/parallax-landing-page.html"
                    target="_blank"
                    className="text-white/90 hover:text-white">
                    Source Code
                </a>
                |
                <a
                    href="https://egoistdeveloper.github.io/my-tailwind-components/./src/templates/parallax-landing-page.html"
                    target="_blank"
                    className="text-white/90 hover:text-white">
                    Full Preview
                </a>
            </p>
        </span>
    </section>



<footer className="bg-gray-800 pt-10 sm:mt-10 pt-10 w-full">
   

<footer className="bg-white dark:bg-gray-900">
<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-center"> {/* Added text-center class */}
    <div className="md:flex md:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6"> {/* Adjusted grid layout */}
            <div className="mx-auto sm:mx-0"> {/* Added mx-auto and sm:mx-0 for center alignment */}
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Tailwind CSS</a>
                    </li>
                </ul>
            </div>
            <div className="mx-auto sm:mx-0"> {/* Added mx-auto and sm:mx-0 for center alignment */}
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                        <a href="#" className="hover:underline ">Github</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Discord</a>
                    </li>
                </ul>
            </div>
            <div className="mx-auto sm:mx-0"> {/* Added mx-auto and sm:mx-0 for center alignment */}
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-center"> {/* Updated sm:justify-between to sm:justify-center */}
        <span className="text-sm text-gray-500 dark:text-gray-400">© 2023 ZKPDAO All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {/* Your social media icons */}
            </a>
            {/* Repeat for other social media icons */}
        </div>
    </div>
</div>

</footer>

    </footer>  
    </div>
  );
}
//
// usersideabi="0x2963ff0196a901ec3F56d7531e7C4Ce8F226462B"
//creategovernance="0xba840136E489cB5eCf9D9988421F3a9F45e0c341"