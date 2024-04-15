// @ts-nocheck comment
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import usersideabi from "../../utils/contractabis/usersideabi.json";
import governancetokenabi from "../../utils/contractabis/governancetokenabi.json";
import { Center } from "@chakra-ui/react";
import {
  Box,
  Avatar,
  Heading,
  Icon,
  Text,
  Button,
  Stack,
  Badge,
  Image,
  SimpleGrid,
  Grid,
  GridItem,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ParticleProvider } from "@particle-network/provider";

const Profile = () => {
  const account = useAccount();
  const [userDaos, setUserDaos] = useState([]);
  const [userInfo, setuserInfo] = useState([]);

  const onLoad = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userSideInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      console.log(userSideInstance);
      const tempUserId = await userSideInstance.userWallettoUserId(
        account.address
      );
      console.log(tempUserId);
      const tempUserInfo = await userSideInstance.userIdtoUser(tempUserId);
      setuserInfo(tempUserInfo);
      const tempUserDaos = await userSideInstance.getAllUserDaos(tempUserId);
      console.log(tempUserDaos);
      let tempDaoInfo,
        tempAdminId,
        tempAdminInfo,
        tempDaoCreatorInfo,
        tempDaoTokenInfo,
        govtTokenName,
        govtTokenSymbol;
      for (let i = 0; i < tempUserDaos.length; i++) {
        tempDaoInfo = await userSideInstance.daoIdtoDao(tempUserDaos[i]);
        console.log(tempDaoInfo);
        tempAdminId = tempDaoInfo.creator;
        tempAdminInfo = await userSideInstance.userIdtoUser(tempAdminId);
        console.log(tempAdminInfo);
        // //token Info
        const governanceTokenInstance = new ethers.Contract(
          tempDaoInfo.governanceTokenAddress,
          governancetokenabi,
          signer
        );
        console.log(governanceTokenInstance);
        govtTokenName = await governanceTokenInstance.name();
        govtTokenSymbol = await governanceTokenInstance.symbol();
        console.log(govtTokenName);
        console.log(govtTokenSymbol);
        setUserDaos((daos) => [
          ...daos,
          {
            daoInfo: tempDaoInfo,
            creatorInfo: tempAdminInfo,
            tokenName: govtTokenName,
            tokenSymbol: govtTokenSymbol,
          },
        ]);
      }
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
      const userSideInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      console.log(userSideInstance);
      const tempUserId = await userSideInstance.userWallettoUserId(
        account.address
      );
      console.log(tempUserId);
      const tempUserInfo = await userSideInstance.userIdtoUser(tempUserId);
      setuserInfo(tempUserInfo);
      const tempUserDaos = await userSideInstance.getAllUserDaos(tempUserId);
      console.log(tempUserDaos);
      let tempDaoInfo,
        tempAdminId,
        tempAdminInfo,
        tempDaoCreatorInfo,
        tempDaoTokenInfo,
        govtTokenName,
        govtTokenSymbol;
      for (let i = 0; i < tempUserDaos.length; i++) {
        tempDaoInfo = await userSideInstance.daoIdtoDao(tempUserDaos[i]);
        console.log(tempDaoInfo);
        tempAdminId = tempDaoInfo.creator;
        tempAdminInfo = await userSideInstance.userIdtoUser(tempAdminId);
        console.log(tempAdminInfo);
        // //token Info
        const governanceTokenInstance = new ethers.Contract(
          tempDaoInfo.governanceTokenAddress,
          governancetokenabi,
          signer
        );
        console.log(governanceTokenInstance);
        govtTokenName = await governanceTokenInstance.name();
        govtTokenSymbol = await governanceTokenInstance.symbol();
        console.log(govtTokenName);
        console.log(govtTokenSymbol);
        setUserDaos((daos) => [
          ...daos,
          {
            daoInfo: tempDaoInfo,
            creatorInfo: tempAdminInfo,
            tokenName: govtTokenName,
            tokenSymbol: govtTokenSymbol,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  console.log(userDaos);

  return (
    <div className="h-screen">
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <section class="pt-[6rem] bg-black ">
        <div class="w-full lg:w-4/12 px-4 mx-auto ">
          <div class="relative flex flex-col min-w-0 break-words bg-[#161b22] border border-[#3f3f46]  w-full mb-6 shadow-xl rounded-lg mt-16 ">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full px-4 flex justify-center mb-[6rem]">
                  <div class="relative">
                    <img
                      alt="..."
                      src={userInfo[4]}
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3 class="text-xl  text-white font-semibold leading-normal mb-2  " name={userInfo[1]} src={userInfo[4]} >
                  {userInfo[1]}
                </h3>
                <div class="mb-2 text-white">
                  <i class="fas fa-university mr-2 text-lg text-white"></i>
                  {userInfo[2]}
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-white">
                      {userInfo[3]}
                    </p>
                    <a
                      href="javascript:void(0);"
                      class="font-normal text-pink-500"
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center text-white ">
          <div className="mt-[4rem]  text-center w-[31rem]  h-screen ">
            {userDaos?.length !== 0 && (
              <div className="align-center text-3xl mb-[15px] font-bold">My DAO's</div>
            )}
            <div className="flex flex-col gap-10">
              {userDaos?.length === 0 ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  h="200px"
                  w="500px"
                  bg="black"
                  // color="white"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={8}
                  textAlign="center"
                  boxShadow="md"
                >
                  <Text
                    fontSize="lg"
                    mb={4}
                    fontWeight="bold"
                    color="white"
                  >
                    You do not any membership DAO's yet
                  </Text>
                  <Link href="/explore">
                    <Button colorScheme="blue">Join a DAO</Button>
                  </Link>
                </Flex>
              ) : (
                userDaos.map((dao) => (
                  <div
                    key={dao.daoInfo[0].toString()}
                    className=" justify-center border border-[#686ebf] p-4 relative] rounded-xl"
                  >
                    <div className="w-[10rem] ">
                      <div className="text-2xl flex flex-col text-center w-[28rem] gap-y-4">
                        <span className="text-2xl font-semibold">
                          {dao.daoInfo.daoName}
                        </span>
                        <span className="text-lg">
                          {dao.daoInfo.daoDescription}
                        </span>
                        <div
                          className="text-teal-500 absolute top-4 right-4 text-xl"
                          href={`https://circuitbreaker-two.vercel.app/dao/${dao.daoInfo[0].toString()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          _hover={{ textDecoration: "underline" }}
                        >
                          <Icon as={FaExternalLinkAlt} ml={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
