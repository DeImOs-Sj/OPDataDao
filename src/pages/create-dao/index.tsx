// @ts-nocheck comment
import React, { useState } from "react";
import ExistingTokenForm from "../../components/ExistingTokenForm/ExistingTokenForm";
import NewTokenForm from "../../components/NewTokenForm/NewTokenForm";
import {Image} from "@chakra-ui/react";

const CreateDao = () => {
  const scheme = "teal";
  const [existingToken, setIsExistingToken] = useState(false);
  const [newToken, setNewToken] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const scheme2 = "orange";
  // const step1 = useColorModeValue("600", "300");
  // const step2 = useColorModeValue("500", "400");
  // const step3 = useColorModeValue("300", "500");
  // const sizes = ["lg", "md", "sm", "xs"];

  return (
    <>
      {showBtn ? (
<div className="w-full   my-[5rem] z-50 sticky bg-black">
<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-black">
      <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row bg-black">
        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            
            <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-6">
             Import Existing Tokens 
            </h2>
            <button className="bg-white text-black rounded-xl text-base md:text-lg  p-5" onClick={() => {
                setIsExistingToken(!existingToken);
                setShowBtn(false);
              }}>Click Here To Import Existing Tokens 
                  </button>
<p className="text-white pt-[2rem]">
  To enhance consistency and maintain design coherence across our application, we import predefined tokens for colors, typography, spacing, and other design elements. These tokens serve as a centralized source of truth, allowing us to easily update the design system and ensure a cohesive user experience.
</p>
          </div>
          <div className="flex items-center space-x-3">
          {/* <Link href="/comingsoon">
            <a
      className="flex object-cover sm:mr-64 mr-32 object-top items-center text-white  border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black"
    >
       &nbsp;&nbsp;<Image width="25" alt="google auth logo" width={20} height={20} src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20200429221626%21Google_%22G%22_Logo.svg" />&nbsp;&nbsp; Get Started
    </a>
    </Link> */}
          </div>
        </div>
            <Image alt="logo"  width="450" height="450" src="https://img.freepik.com/premium-photo/golden-bitcoin-black-background-bitcoin-cryptocurrency_559531-8884.jpg" />
      </div>
    </div>



    <div className="px-4 py-16 mx-auto sm:max-w-xl  md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-black">
      <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
        
      <Image alt="logo" width="450" height="450" src="https://images.ctfassets.net/c5bd0wqjc7v0/2VlFOt9CXEfCiEu0yn5AmI/cd775355a50493fb8fc99f215035ceb1/The_Ethereum_Merge_is_Coming__Here___s_what_you_need_to_know.png" />


        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          
          <div className="max-w-xl mb-6">
            
            <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-bold tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-6">
             Create New Tokens
            </h2>
            <button className=" p-5 bg-white rounded-xl text-black text-base md:text-lg" onClick={() => {
                setNewToken(!newToken);
                setShowBtn(false);
              }}>Click Here To Add Custom Token

                  </button>
                  <p className="text-white  pt-[2rem]">
  To enhance consistency and maintain design coherence across our application, we import predefined tokens for colors, typography, spacing, and other design elements. These tokens serve as a centralized source of truth, allowing us to easily update the design system and ensure a cohesive user experience.
</p>
          </div>
          <div className="flex items-center space-x-3">
          {/* <Link href="/comingsoon">
            <a
      className="flex object-cover sm:mr-64 mr-32 object-top items-center text-white  border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black"
    >
       &nbsp;&nbsp;<Image alt="logo" width="25" src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20200429221626%21Google_%22G%22_Logo.svg" />&nbsp;&nbsp; Get Started
    </a>
    </Link> */}
          </div>
        </div>
      </div>
    </div>  
          </div>
      ) : null}

      {existingToken ? <ExistingTokenForm /> : null}
      {newToken ? <NewTokenForm /> : null}
    </>
  );
};

export default CreateDao;
