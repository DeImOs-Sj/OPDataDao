import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import usersideabi from "../../utils/contractabis/usersideabi.json";
import governancetokenabi from "../../utils/contractabis/governancetokenabi.json";
import DaosCard from "../../components/DaosCard/DaosCard";
import { Spinner, Box } from "@chakra-ui/react";
import { ParticleProvider } from "@particle-network/provider";

const Explore = () => {
  const [daos, setDaos] = useState([]);
  const [totaluserDAO, setTotaluserDAO] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = async () => {
    try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userSideInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS!,
        usersideabi,
        signer
    );
      const tempTotalDaos = Number(await userSideInstance.totalDaos());
      let uniqueDaos = [];
      for (let i = 1; i <= tempTotalDaos; i++) {
        const tempDaoInfo = await userSideInstance.daoIdtoDao(i);
        const tempTokenAddress = tempDaoInfo.governanceTokenAddress;
        const governanceTokenInstance = new ethers.Contract(
          tempTokenAddress,
          governancetokenabi,
          signer
        );
        const tempTokenName = await governanceTokenInstance.name();
        const tempTokenSymbol = await governanceTokenInstance.symbol();
        const tempCreatorId = Number(tempDaoInfo.creator);
        const tempCreatorInfo = await userSideInstance.userIdtoUser(tempCreatorId);

        // Check if DAO already exists in uniqueDaos array by comparing daoId
        const existingIndex = uniqueDaos.findIndex(dao => dao.daoId === tempDaoInfo.daoId);
        if (existingIndex === -1) {
          uniqueDaos.push({
            daoId: tempDaoInfo.daoId,
            daoName: tempDaoInfo.daoName,
            joiningThreshold: tempDaoInfo.joiningThreshold,
            creatorName: tempCreatorInfo.userName,
            tokenName: tempTokenName,
            tokenSymbol: tempTokenSymbol,
          });
        }
      }
      setDaos(uniqueDaos as never[]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size="xl"
          mt="20%"
          mx="auto"
          display="block"
        />
      ) : (
        <div className="mt-[4.2rem] h-screen bg-black grid grid-cols-4 grid-rows-2 gap-y-15">
          {daos.map((dao: any, index: number) => (
            <div key={index} className="flex justify-center">
              <DaosCard
                daoName={dao.daoName}
                joiningThreshold={dao.joiningThreshold}
                creatorName={dao.creatorName}
                tokenName={dao.tokenName}
                tokenSymbol={dao.tokenSymbol}
                totalDaoMember={totaluserDAO}
                daoId={dao.daoId}
              />
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Explore;
