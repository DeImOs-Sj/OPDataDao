// @ts-nocheck comment
import {
  connectorsForWallets,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { ParticleNetwork } from "@particle-network/auth";
import {botanix,sepolia,polygonMumbai ,optimismSepolia
} from "wagmi/chains";

import { particleWallet } from "@particle-network/rainbowkit-ext";

new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
});

// const botanix = {
//   id: 3636,
//   name: '',
//   iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://node.botanixlabs.dev'] },
//   },
//   blockExplorers: {
//     default: { name: 'Botanix', url: 'https://blockscout.botanixlabs.dev/' },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 11_907_934,
//     },
//   },
// }

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia,polygonMumbai,optimismSepolia
],
  [publicProvider()]
);





const particleWallets = [
  particleWallet({ chains, authType: "google" }),
  particleWallet({ chains, authType: "facebook" }),
  particleWallet({ chains, authType: "discord" }),
  particleWallet({ chains }),
];

const popularWallets = {
  groupName: "Popular",
  wallets: [
    ...particleWallets,
    injectedWallet({ chains }),
    rainbowWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
    coinbaseWallet({ appName: "RainbowKit demo", chains }),
    metaMaskWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
    walletConnectWallet({
      chains,
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }),
  ],
};

const connectors = connectorsForWallets([
  popularWallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
      trustWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
      omniWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
      imTokenWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
      ledgerWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
      }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function WagmiProvider(props: any) {
  return (
    <>
      {config && (
        <WagmiConfig config={config}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#1E88E5",
              borderRadius: "large",
              overlayBlur: "small",
            })}
            coolMode
          >
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}

export default WagmiProvider;
