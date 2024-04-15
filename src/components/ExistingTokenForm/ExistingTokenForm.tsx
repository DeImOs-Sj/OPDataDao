// @ts-nocheck comment
import { useState, useRef, useContext } from "react";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";
import userSideabi from "../../utils/contractabis/usersideabi.json";
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

const Form1 = ({ getName, getSummary }) => {
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
            <h2 className="text-center text-2xl font-semibold">Register Your DAO Here</h2>
                    <form className="flex flex-col space-y-8 mt-10">
                      <label className="font-bold text-lg text-white">Name of Dao</label>
                      <input type="text" placeholder="Dao Name" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"   onChange={(e) => handleName(e.target.value)}/>
                      <label className="font-bold text-lg text-white">Summary</label>
                      <input type="Token Name" placeholder="Short Summuary" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"    onChange={(e) => handleSummary(e.target.value)}/>
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
};

const Form2 = ({ getJoiningThreshold, getProposal, getVisibility }) => {
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
   <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
          <div className="bg-black flex flex-col w-[35rem] border border-gray-900 rounded-lg px-8 py-10">
            <h2 className="text-center text-2xl font-semibold">Details About Dao</h2>
                    <form className="flex flex-col space-y-8 mt-10">
                      <label className="font-bold text-lg text-white">Joining Requirement</label>
                      <input type="text" placeholder="Minimum Amount" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"    onChange={(value) => handleTokens(value)} />
                      <label >Enter minimum number of tokens required to join DAO</label>
                      {/* <input type="Token Name" placeholder="Token Name" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" onChange={(e) => handleTokenName(e.target.value)}/> */}
                      <label className="font-bold text-lg text-white">Proposal Threshold</label>
              <input type="text" placeholder="Token Supply" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" onChange={(value) => handleProposal(value)} />
              <p>Enter minimum number of tokens required to create a proposal</p>
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
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
};

const Form3 = ({ getTokenAddress }) => {
  const toast = useToast();
  const inputRef = useRef(null);
  const [tokenDetails, setTokenDetails] = useState({ symbol: "", name: "" });
  const [loading, setLoading] = useState(false);

  const handleAddress = async (e) => {
    const address = e.target.value;
console.log("address from 3form",address)
    if (address.trim()) {
      setLoading(true);

      try {
        // Call a function to fetch token details based on the address
        const { symbol, name } = await fetchTokenDetails(address);

        // Update state with the fetched data
        setTokenDetails({ symbol, name });
      } catch (error) {
        console.error("Error fetching token details:", error);
        toast({
          title: "Error",
          description: "Unable to fetch token details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Token Address Not Entered correctly",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    getTokenAddress(address);
  };

  const fetchTokenDetails = async (address) => {
    try {
      console.log(ethers.providers)
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      // Use your Ethereum provider
      const contract = new ethers.Contract(
        address,
        [
          "function symbol() view returns (string)",
          "function name() view returns (string)",
        ],
        provider
      );

      // Call the ERC-20 token contract to get the symbol and name
      const symbol = await contract.symbol();
      console.log(contrac)
      const name = await contract.name();

      return { symbol, name };
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
          <div className="bg-black flex flex-col w-[35rem] border border-gray-900 rounded-lg px-8 py-10">
            <h2 className="text-center text-2xl font-semibold">Token Information</h2>
                    <form className="flex flex-col space-y-8 mt-10">
                      <label className="font-bold text-lg text-white">Address Of Your Token</label>
                      <input type="text" placeholder="Token Address" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"  onChange={(e) => handleAddress(e)} />
                      <label className="font-bold text-lg text-white">Your Token Symbol</label>
                      <input type="Token Name" placeholder="Token Symbol" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"     value={loading ? "Loading..." : tokenDetails.symbol}
              readOnly/>
                      <label className="font-bold text-lg text-white">Your Token Name </label>
                      <input type="text" placeholder="Token Supply" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" value={loading ? "Loading..." : tokenDetails.name}
              readOnly />
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
};

export default function ExistingTokenForm() {
  const toast = useToast();
  const [progress, setProgress] = useState(33.33);
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [threshholdToken, setthreshholdToken] = useState();
  const [proposalToken, setProposalToken] = useState();
  const [desc, setdesc] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [daovisibility, setdaoVisibility] = useState(false);

  const craeteDAO = async () => {
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

  const getDao = async () => {
    if (window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USERSIDE_ADDRESS,
        userSideabi,
        signer
      );

      const daoInfo = await contract.daoIdtoDao(1);
      console.log(daoInfo);
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
        <Form1 getName={(q) => setName(q)} getSummary={(q) => setdesc(q)} />
      ) : step === 2 ? (
        <Form2
          getJoiningThreshold={(q) => setthreshholdToken(q)}
          getProposal={(q) => setProposalToken(q)}
          getVisibility={(q) => setdaoVisibility(q)}
        />
      ) : (
        <Form3 getTokenAddress={(q) => settokenAddress(q)} />
      )}
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="center">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 33.33);
              }}
              isDisabled={step === 1}
              // colorScheme="teal"
              variant="solid"
                className="bg-black text-2xl"
                w="8rem"
                p={6}
                mr="5%"
            >
              Back
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 3}
              onClick={() => {
                setStep(step + 1);
                if (step === 3) {
                  setProgress(100);
                } else {
                  setProgress(progress + 33.33);
                }
              }}
              // colorScheme="teal"
                className="bg-black text-2xl"
                w="8rem"
                p={6}
                mr="5%"
                variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 3 ? (
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              onClick={() => {
                craeteDAO();
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
