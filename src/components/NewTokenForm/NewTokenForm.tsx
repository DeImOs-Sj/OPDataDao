// @ts-nocheck comment
import { useState, useRef, useContext } from "react";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
import {
  Progress,
  Box,
  Radio,
  RadioGroup,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  Spinner,
  chakra,
  VisuallyHidden,
  Text,
  Stack,
  useToast,
  ring,
} from "@chakra-ui/react";
import userSideabi from "../../utils/contractabis/usersideabi.json";
import creategovernanceabi from "../../utils/contractabis/creategovernanceabi.json";

const Form2 = ({ getName, getSummary }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleName = (e) => {
    getName(e);
  };

  const handleSummary = (e) => {
    getSummary(e);
  };

  return (
    <>
     <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
          <div className="bg-black flex flex-col w-[35rem] border border-gray-900 rounded-lg px-8 py-10">
            <h2 className="text-center text-2xl font-semibold">Register Your Dao</h2>
                    <form className="flex flex-col space-y-8 mt-10">
                      <label className="font-bold text-lg text-white">Your Dao Name</label>
                      <input type="text" placeholder="Your Dao Name" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" onChange={(e) => handleName(e.target.value)} />
                      <label className="font-bold text-lg text-white">Some Information About Dao</label>
                      <input type="Token Name" placeholder="Give short Sumarry About Dao" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"           onChange={(e) => handleSummary(e.target.value)}/>
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
};

const Form3 = ({ getJoiningThreshold, getProposal, getVisibility }) => {
  const toast = useToast();
  const inputRef = useRef(null);

  const handleTokens = (e) => {
    getJoiningThreshold(e);
  };

  const handleProposal = (e) => {
    getProposal(e);
  };

  const handleVisibility = (e) => {
    getVisibility(e);
  };

  return (
    <>
 <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Governance Details
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="yoe" fontWeight={"normal"}>
            Joining Threshold
          </FormLabel>
          <NumberInput
            step={1}
            min={1}
            onChange={(value) => handleTokens(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>
            Enter minimum number of tokens required to join DAO
          </FormHelperText>
        </FormControl>
        <FormControl mr="5%" mt="2%">
          <FormLabel htmlFor="yoe" fontWeight={"normal"}>
            Proposal Threshold
          </FormLabel>
          <NumberInput
            step={1}
            min={1}
            onChange={(value) => handleProposal(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>
            Enter minimum number of tokens required to create a proposal
          </FormHelperText>
        </FormControl>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            Is DAO private ?
          </FormLabel>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="red"
                value="1"
                onChange={() => handleVisibility(false)}
              >
                No
              </Radio>
              <Radio
                colorScheme="green"
                value="2"
                onChange={() => handleVisibility(true)}
              >
                Yes
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </SimpleGrid>

    </>
  );
};

const Form1 = ({ getTokenSymbol, getTokenName, getTokenSupply }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSupply = (e) => {
    getTokenSupply(e);
  };

  const handleSymbol = (e) => {
    getTokenSymbol(e);
  };

  const handleTokenName = (e) => {
    getTokenName(e);
  };

  return (
    <>
              <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
          <div className="bg-black flex flex-col w-[35rem] border border-gray-900 rounded-lg px-8 py-10">
            <h2 className="text-center text-2xl font-semibold">Token Details</h2>
                    <form className="flex flex-col space-y-8 mt-10">
                      <label className="font-bold text-lg text-white">Token Symbol</label>
                      <input type="text" placeholder="Token Symbol" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white" onChange={(e) => handleSymbol(e.target.value)} />
                      <label className="font-bold text-lg text-white">Token Name</label>
                      <input type="Token Name" placeholder="Token Name" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" onChange={(e) => handleTokenName(e.target.value)}/>
                      <label className="font-bold text-lg text-white">Token Supply</label>
                      <input type="text" placeholder="Token Supply" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"  onChange={(e) => handleSupply(e.target.value)} />
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
};

export default function NewTokenForm() {
  const [progress, setProgress] = useState(33.33);
  const [step, setStep] = useState(1);
  const [mintDone, setMintDone] = useState(false);
  const [threshholdToken, setthreshholdToken] = useState();
  const [proposalToken, setProposalToken] = useState();
  const [desc, setdesc] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenName, settokenName] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [daovisibility, setdaoVisibility] = useState(false);
  const toast = useToast();

  const mintToken = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const createTokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CREATE_GOVERNANACE_ADDRESS,
        creategovernanceabi,
        signer
      );
      const userSideContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        userSideabi,
        signer
      );
      const accounts = await provider.listAccounts();
      console.log(accounts[0]);

      const userId = await userSideContract.userWallettoUserId(accounts[0]);
      console.log(userId);

      console.log(tokenName);
      console.log(symbol);
      console.log(tokenSupply);

      const tx = await createTokenContract.deployToken(
        tokenName,
        symbol,
        tokenSupply,
        userId
      );
      await tx.wait();
      console.log(tx);
      const totalTokens = await createTokenContract.getTotalTokesnDeployed(
        userId
      );
      const mintedTokenAddress =
        await createTokenContract.userIdtoDeployedTokens(
          userId,
          totalTokens - 1
        );

      settokenAddress(mintedTokenAddress);
      toast({
        title: "Tokens Minted",
        description: `Token Address: ${mintedTokenAddress}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      setMintDone(true);
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

      const createTokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CREATE_GOVERNANACE_ADDRESS,
        creategovernanceabi,
        signer
      );
      const userSideContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        userSideabi,
        signer
      );

      const userId = await userSideContract.userWallettoUserId(accounts[0]);

      const tx = await createTokenContract.deployToken(
        tokenName,
        symbol,
        tokenSupply,
        userId
      );

      await tx.wait();

      const totalTokens = await createTokenContract.getTotalTokesnDeployed(
        userId
      );
      const mintedTokenAddress =
        await createTokenContract.userIdtoDeployedTokens(
          userId,
          totalTokens - 1
        );

      settokenAddress(mintedTokenAddress);
      toast({
        title: "Tokens Minted",
        description: `Token Address: ${mintedTokenAddress}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      setMintDone(true);
    }
  };

  const createDAO = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        userSideabi,
        signer
      );

      const accounts = await provider.listAccounts();

      const tx = await contract.createDao(
        name,
        desc,
        threshholdToken,
        proposalToken,
        tokenAddress,
        daovisibility,
        accounts[0]
      );

      console.log(tx);
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
        userSideabi,
        signer
      );

      const tx = await contract.createDao(
        name,
        desc,
        threshholdToken,
        proposalToken,
        tokenAddress,
        daovisibility,
        accounts[0]
      );

      console.log(tx);
    }
  };

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      width="100%"
      className="h-screen"
      p={6}
      m="10px auto"
      as="form"
      mt={16}
      bgColor="black"
    >
      <Progress
        hasStripe
        value={progress}
        mb="5%"
        mx="5%"
        isAnimated
      ></Progress>
      {step === 1 ? (
        <Form1
          bg="black"
          getTokenSymbol={(q) => setSymbol(q)}
          getTokenName={(q) => settokenName(q)}
          getTokenSupply={(q) => setTokenSupply(q)}
        />
      ) : step === 2 ? (
        <Form2 getName={(q) => setName(q)} getSummary={(q) => setdesc(q)} />
      ) : (
        <Form3
          getJoiningThreshold={(q) => setthreshholdToken(q)}
          getProposal={(q) => setProposalToken(q)}
          getVisibility={(q) => setdaoVisibility(q)}
        />
      )}
      <ButtonGroup mt="5%" w="100%" >
        <Flex w="100%" justifyContent="center">
          <Flex>
            {step === 1 ? (
              <Button
                onClick={() => {
                  mintToken();
                }}
                className="bg-white text-2xl"

                variant="solid"
                w="8rem"
            p={6}
                mr="5%"
              >
                <p className="text-xl">Mint</p>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                  // colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
            )}
            <Button
              w="7rem"
              isDisabled={step === 3 || (step === 1 && !mintDone)}
              onClick={() => {
                setStep(step + 1);
                if (step === 3) {
                  setProgress(100);
                } else {
                  setProgress(progress + 33.33);
                }
              }}
              // colorScheme="teal"
              className=""
              variant="outline"
            >
             
              <p className="text-xl">Next</p> 
            </Button>
          </Flex>
          {step === 3 ? (
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                createDAO();
              }}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}