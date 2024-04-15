// @ts-nocheck comment
import React, { useState, useRef, useEffect } from "react";

import { Identity } from "@semaphore-protocol/identity";
import { useToast } from "@chakra-ui/react";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
import usersideabi from "../../utils/contractabis/usersideabi.json";

const RegisterForm = () => {
  const toast = useToast();
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const changeHandler = () => {
    setProfileImage(inputRef.current?.files[0]);
  };
  const uploadIPFS = async () => {
    const form = new FormData();
    form.append("file", profileImage ? profileImage : "");

    const options = {
      method: "POST",
      body: form,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_NFTPort_API_KEY,
      },
    };

    await fetch("https://api.nftport.xyz/v0/files", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        console.log(response.ipfs_url);
        setIpfsUrl(response.ipfs_url);
        if (profileImage) {
          toast({
            title: "Image Uploaded to the IPFS.",
            description: "Congratulations!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Image not Uploaded to the IPFS.",
            description: "Please attach the Image.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    const identity = new Identity();
    localStorage.setItem("semaphore-id", identity.toString());
    localStorage.setItem("commitment-id", identity._commitment);
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      const accounts = await provider.listAccounts();

      const tx = await contract.createUser(
        name,
        email,
        bio,
        ipfsUrl,
        accounts[0]
      );
      await tx.wait();

      toast({
        title: "User Registered.",
        description: "Congratulations! ",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const particleProvider = new ParticleProvider(particle.auth);
      const accounts = await particleProvider.request({
        method: "eth_accounts",
      });
      const ethersProvider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
      const signer = ethersProvider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );

      const tx = await contract.createUser(
        name,
        email,
        bio,
        ipfsUrl,
        accounts[0]
      );

      await tx.wait();

      toast({
        title: "User Registered.",
        description: "Congratulations!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getUser = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userSideInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      const tempUser = await userSideInstance.userIdtoUser(2);
      console.log(tempUser);
    } else {
      console.log("No Metamask Found");
    }
  };

  return (
 <div>
      <div className="relative min-h-screen grid bg-black ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
          <div className="sm:w-1/2 xl:w-3/5 bg-blue-500 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover relative" style={{backgroundImage: `url('https://cdn2.vectorstock.com/i/1000x1000/42/11/crypto-currency-ethereum-black-and-white-symbol-vector-17634211.jpg')`}}>
            <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
            <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
              <div className="font-bold leading-tight mb-6 mx-auto w-full content-center items-center "></div>
            </div>
          </div>

          <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
            <div className="max-w-xl w-full space-y-12">
              <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
                  <div className="bg-black flex flex-col w-[35rem] border border-gray-900 rounded-lg px-8 py-10">
                    <form className="flex flex-col space-y-8 mt-10">
                      <p className="text-center text-2xl font-semibold">User Registration Form</p>
                      <label className="font-bold text-lg text-white">Username</label>
                      <input type="text" placeholder="Username" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"               onChange={(e) => setName(e.target.value)}
 />
                      <label className="font-bold text-lg text-white">Email</label>
                      <input type="email" placeholder="Email" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"               onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="font-bold text-lg text-white">Profile Bio</label>
                      <input type="text" placeholder="BIO" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"                             onChange={(e) => setBio(e.target.value)}

 />
                      <label className="font-bold text-lg text-white">Upload Profile Image</label>
                      <div class="flex w-full items-center justify-center bg-grey-lighter">
    <label className="w-64 flex flex-col items-center px-4 py-6 bg-blue-800 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
<input type="file" id="file-upload" className="sr-only"     name="file-upload"
                
                        ref={inputRef}
                        onChange={changeHandler}
                      accept=".png, .jpg, .jpeg" />    </label>
                </div>
                              <button type="button" className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold" onClick={uploadIPFS}>
  Upload To IPFS
</button>
                      <button type="button" className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold" onClick={handleSubmit}>
  Create Account
</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
