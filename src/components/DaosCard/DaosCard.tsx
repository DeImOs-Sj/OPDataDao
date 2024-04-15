// @ts-nocheck comment
import React, { useState, useEffect } from "react";
import * as bandadaAPI from "../../pages/api/bandadaAPI";
import {
  useDisclosure,
  Text,
  HStack,
  Tag,
  Image,
  SpaceProps,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Link
} from "@chakra-ui/react";

import usersideabi from "../../utils/contractabis/usersideabi.json";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { join } from "path";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

interface Props {
  marginTop?: number;
  tags: any[];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
        width={{ base: "40px", sm: "40px", md: "40px" }}
        height={{ base: "40px", sm: "40px", md: "40px" }}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const DaosCard = ({
  daoName,
  tokenName,
  joiningThreshold,
  tokenSymbol,
  creatorName,
  totalDaoMember,
  daoId,
}) => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState("");
  const [added, setAdded] = useState(false);

  const joinDao = async () => {
    onOpen();
    const memberid = localStorage.getItem("commitment-id");
    const res = await bandadaAPI.addMember(
      process.env.NEXT_PUBLIC_GROUP_ID,
      memberid
    );
    setAdded(true);
    if (window.ethereum._state.accounts.length !== 0) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
          usersideabi,
          signer
        );

        const accounts = await provider.listAccounts();
        const tx = await contract.joinDao(daoId, accounts[0]);

        console.log(tx);
        await tx.wait();
        setTxHash(tx.hash);

        toast({
          title: "Congratulations!",
          description: "You have successfully joined the DAO",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
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

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        usersideabi,
        signer
      );
      const tx = await contract.joinDao(daoId, accounts[0]);
      await tx.wait();

      toast({
        title: "Congratulations!",
        description: "You have successfully joined the DAO",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
      <div className="border border-[#333232] mt-[3rem] mb-[1rem] ">
        <div className="w-full h-[30rem] p-[1rem]">
          <div className="relative">
            <a href="#">
              <img
                src="https://cointelegraph.com/magazine/wp-content/uploads/2022/09/magazine-Work-for-a-DAO-1024x576.jpg"
                className="w-96 h-auto"
                alt="Placeholder"
              />
            </a>
          </div>
         <div className="flex flex-col mt-2 gap-2 text-gray-400 text-xs ">
  <a href="#">
    <p className="text-gray-100  font-semibold text-center text-2xl p-[2px]">{daoName}</p>
          </a>
          <div className="text-sm">
  <a className="hover:text-gray-100 ">
    Minimum Tokens Required: {(joiningThreshold / 1e18).toFixed(2)} {tokenSymbol}
  </a>
  <p>{tokenName}</p>
  <p>{tokenSymbol}</p>
  <p>{totalDaoMember}</p>
            <p>{creatorName}</p>
            </div>
  <button
    type="button"
    className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold mt-[1rem]"
    onClick={joinDao}
  >
    Join Dao
  </button>
  <button
    type="button"
    className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold mt-[1rem]"
    onClick={() => router.push(`/dao/${daoId}`)}
  >
    View Dao
  </button>
</div>

        </div>
     <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader>Join DAO</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="black">
            {added ? (
              <Text>
                {" "}
                ✔️ Added to Bandada group <br />
                🚀 Group id :{" "}
                <span>{process.env.NEXT_PUBLIC_GROUP_ID} </span>
              </Text>
            ) : (
              <Text>Adding to Bandada grp</Text>
            )}

            {txHash === "" ? (
              <Text> Adding to DAO </Text>
            ) : (
              <Text>
                ✔️Added to DAO{" "}
                <Link
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  isExternal
                >
                  View Transaction
                </Link>
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </div>
    </div>
  );
};

export default DaosCard;
